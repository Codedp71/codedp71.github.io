import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Settings,
  TrendingUp,
  Handshake,
  CheckCircle,
  UserCheck,
  Award,
  Wrench,
  ClipboardCheck,
  Lightbulb,
  Rocket,
  Quote,
  ArrowRight,
  Calendar,
  Star,
} from "lucide-react";
import type { Course, Article, Testimonial } from "@shared/schema";

export default function Home() {
  const { data: featuredCourses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: featuredArticles } = useQuery<Article[]>({
    queryKey: ["/api/articles", { featured: "true" }],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", { featured: "true" }],
  });

  const stats = [
    { value: "500+", label: "Students Trained" },
    { value: "50+", label: "Projects Completed" },
    { value: "5+", label: "Years Experience" },
  ];

  const offerings = [
    {
      icon: GraduationCap,
      title: "Drone Courses",
      description:
        "From basics to advanced training covering regulations, components, design principles, and DGCA compliance.",
      features: ["DGCA Guidelines", "Component Analysis", "Design Principles"],
      href: "/courses?category=drone",
    },
    {
      icon: Settings,
      title: "Design & Simulation",
      description:
        "Master Ansys, CAD tools, aerodynamics, and propulsion through hands-on simulation projects.",
      features: ["Ansys Simulation", "CAD Modeling", "CFD Analysis"],
      href: "/courses?category=design-simulation",
    },
    {
      icon: TrendingUp,
      title: "Industry Insights",
      description:
        "Stay updated with latest news, trends, expert perspectives, and breakthrough technologies.",
      features: ["Market Trends", "Tech Innovations", "Expert Analysis"],
      href: "/industry-insights",
    },
    {
      icon: Handshake,
      title: "Consultancy Services",
      description:
        "Professional compliance, analysis, custom training, and project management support.",
      features: ["Compliance Support", "Custom Training", "Project Advisory"],
      href: "/consultancy",
    },
  ];

  const advantages = [
    {
      icon: UserCheck,
      title: "Expert Instructors",
      description:
        "Learn from industry veterans with real-world aerospace experience and deep technical expertise.",
    },
    {
      icon: Award,
      title: "Industry-Relevant Curriculum",
      description:
        "Cutting-edge programs aligned with current industry standards and emerging technologies.",
    },
    {
      icon: Wrench,
      title: "Hands-On Training",
      description:
        "Practical learning approach with real equipment, simulation tools, and project-based assignments.",
    },
    {
      icon: ClipboardCheck,
      title: "Consultancy Backing",
      description:
        "Benefit from our active consultancy projects and real-world case studies in your learning journey.",
    },
    {
      icon: Lightbulb,
      title: "Practical Learning Approach",
      description:
        "Bridge theory and practice through simulation labs, workshops, and industry collaboration.",
    },
    {
      icon: Rocket,
      title: "Innovation Focus",
      description:
        "Stay ahead with latest aerospace innovations, emerging technologies, and future trends.",
    },
  ];



  return (
    <div style={{
      backgroundImage: `url('/src/pages/img/homeimghero1.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('/src/pages/img/aero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
              <span>Learning today, Innovating Tomorrow.</span>
              <span className="text-amber-400 block mt-2">Aerospace Engineering</span>
            </h1>
            <p className="text-xl md:text-1xl mb-8 text-blue-100 leading-relaxed">
              Empowering future aerospace professionals through expert drone
              training, cutting-edge design simulation, and comprehensive
              consultancy services
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
              >
                <Handshake className="mr-2 h-4 w-4" />
                <Link href="/consultancy">Get Consultancy Support</Link>
              </Button>
            </div>

            <div className="mt-13   grid grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Brief */}
      <section className="section-padding py-40 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">
              Empowering Future Aerospace Professionals
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed text-justify">
              We partner with industry leaders to deliver real projects, certification pathways, and placement support that turn learning into measurable career progress.  
              Our curriculum blends flight systems, simulation, design, and regulatory compliance to equip students and organizations with the skills needed for today’s aerospace challenges.  
              Through bespoke corporate training and advisory services, we help startups and established firms accelerate development, meet DGCA standards, and reduce time to market.  
            </p>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Link href="/about" className="flex items-center">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      <section className="relative overflow-hidden section-padding">
        {/* Background Image with Blur */}
        <div
          className="absolute inset-0 z-0 blur-sm"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-white/50 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Our Core Offerings
            </h2>
            <p className="text-lg text-slate-800 max-w-2xl mx-auto font-medium">
              Comprehensive aerospace education and professional services
              designed to elevate your career and projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerings.map((offering, index) => {
              const Icon = offering.icon;
              return (
                <Card key={index} className="card-hover border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="text-amber-500 mb-6">
                      <Icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-4">
                      {offering.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {offering.description}
                    </p>
                    <ul className="text-sm text-slate-500 mb-6 space-y-2">
                      {offering.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={offering.href}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-amber-500 transition-colors duration-200"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Why Choose AeroAcademy?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover what sets us apart in aerospace education and consultancy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-4">
                    {advantage.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              What Our Students & Clients Say
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real experiences from professionals who have transformed their
              careers with us
            </p>
          </div>

          {testimonials && (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-0 shadow-lg">
                  <CardContent className="p-8 relative">
                    <Quote className="h-10 w-10 text-amber-500 mb-4" />
                    <p className="text-slate-600 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      {testimonial.imageUrl && (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-blue-600">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {testimonial.position}
                          {testimonial.company && `, ${testimonial.company}`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                Latest Industry Insights
              </h2>
              <p className="text-lg text-slate-600">
                Stay informed with our expert analysis and industry updates
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Link href="/industry-insights" className="flex items-center">
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {featuredArticles && (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map((article) => (
                <Card
                  key={article.id}
                  className="card-hover overflow-hidden border-0 shadow-lg"
                >
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {new Date(article.publishedAt!).toLocaleDateString()}
                      </span>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <Badge variant="secondary" className="capitalize">
                        {article.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-3 hover:text-amber-500 transition-colors duration-200">
                      <Link href={`/articles/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/articles/${article.id}`}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-amber-500 transition-colors duration-200"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Link href="/industry-insights" className="flex items-center">
                View All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Aerospace Journey?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Get in touch with our experts to discuss your learning goals or
              consultancy needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Link href="/courses" className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Explore Courses
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                <Link href="/contact" className="flex items-center">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
