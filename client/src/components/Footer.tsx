import { Link } from "wouter";
import { Rocket, Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Industry Insights", href: "/industry-insights" },
    { name: "Consultancy", href: "/consultancy" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Drone Training", href: "/courses?category=drone" },
    { name: "Design & Simulation", href: "/courses?category=design-simulation" },
    { name: "DGCA Compliance", href: "/consultancy" },
    { name: "Aerospace Consultancy", href: "/consultancy" },
    { name: "Custom Training", href: "/consultancy" },
    { name: "Project Advisory", href: "/consultancy" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "YouTube", href: "#", icon: Youtube },
  { name: "Instagram", href: "#", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <Rocket className="h-8 w-8 text-amber-500 mr-3" />
              <span className="font-bold text-xl">AeroAcademy</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Leading aerospace education and consultancy firm empowering professionals with cutting-edge skills and industry expertise.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-400 hover:text-amber-500 transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-amber-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                <div className="text-slate-300">
                  <div>Aerospace Hub</div>
                  <div>Electronic City, Bangalore</div>
                  <div>Karnataka 560100, India</div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-3" />
                <div className="text-slate-300">+91 98765 43210</div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-3" />
                <div className="text-slate-300">info@aeroacademy.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 mb-4 md:mb-0">
              &copy; 2024 AeroAcademy. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/legal" className="text-slate-400 hover:text-amber-500 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/legal" className="text-slate-400 hover:text-amber-500 transition-colors duration-200">
                Terms & Conditions
              </Link>
              <Link href="/legal" className="text-slate-400 hover:text-amber-500 transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
