import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactInquirySchema } from "@shared/schema";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const formSchema = insertContactInquirySchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      return apiRequest("/api/contact-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: [
        "Aerospace Academy",
        "Technology Park, Sector 18",
        "Gurugram, Haryana 122015",
        "India"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "Main: +91-124-456-7890",
        "Admissions: +91-124-456-7891",
        "Support: +91-124-456-7892",
        "Consultancy: +91-124-456-7893"
      ]
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@aerospaceacademy.com",
        "admissions@aerospaceacademy.com",
        "support@aerospaceacademy.com",
        "consultancy@aerospaceacademy.com"
      ]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed",
        "Emergency Support: 24/7"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to take your aerospace career to new heights? Get in touch with our team 
            for information about courses, consultancy services, or any other inquiries.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <info.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-blue-600 mb-4">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600">
                  Send us a Message
                </CardTitle>
                <p className="text-slate-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="john@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <FormControl>
                            <Input placeholder="What's this about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help you..."
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="btn-primary w-full text-lg py-6"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-0">
                  <div className="h-64 bg-slate-200 rounded-t-lg flex items-center justify-center">
                    <p className="text-slate-500">Interactive Map Placeholder</p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-blue-600 mb-2">Visit Our Campus</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Our state-of-the-art facility features modern classrooms, hands-on labs, 
                      and simulation centers equipped with the latest aerospace technology.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-4">Quick Response Guarantee</h3>
                  <ul className="space-y-2 text-slate-600 text-sm">
                    <li>• Course inquiries: Within 2 hours</li>
                    <li>• Consultancy requests: Within 4 hours</li>
                    <li>• Technical support: Within 1 hour</li>
                    <li>• General questions: Within 24 hours</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-4">Follow Us</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Stay updated with the latest aerospace industry news and our course offerings.
                  </p>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                      f
                    </div>
                    <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm">
                      t
                    </div>
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm">
                      in
                    </div>
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-sm">
                      yt
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}