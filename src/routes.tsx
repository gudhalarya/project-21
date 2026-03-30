import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DemoLinks from './pages/DemoLinks';
import TestimonialDemo from './pages/TestimonialDemo';
import AdminMessages from './pages/AdminMessages';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSuccessStories from './pages/AdminSuccessStories';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminFaculty from './pages/AdminFaculty';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Demo Links',
    path: '/demo-links',
    element: <DemoLinks />,
    visible: false
  },
  {
    name: 'Testimonial Demo',
    path: '/testimonial-demo',
    element: <TestimonialDemo />,
    visible: false
  },
  {
    name: 'Admin Messages',
    path: '/admin/messages',
    element: <AdminMessages />,
    visible: false
  },
  {
    name: 'Admin Login',
    path: '/admin/login',
    element: <AdminLogin />,
    visible: false
  },
  {
    name: 'Admin Dashboard',
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    visible: false
  },
  {
    name: 'Admin Success Stories',
    path: '/admin/success-stories',
    element: <AdminSuccessStories />,
    visible: false
  },
  {
    name: 'Admin Testimonials',
    path: '/admin/testimonials',
    element: <AdminTestimonials />,
    visible: false
  },
  {
    name: 'Admin Faculty',
    path: '/admin/faculty',
    element: <AdminFaculty />,
    visible: false
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />
  }
];

export default routes;
