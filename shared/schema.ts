import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'drone' | 'design-simulation'
  duration: text("duration").notNull(),
  format: text("format").notNull(), // 'online' | 'in-person' | 'hybrid'
  prerequisites: text("prerequisites"),
  learningOutcomes: json("learning_outcomes").$type<string[]>().notNull(),
  modules: json("modules").$type<string[]>().notNull(),
  targetAudience: text("target_audience").notNull(),
  price: integer("price"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'technology' | 'regulations' | 'education' | 'trends'
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  featured: boolean("featured").default(false),
  imageUrl: text("image_url"),
});

export const consultancyInquiries = pgTable("consultancy_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  qualifications: json("qualifications").$type<string[]>().notNull(),
  specialties: json("specialties").$type<string[]>().notNull(),
  imageUrl: text("image_url"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
});

// Insert schemas
export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  publishedAt: true,
});

export const insertConsultancyInquirySchema = createInsertSchema(consultancyInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Types
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type ConsultancyInquiry = typeof consultancyInquiries.$inferSelect;
export type InsertConsultancyInquiry = z.infer<typeof insertConsultancyInquirySchema>;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
