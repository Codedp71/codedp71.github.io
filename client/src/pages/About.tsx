import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Target, Rocket } from "lucide-react";

export default function About() {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ["/api/team-members"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
            About Aerospace Academy
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Leading the future of aerospace education and consultancy with innovation, 
            expertise, and a commitment to excellence in drone technology and aerospace engineering.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="card-hover border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  To empower the next generation of aerospace professionals with cutting-edge 
                  knowledge and practical skills in drone technology and aerospace engineering.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <Rocket className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  To be the premier aerospace academy globally recognized for excellence in 
                  education, innovation, and industry partnerships.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Values</h3>
                <p className="text-slate-600 leading-relaxed">
                  Excellence, Innovation, Safety, and Integrity guide everything we do. 
                  We believe in practical learning and industry-relevant education.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Story</h2>
              <div className="prose prose-lg prose-blue max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6">
                  Founded in 2020, Aerospace Academy emerged from a vision to bridge the gap between 
                  traditional aerospace education and the rapidly evolving drone industry. Our founders, 
                  seasoned aerospace engineers and educators, recognized the need for specialized training 
                  programs that combine theoretical knowledge with hands-on practical experience.
                </p>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  Starting with a small team of passionate instructors, we have grown into a comprehensive 
                  aerospace education and consultancy organization. Today, we serve students, professionals, 
                  and organizations worldwide with our innovative curriculum and expert consultancy services.
                </p>
                
                <p className="text-slate-600 leading-relaxed">
                  Our approach combines cutting-edge technology with proven educational methodologies. 
                  We maintain strong partnerships with industry leaders, ensuring our programs remain 
                  current with the latest developments in aerospace technology and regulations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our expert team brings decades of combined experience in aerospace engineering, 
              education, and industry leadership.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="animate-pulse">
                      <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded mb-4"></div>
                      <div className="h-20 bg-slate-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers?.map((member: any) => (
                <Card key={member.id} className="card-hover border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-12 w-12 text-blue-600" />
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{member.name}</h3>
                    <p className="text-amber-600 font-semibold mb-4">{member.position}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                    
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-blue-600 text-sm mb-1">Qualifications</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.qualifications?.map((qual: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-blue-600 text-sm mb-1">Specialties</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {member.specialties?.map((specialty: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
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

      {/* Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-200">Students Trained</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-200">Companies Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-200">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-200">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}