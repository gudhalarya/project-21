use std::env;

use actix_web::{middleware::Logger, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, FromRow, Pool, Postgres};
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey, Algorithm};

type DbPool = Pool<Postgres>;

#[derive(Clone)]
struct AppState {
    pool: DbPool,
    admin_token: String,
}

#[derive(Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Serialize)]
struct LoginResponse {
    token: String,
    expires_in: i64,
}

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
    iat: usize,
}

#[derive(Deserialize)]
struct ContactForm {
    name: String,
    email: String,
    phone: Option<String>,
    message: String,
}

#[derive(Serialize, FromRow)]
struct ContactMessage {
    id: i64,
    name: String,
    email: String,
    phone: Option<String>,
    message: String,
    status: String,
    notes: Option<String>,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[derive(Deserialize)]
struct UpdateContact {
    status: Option<String>,
    notes: Option<String>,
    message: Option<String>,
}

#[derive(Serialize, FromRow)]
struct SuccessStory {
    id: i64,
    student_name: String,
    exam: String,
    score: String,
    image_url: String,
    highlight: Option<String>,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[derive(Deserialize)]
struct CreateSuccessStory {
    student_name: String,
    exam: String,
    score: String,
    image_url: String,
    highlight: Option<String>,
}

#[derive(Deserialize)]
struct UpdateSuccessStory {
    student_name: Option<String>,
    exam: Option<String>,
    score: Option<String>,
    image_url: Option<String>,
    highlight: Option<String>,
}

async fn create_contact(
    state: web::Data<AppState>,
    payload: web::Json<ContactForm>,
) -> actix_web::Result<impl Responder> {
    let ContactForm {
        name,
        email,
        phone,
        message,
    } = payload.into_inner();

    let rec = sqlx::query_as::<_, ContactMessage>(
        r#"
        INSERT INTO contact_messages (name, email, phone, message)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, phone, message, status, notes, created_at, updated_at
        "#,
    )
    .bind(name)
    .bind(email)
    .bind(phone)
    .bind(message)
    .fetch_one(&state.pool)
    .await
    .map_err(internal_error)?;

    Ok(HttpResponse::Created().json(rec))
}

async fn list_success_stories(state: web::Data<AppState>) -> actix_web::Result<impl Responder> {
    let rows = sqlx::query_as::<_, SuccessStory>(
        r#"SELECT id, student_name, exam, score, image_url, highlight, created_at, updated_at
           FROM success_stories
           ORDER BY created_at DESC"#,
    )
    .fetch_all(&state.pool)
    .await
    .map_err(internal_error)?;

    Ok(HttpResponse::Ok().json(rows))
}

async fn admin_list_success_stories(
    state: web::Data<AppState>,
    req: HttpRequest,
) -> actix_web::Result<impl Responder> {
    if !is_admin(&req, &state) {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    list_success_stories(state).await
}

async fn admin_create_success_story(
    state: web::Data<AppState>,
    req: HttpRequest,
    payload: web::Json<CreateSuccessStory>,
) -> actix_web::Result<impl Responder> {
    if !is_admin(&req, &state) {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let CreateSuccessStory {
        student_name,
        exam,
        score,
        image_url,
        highlight,
    } = payload.into_inner();

    let rec = sqlx::query_as::<_, SuccessStory>(
        r#"
        INSERT INTO success_stories (student_name, exam, score, image_url, highlight)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, student_name, exam, score, image_url, highlight, created_at, updated_at
        "#,
    )
    .bind(student_name)
    .bind(exam)
    .bind(score)
    .bind(image_url)
    .bind(highlight)
    .fetch_one(&state.pool)
    .await
    .map_err(internal_error)?;

    Ok(HttpResponse::Created().json(rec))
}

async fn admin_update_success_story(
    state: web::Data<AppState>,
    req: HttpRequest,
    path: web::Path<i64>,
    payload: web::Json<UpdateSuccessStory>,
) -> actix_web::Result<impl Responder> {
    if !is_admin(&req, &state) {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let id = path.into_inner();
    let UpdateSuccessStory {
        student_name,
        exam,
        score,
        image_url,
        highlight,
    } = payload.into_inner();

    let rec = sqlx::query_as::<_, SuccessStory>(
        r#"
        UPDATE success_stories
        SET student_name = COALESCE($2, student_name),
            exam = COALESCE($3, exam),
            score = COALESCE($4, score),
            image_url = COALESCE($5, image_url),
            highlight = COALESCE($6, highlight),
            updated_at = NOW()
        WHERE id = $1
        RETURNING id, student_name, exam, score, image_url, highlight, created_at, updated_at
        "#,
    )
    .bind(id)
    .bind(student_name)
    .bind(exam)
    .bind(score)
    .bind(image_url)
    .bind(highlight)
    .fetch_optional(&state.pool)
    .await
    .map_err(internal_error)?;

    match rec {
        Some(row) => Ok(HttpResponse::Ok().json(row)),
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

async fn admin_delete_success_story(
    state: web::Data<AppState>,
    req: HttpRequest,
    path: web::Path<i64>,
) -> actix_web::Result<impl Responder> {
    if !is_admin(&req, &state) {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let id = path.into_inner();
    let result = sqlx::query("DELETE FROM success_stories WHERE id = $1")
        .bind(id)
        .execute(&state.pool)
        .await
        .map_err(internal_error)?;

    if result.rows_affected() == 0 {
        Ok(HttpResponse::NotFound().finish())
    } else {
        Ok(HttpResponse::NoContent().finish())
    }
}

fn is_admin(req: &HttpRequest, state: &AppState) -> bool {
    // Prefer Bearer JWT
    if let Some(auth) = req.headers().get("authorization").and_then(|h| h.to_str().ok()) {
        if let Some(token) = auth.strip_prefix("Bearer ").or_else(|| auth.strip_prefix("bearer ")) {
            return validate_jwt(token, &state.admin_token);
        }
    }
    // Fallback to static token header
    req.headers()
        .get("x-admin-token")
        .and_then(|h| h.to_str().ok())
        .map(|token| token == state.admin_token)
        .unwrap_or(false)
}

fn validate_jwt(token: &str, secret: &str) -> bool {
    let mut validation = Validation::new(Algorithm::HS256);
    validation.validate_exp = true;
    decode::<Claims>(token, &DecodingKey::from_secret(secret.as_bytes()), &validation).is_ok()
}

async fn admin_login(state: web::Data<AppState>, payload: web::Json<LoginRequest>) -> actix_web::Result<impl Responder> {
    let LoginRequest { username, password } = payload.into_inner();

    let expected_user = env::var("ADMIN_USERNAME").unwrap_or_else(|_| "admin".to_string());
    let expected_pass = env::var("ADMIN_PASSWORD").unwrap_or_else(|_| "change-me".to_string());

    if username != expected_user || password != expected_pass {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let now = Utc::now().timestamp() as usize;
    let exp = now + 60 * 60 * 8; // 8 hours
    let claims = Claims {
        sub: username,
        iat: now,
        exp,
    };

    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(state.admin_token.as_bytes()))
        .map_err(internal_error)?;

    Ok(HttpResponse::Ok().json(LoginResponse {
        token,
        expires_in: (exp as i64) - (now as i64),
    }))
}

async fn list_messages(state: web::Data<AppState>, req: HttpRequest) -> actix_web::Result<impl Responder> {
    if !is_admin(&req, &state) {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let rows = sqlx::query_as::<_, ContactMessage>(
        r#"SELECT id, name, email, phone, message, status, notes, created_at, updated_at
           FROM contact_messages
           ORDER BY created_at DESC"#,
    )
    .fetch_all(&state.pool)
    .await
    .map_err(internal_error)?;

    Ok(HttpResponse::Ok().json(rows))
}

async fn update_message(
    state: web::Data<AppState>,
    req: HttpRequest,
    path: web::Path<i64>,
    payload: web::Json<UpdateContact>,
) -> actix_web::Result<impl Responder> {
    if !is_admin(&req, &state) {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let id = path.into_inner();
    let UpdateContact { status, notes, message } = payload.into_inner();

    let rec = sqlx::query_as::<_, ContactMessage>(
        r#"
        UPDATE contact_messages
        SET status = COALESCE($2, status),
            notes = COALESCE($3, notes),
            message = COALESCE($4, message),
            updated_at = NOW()
        WHERE id = $1
        RETURNING id, name, email, phone, message, status, notes, created_at, updated_at
        "#,
    )
    .bind(id)
    .bind(status)
    .bind(notes)
    .bind(message)
    .fetch_optional(&state.pool)
    .await
    .map_err(internal_error)?;

    match rec {
        Some(row) => Ok(HttpResponse::Ok().json(row)),
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

async fn delete_message(
    state: web::Data<AppState>,
    req: HttpRequest,
    path: web::Path<i64>,
) -> actix_web::Result<impl Responder> {
    if !is_admin(&req, &state) {
        return Ok(HttpResponse::Unauthorized().finish());
    }

    let id = path.into_inner();
    let result = sqlx::query("DELETE FROM contact_messages WHERE id = $1")
        .bind(id)
        .execute(&state.pool)
        .await
        .map_err(internal_error)?;

    if result.rows_affected() == 0 {
        Ok(HttpResponse::NotFound().finish())
    } else {
        Ok(HttpResponse::NoContent().finish())
    }
}

fn internal_error<E: std::error::Error + 'static>(err: E) -> actix_web::Error {
    log::error!("{err}");
    actix_web::error::ErrorInternalServerError("internal error")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    env_logger::init();

    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let admin_token = env::var("ADMIN_TOKEN").unwrap_or_else(|_| "change-me-admin-token".to_string());
    let port: u16 = env::var("PORT").ok().and_then(|p| p.parse().ok()).unwrap_or(8080);

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("failed to connect to database");

    // Run SQLx migrations
    sqlx::migrate!()
        .run(&pool)
        .await
        .expect("failed to run migrations");

    let state = AppState { pool, admin_token };

    println!("Server running on 0.0.0.0:{port}");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .wrap(Logger::default())
            .service(
                web::scope("/api")
                    .route("/contact", web::post().to(create_contact))
                    .route("/success-stories", web::get().to(list_success_stories))
                    .route("/admin/login", web::post().to(admin_login))
                    .service(
                        web::scope("/admin")
                            .route("/messages", web::get().to(list_messages))
                            .route("/messages/{id}", web::patch().to(update_message))
                            .route("/messages/{id}", web::delete().to(delete_message))
                            .route("/success-stories", web::post().to(admin_create_success_story))
                            .route("/success-stories", web::get().to(admin_list_success_stories))
                            .route("/success-stories/{id}", web::patch().to(admin_update_success_story))
                            .route("/success-stories/{id}", web::delete().to(admin_delete_success_story)),
                    ),
            )
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
