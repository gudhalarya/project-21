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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Inquiry sent successfully. We'll be in touch soon.");
    form.reset();
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-background border-t">
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
                  <p className="text-lg font-bold uppercase tracking-tighter">+1 (555) 012-3456</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-50">Address</p>
                  <p className="text-lg font-bold uppercase tracking-tighter">789 Education Plaza, Suite 400, NY 10001</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 border-2 border-primary/10 hover:border-primary transition-all duration-500"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest font-bold text-xs">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="rounded-none border-0 border-b border-primary/20 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300" {...field} />
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
                        <FormLabel className="uppercase tracking-widest font-bold text-xs">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" className="rounded-none border-0 border-b border-primary/20 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300" {...field} />
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
                        <FormLabel className="uppercase tracking-widest font-bold text-xs">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" className="rounded-none border-0 border-b border-primary/20 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300" {...field} />
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
                        <FormLabel className="uppercase tracking-widest font-bold text-xs">Program of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-0 border-b border-primary/20 focus:ring-0 focus:border-primary transition-all duration-300">
                              <SelectValue placeholder="Select Program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-none uppercase tracking-widest font-bold">
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
                      <FormLabel className="uppercase tracking-widest font-bold text-xs">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your academic goals..." 
                          className="rounded-none border-0 border-b border-primary/20 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-16 text-lg font-bold uppercase tracking-widest rounded-none border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-300">
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
