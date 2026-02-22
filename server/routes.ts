import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertConsultancyInquirySchema,
  insertContactInquirySchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Courses
  app.get("/api/courses", async (req, res) => {
    try {
      const { category } = req.query;
      let courses;
      
      if (category && typeof category === 'string') {
        courses = await storage.getCoursesByCategory(category);
      } else {
        courses = await storage.getCourses();
      }
      
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const course = await storage.getCourse(id);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const { category, featured } = req.query;
      let articles;
      
      if (featured === 'true') {
        articles = await storage.getFeaturedArticles();
      } else if (category && typeof category === 'string') {
        articles = await storage.getArticlesByCategory(category);
      } else {
        articles = await storage.getArticles();
      }
      
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticle(id);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  // Team Members
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const { featured } = req.query;
      let testimonials;
      
      if (featured === 'true') {
        testimonials = await storage.getFeaturedTestimonials();
      } else {
        testimonials = await storage.getTestimonials();
      }
      
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.status(201).json({ message: "Contact inquiry submitted successfully", id: inquiry.id });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to submit contact inquiry" });
      }
    }
  });

  // Consultancy inquiry submission
  app.post("/api/consultancy", async (req, res) => {
    try {
      const validatedData = insertConsultancyInquirySchema.parse(req.body);
      const inquiry = await storage.createConsultancyInquiry(validatedData);
      res.status(201).json({ message: "Consultancy inquiry submitted successfully", id: inquiry.id });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to submit consultancy inquiry" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
