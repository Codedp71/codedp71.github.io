import {
  courses,
  articles,
  consultancyInquiries,
  contactInquiries,
  teamMembers,
  testimonials,
  type Course,
  type InsertCourse,
  type Article,
  type InsertArticle,
  type ConsultancyInquiry,
  type InsertConsultancyInquiry,
  type ContactInquiry,
  type InsertContactInquiry,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
} from "@shared/schema";

export interface IStorage {
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Articles
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Inquiries
  createConsultancyInquiry(inquiry: InsertConsultancyInquiry): Promise<ConsultancyInquiry>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private courses: Map<number, Course>;
  private articles: Map<number, Article>;
  private consultancyInquiries: Map<number, ConsultancyInquiry>;
  private contactInquiries: Map<number, ContactInquiry>;
  private teamMembers: Map<number, TeamMember>;
  private testimonials: Map<number, Testimonial>;
  private currentId: number;

  constructor() {
    this.courses = new Map();
    this.articles = new Map();
    this.consultancyInquiries = new Map();
    this.contactInquiries = new Map();
    this.teamMembers = new Map();
    this.testimonials = new Map();
    this.currentId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample courses
    const sampleCourses: InsertCourse[] = [
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
        price: 15000,
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
        price: 25000,
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
        price: 20000,
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
        price: 35000,
        featured: true
      }
    ];

    sampleCourses.forEach(course => this.createCourse(course));

    // Sample articles
    const sampleArticles: InsertArticle[] = [
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

    sampleArticles.forEach(article => this.createArticle(article));

    // Sample team members
    const sampleTeamMembers: InsertTeamMember[] = [
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

    sampleTeamMembers.forEach(member => this.createTeamMember(member));

    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
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

    sampleTestimonials.forEach(testimonial => this.createTestimonial(testimonial));
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.category === category);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentId++;
    const course: Course = {
      id,
      title: insertCourse.title,
      description: insertCourse.description,
      category: insertCourse.category,
      duration: insertCourse.duration,
      format: insertCourse.format,
      prerequisites: insertCourse.prerequisites ?? null,
      learningOutcomes: [...(insertCourse.learningOutcomes as string[])],
      modules: [...(insertCourse.modules as string[])],
      targetAudience: insertCourse.targetAudience,
      price: insertCourse.price ?? null,
      featured: insertCourse.featured ?? null,
      createdAt: new Date(),
    };
    this.courses.set(id, course);
    return course;
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).sort((a, b) => 
      new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => article.featured);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => article.category === category);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentId++;
    const article: Article = {
      ...insertArticle,
      id,
      publishedAt: new Date(),
      featured: insertArticle.featured ?? null,
      imageUrl: insertArticle.imageUrl ?? null,
    };
    this.articles.set(id, article);
    return article;
  }

  // Inquiries
  async createConsultancyInquiry(insertInquiry: InsertConsultancyInquiry): Promise<ConsultancyInquiry> {
    const id = this.currentId++;
    const inquiry: ConsultancyInquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
      company: insertInquiry.company ?? null,
      phone: insertInquiry.phone ?? null,
    };
    this.consultancyInquiries.set(id, inquiry);
    return inquiry;
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentId++;
    const inquiry: ContactInquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date(),
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentId++;
    const member: TeamMember = {
      id,
      name: insertMember.name,
      position: insertMember.position,
      bio: insertMember.bio,
      qualifications: [...(insertMember.qualifications as string[])],
      specialties: [...(insertMember.specialties as string[])],
      imageUrl: insertMember.imageUrl ?? null,
    };
    this.teamMembers.set(id, member);
    return member;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.featured);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId++;
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      featured: insertTestimonial.featured ?? null,
      imageUrl: insertTestimonial.imageUrl ?? null,
      company: insertTestimonial.company ?? null,
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
