// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  courses;
  articles;
  consultancyInquiries;
  contactInquiries;
  teamMembers;
  testimonials;
  currentId;
  constructor() {
    this.courses = /* @__PURE__ */ new Map();
    this.articles = /* @__PURE__ */ new Map();
    this.consultancyInquiries = /* @__PURE__ */ new Map();
    this.contactInquiries = /* @__PURE__ */ new Map();
    this.teamMembers = /* @__PURE__ */ new Map();
    this.testimonials = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.initializeData();
  }
  initializeData() {
    const sampleCourses = [
      {
        title: "Drone Rules & Regulations",
        description: "Comprehensive course covering DGCA guidelines, licensing requirements, and airspace classification for commercial and recreational drone operations.",
        category: "drone",
        duration: "4 weeks",
        format: "hybrid",
        prerequisites: "Basic understanding of aviation concepts",
        learningOutcomes: [
          "Understand DGCA regulations and compliance requirements",
          "Navigate airspace classification and restrictions",
          "Complete licensing and certification processes",
          "Implement safety protocols for drone operations"
        ],
        modules: [
          "Introduction to DGCA Guidelines",
          "Airspace Classification and Restrictions",
          "Licensing and Certification Requirements",
          "Safety Protocols and Risk Management",
          "Legal Framework and Compliance"
        ],
        targetAudience: "Drone operators, pilots, and aerospace professionals",
        price: 15e3,
        featured: true
      },
      {
        title: "Drone Components & Systems",
        description: "In-depth study of drone components including ESCs, motors, frames, batteries, and sensors with hands-on assembly experience.",
        category: "drone",
        duration: "6 weeks",
        format: "in-person",
        prerequisites: "Basic electronics knowledge",
        learningOutcomes: [
          "Identify and understand key drone components",
          "Assemble and configure drone systems",
          "Troubleshoot common hardware issues",
          "Select appropriate components for specific applications"
        ],
        modules: [
          "Frame Design and Materials",
          "Propulsion Systems: Motors and Propellers",
          "Electronic Speed Controllers (ESCs)",
          "Battery Technology and Power Management",
          "Sensors and Navigation Systems",
          "Communication and Control Systems"
        ],
        targetAudience: "Engineers, technicians, and drone enthusiasts",
        price: 25e3,
        featured: true
      },
      {
        title: "Aerodynamics Fundamentals",
        description: "Essential aerodynamics concepts including lift, drag, thrust, airfoils, and flow dynamics with practical applications.",
        category: "design-simulation",
        duration: "8 weeks",
        format: "online",
        prerequisites: "Mathematics and physics background",
        learningOutcomes: [
          "Master fundamental aerodynamic principles",
          "Analyze airfoil characteristics and performance",
          "Understand flow dynamics and boundary layers",
          "Apply aerodynamic concepts to aircraft design"
        ],
        modules: [
          "Introduction to Fluid Mechanics",
          "Airfoil Theory and Design",
          "Lift and Drag Analysis",
          "Boundary Layer Theory",
          "Compressible Flow Fundamentals",
          "Aircraft Performance Analysis"
        ],
        targetAudience: "Aerospace engineers and design professionals",
        price: 2e4,
        featured: false
      },
      {
        title: "Ansys CFD Simulation",
        description: "Comprehensive training in computational fluid dynamics using Ansys software for aerospace applications.",
        category: "design-simulation",
        duration: "10 weeks",
        format: "hybrid",
        prerequisites: "Aerodynamics fundamentals and CAD experience",
        learningOutcomes: [
          "Master Ansys CFD software interface and tools",
          "Set up and run complex fluid simulations",
          "Analyze and interpret simulation results",
          "Optimize designs based on CFD analysis"
        ],
        modules: [
          "Ansys CFD Interface and Setup",
          "Mesh Generation and Quality",
          "Boundary Conditions and Solver Settings",
          "Turbulence Modeling",
          "Post-processing and Results Analysis",
          "Design Optimization Techniques"
        ],
        targetAudience: "Design engineers and simulation specialists",
        price: 35e3,
        featured: true
      }
    ];
    sampleCourses.forEach((course) => this.createCourse(course));
    const sampleArticles = [
      {
        title: "Latest Advances in Drone Propulsion Systems",
        excerpt: "Exploring breakthrough technologies in electric propulsion and their impact on drone efficiency and performance.",
        content: "The aerospace industry is witnessing unprecedented advances in drone propulsion systems...",
        category: "technology",
        author: "Dr. Rajesh Kumar",
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3"
      },
      {
        title: "New DGCA Guidelines for Commercial Drone Operations",
        excerpt: "Understanding the latest regulatory changes and their implications for commercial drone operators in India.",
        content: "The Directorate General of Civil Aviation (DGCA) has recently updated its guidelines...",
        category: "regulations",
        author: "Priya Sharma",
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3"
      },
      {
        title: "Mastering CFD Analysis: Essential Skills for Aerospace Engineers",
        excerpt: "A comprehensive guide to computational fluid dynamics and its applications in modern aerospace design.",
        content: "Computational Fluid Dynamics (CFD) has become an indispensable tool in aerospace engineering...",
        category: "education",
        author: "Prof. Anita Desai",
        featured: false,
        imageUrl: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-4.0.3"
      }
    ];
    sampleArticles.forEach((article) => this.createArticle(article));
    const sampleTeamMembers = [
      {
        name: "Dr. Rajesh Kumar",
        position: "Founder & Chief Technology Officer",
        bio: "Dr. Kumar brings over 15 years of experience in aerospace engineering with specialization in propulsion systems and drone technology.",
        qualifications: ["Ph.D. Aerospace Engineering, IIT Bombay", "M.Tech Propulsion Technology", "B.Tech Mechanical Engineering"],
        specialties: ["Drone Propulsion Systems", "Aerodynamics", "DGCA Compliance", "Project Management"],
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=300&h=300&fit=crop"
      },
      {
        name: "Priya Sharma",
        position: "Head of Training & Curriculum",
        bio: "Priya is a seasoned educator with expertise in aerospace design and simulation technologies, focusing on practical learning approaches.",
        qualifications: ["M.Tech Aerospace Engineering", "PMP Certification", "B.Tech Aeronautical Engineering"],
        specialties: ["Ansys Simulation", "CAD Design", "Curriculum Development", "Training Delivery"],
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?ixlib=rb-4.0.3&w=300&h=300&fit=crop"
      },
      {
        name: "Prof. Anita Desai",
        position: "Senior Consultant & Advisor",
        bio: "Prof. Desai is a distinguished academic and industry expert with extensive experience in aerospace research and consultancy.",
        qualifications: ["Ph.D. Computational Fluid Dynamics", "M.S. Aerospace Engineering", "B.S. Mechanical Engineering"],
        specialties: ["CFD Analysis", "Research & Development", "Industry Partnerships", "Technical Advisory"],
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=300&h=300&fit=crop"
      }
    ];
    sampleTeamMembers.forEach((member) => this.createTeamMember(member));
    const sampleTestimonials = [
      {
        name: "Sarah Johnson",
        position: "Aerospace Engineer",
        company: "SkyTech Industries",
        content: "The drone design course completely transformed my understanding of aerodynamics. The hands-on Ansys simulations were invaluable for my career transition into aerospace engineering.",
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=100&h=100&fit=crop"
      },
      {
        name: "Michael Chen",
        position: "CTO",
        company: "Dronetech Solutions",
        content: "Their consultancy services helped us achieve DGCA compliance seamlessly. The team's expertise in regulatory requirements is unmatched.",
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=100&h=100&fit=crop"
      },
      {
        name: "Elena Rodriguez",
        position: "Aerospace Consultant",
        company: "Independent",
        content: "The comprehensive curriculum and practical approach gave me the confidence to launch my own aerospace consulting firm. Highly recommended!",
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?ixlib=rb-4.0.3&w=100&h=100&fit=crop"
      }
    ];
    sampleTestimonials.forEach((testimonial) => this.createTestimonial(testimonial));
  }
  // Courses
  async getCourses() {
    return Array.from(this.courses.values());
  }
  async getCourse(id) {
    return this.courses.get(id);
  }
  async getCoursesByCategory(category) {
    return Array.from(this.courses.values()).filter((course) => course.category === category);
  }
  async createCourse(insertCourse) {
    const id = this.currentId++;
    const course = {
      id,
      title: insertCourse.title,
      description: insertCourse.description,
      category: insertCourse.category,
      duration: insertCourse.duration,
      format: insertCourse.format,
      prerequisites: insertCourse.prerequisites ?? null,
      learningOutcomes: [...insertCourse.learningOutcomes],
      modules: [...insertCourse.modules],
      targetAudience: insertCourse.targetAudience,
      price: insertCourse.price ?? null,
      featured: insertCourse.featured ?? null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.courses.set(id, course);
    return course;
  }
  // Articles
  async getArticles() {
    return Array.from(this.articles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
  async getArticle(id) {
    return this.articles.get(id);
  }
  async getFeaturedArticles() {
    return Array.from(this.articles.values()).filter((article) => article.featured);
  }
  async getArticlesByCategory(category) {
    return Array.from(this.articles.values()).filter((article) => article.category === category);
  }
  async createArticle(insertArticle) {
    const id = this.currentId++;
    const article = {
      ...insertArticle,
      id,
      publishedAt: /* @__PURE__ */ new Date(),
      featured: insertArticle.featured ?? null,
      imageUrl: insertArticle.imageUrl ?? null
    };
    this.articles.set(id, article);
    return article;
  }
  // Inquiries
  async createConsultancyInquiry(insertInquiry) {
    const id = this.currentId++;
    const inquiry = {
      ...insertInquiry,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      company: insertInquiry.company ?? null,
      phone: insertInquiry.phone ?? null
    };
    this.consultancyInquiries.set(id, inquiry);
    return inquiry;
  }
  async createContactInquiry(insertInquiry) {
    const id = this.currentId++;
    const inquiry = {
      ...insertInquiry,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }
  // Team Members
  async getTeamMembers() {
    return Array.from(this.teamMembers.values());
  }
  async createTeamMember(insertMember) {
    const id = this.currentId++;
    const member = {
      id,
      name: insertMember.name,
      position: insertMember.position,
      bio: insertMember.bio,
      qualifications: [...insertMember.qualifications],
      specialties: [...insertMember.specialties],
      imageUrl: insertMember.imageUrl ?? null
    };
    this.teamMembers.set(id, member);
    return member;
  }
  // Testimonials
  async getTestimonials() {
    return Array.from(this.testimonials.values());
  }
  async getFeaturedTestimonials() {
    return Array.from(this.testimonials.values()).filter((testimonial) => testimonial.featured);
  }
  async createTestimonial(insertTestimonial) {
    const id = this.currentId++;
    const testimonial = {
      ...insertTestimonial,
      id,
      featured: insertTestimonial.featured ?? null,
      imageUrl: insertTestimonial.imageUrl ?? null,
      company: insertTestimonial.company ?? null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  // 'drone' | 'design-simulation'
  duration: text("duration").notNull(),
  format: text("format").notNull(),
  // 'online' | 'in-person' | 'hybrid'
  prerequisites: text("prerequisites"),
  learningOutcomes: json("learning_outcomes").$type().notNull(),
  modules: json("modules").$type().notNull(),
  targetAudience: text("target_audience").notNull(),
  price: integer("price"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  // 'technology' | 'regulations' | 'education' | 'trends'
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  featured: boolean("featured").default(false),
  imageUrl: text("image_url")
});
var consultancyInquiries = pgTable("consultancy_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  qualifications: json("qualifications").$type().notNull(),
  specialties: json("specialties").$type().notNull(),
  imageUrl: text("image_url")
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  company: text("company"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false)
});
var insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true
});
var insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  publishedAt: true
});
var insertConsultancyInquirySchema = createInsertSchema(consultancyInquiries).omit({
  id: true,
  createdAt: true
});
var insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true
});
var insertTeamMemberSchema = createInsertSchema(teamMembers).omit({
  id: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/courses", async (req, res) => {
    try {
      const { category } = req.query;
      let courses2;
      if (category && typeof category === "string") {
        courses2 = await storage.getCoursesByCategory(category);
      } else {
        courses2 = await storage.getCourses();
      }
      res.json(courses2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });
  app2.get("/api/courses/:id", async (req, res) => {
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
  app2.get("/api/articles", async (req, res) => {
    try {
      const { category, featured } = req.query;
      let articles2;
      if (featured === "true") {
        articles2 = await storage.getFeaturedArticles();
      } else if (category && typeof category === "string") {
        articles2 = await storage.getArticlesByCategory(category);
      } else {
        articles2 = await storage.getArticles();
      }
      res.json(articles2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });
  app2.get("/api/articles/:id", async (req, res) => {
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
  app2.get("/api/team", async (req, res) => {
    try {
      const teamMembers2 = await storage.getTeamMembers();
      res.json(teamMembers2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const { featured } = req.query;
      let testimonials2;
      if (featured === "true") {
        testimonials2 = await storage.getFeaturedTestimonials();
      } else {
        testimonials2 = await storage.getTestimonials();
      }
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
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
  app2.post("/api/consultancy", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(path2.dirname(fileURLToPath2(import.meta.url)), "../dist/public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = process.env.PORT || 5e3;
  server.listen(
    {
      port,
      host: "0.0.0.0"
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
