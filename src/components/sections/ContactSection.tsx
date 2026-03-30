import React from 'react';
import { motion } from 'motion/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE, fetchJson } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  program: z.string({
    required_error: "Please select a program of interest.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      program: "",
      message: "",
    },
  });

  const [sending, setSending] = React.useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSending(true);
    try {
      await fetchJson(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      toast.success("Inquiry sent successfully. We'll be in touch soon.");
      form.reset();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to send your inquiry. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-gradient-to-b from-background via-white to-background border-t">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter mb-8 leading-none">
              Start Your <br /> Journey Today.
            </h2>
            <p className="text-lg text-muted-foreground uppercase tracking-widest mb-12 max-w-lg leading-relaxed font-bold">
              Reach out to our admissions team for a personalized counseling session.
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/20">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-50">Email</p>
                  <p className="text-lg font-bold uppercase tracking-tighter">admissions@apexinstitute.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/20">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-50">Phone</p>
                  <p className="text-base font-bold uppercase tracking-tighter">Adajan: 75675 83043</p>
                  <p className="text-base font-bold uppercase tracking-tighter mt-1">Pal: 94276 76829</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-50">Campus Locations</p>
                  <p className="text-base font-bold">Adajan Branch:</p>
                  <p className="text-sm uppercase tracking-tight">Sai Leela Rowhouse, Nr. Parshuram Garden, Opp. CM Residency</p>
                  <p className="text-base font-bold mt-2">Pal Branch:</p>
                  <p className="text-sm uppercase tracking-tight">312, 313 & 420, Raj Corner, Opp. Vasu Pujya Residency, LP Savani School</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 border-2 border-primary/12 bg-white/90 backdrop-blur hover:border-primary transition-all duration-500 shadow-lg"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest font-bold text-xs opacity-50">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-xl border border-primary/10 h-14 px-6 focus-visible:ring-primary/20 transition-all duration-300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest font-bold text-xs opacity-50">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="rounded-xl border border-primary/10 h-14 px-6 focus-visible:ring-primary/20 transition-all duration-300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest font-bold text-xs opacity-50">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" className="rounded-xl border border-primary/10 h-14 px-6 focus-visible:ring-primary/20 transition-all duration-300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest font-bold text-xs opacity-50">Program of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border border-primary/10 h-14 px-6 focus:ring-primary/20 transition-all duration-300">
                              <SelectValue placeholder="Select Program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl uppercase tracking-widest font-bold">
                            <SelectItem value="competitive">Competitive Prep</SelectItem>
                            <SelectItem value="academic">Academic Tutoring</SelectItem>
                            <SelectItem value="skill">Skill Development</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest font-bold text-xs opacity-50">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your academic goals..." 
                          className="rounded-xl border border-primary/10 px-6 py-4 focus-visible:ring-primary/20 transition-all duration-300 min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" data-cursor="Send" className="w-full h-16 text-lg font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300">
                  Submit Inquiry
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
