import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  GraduationCap,
  FileText,
  Award,
  Calendar,
  MapPin,
  ArrowLeft,
  Phone,
  Mail,
} from "lucide-react";
// ✅ Use local static data — no API needed
import { coursesData } from "@/lib/data";

export default function CourseDetail() {
  const [, params] = useRoute("/courses/:id");
  const courseId = params?.id ? parseInt(params.id) : null;

  // ✅ Find course from local data instead of API call
  const course = coursesData.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-600 mb-2">Course Not Found</h2>
          <p className="text-slate-500 mb-4">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="outline">
            <Link href="/courses" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/courses">Courses</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{course.title}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Course Header */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 capitalize"
                >
                  {course.category.replace("-", " & ")}
                </Badge>
                {course.featured && (
                  <Badge
                    variant="outline"
                    className="border-amber-400 text-amber-300 bg-amber-400/10"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Featured Course
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">
                {course.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-amber-400" />
              <div className="font-semibold">{course.duration}</div>
              <div className="text-sm text-blue-200">Duration</div>
            </div>
            <div className="text-center">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-amber-400" />
              <div className="font-semibold capitalize">{course.format}</div>
              <div className="text-sm text-blue-200">Format</div>
            </div>
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-amber-400" />
              <div className="font-semibold">Professionals</div>
              <div className="text-sm text-blue-200">Target Audience</div>
            </div>
            <div className="text-center">
              <Award className="h-6 w-6 mx-auto mb-2 text-amber-400" />
              <div className="font-semibold">Certificate</div>
              <div className="text-sm text-blue-200">Upon Completion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                        Course Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {course.description}
                      </p>
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-800 mb-3">Target Audience</h4>
                        <p className="text-slate-600">{course.targetAudience}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                        What You'll Learn
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {course.learningOutcomes?.map((outcome, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        Course Modules
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {course.modules?.map((module, index) => (
                          <div
                            key={index}
                            className="flex items-start p-4 bg-slate-50 rounded-lg"
                          >
                            <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h5 className="font-semibold text-slate-800 mb-1">{module}</h5>
                              <p className="text-sm text-slate-600">
                                Comprehensive coverage of key concepts and practical applications
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requirements" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                        Prerequisites
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">
                        {course.prerequisites ||
                          "No specific prerequisites required. Basic understanding of relevant concepts is helpful."}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-slate-600">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          Computer with reliable internet connection
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          Access to simulation software (provided during course)
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          Webcam and microphone for interactive sessions
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      {course.price ? (
                        <div>
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            ₹{course.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-500">One-time payment</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            Contact for Price
                          </div>
                          <div className="text-sm text-slate-500">Custom pricing available</div>
                        </div>
                      )}
                    </div>

                    <Button className="w-full btn-secondary mb-4">
                      <Calendar className="mr-2 h-4 w-4" />
                      Enroll Now
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white mb-6"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download Syllabus
                    </Button>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-800">Course Details</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Duration</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Format</span>
                        <span className="font-medium capitalize">{course.format}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Certificate</span>
                        <span className="font-medium">Yes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Support</span>
                        <span className="font-medium">24/7</span>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Need Help?</h4>
                      <div className="flex items-center text-sm text-slate-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>info@aeroacademy.com</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        <Link href="/contact">Contact Support</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Related Courses</h2>
            <p className="text-lg text-slate-600">
              Expand your skills with these complementary courses
            </p>
          </div>

          {/* Show related courses from same category */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {coursesData
              .filter((c) => c.category === course.category && c.id !== course.id)
              .map((related) => (
                <Card key={related.id} className="card-hover border-0 shadow-lg">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 capitalize">
                      {related.category.replace("-", " & ")}
                    </Badge>
                    <h3 className="font-bold text-blue-600 mb-2">{related.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {related.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-600">
                        {related.price ? `₹${related.price.toLocaleString()}` : "Contact for Price"}
                      </span>
                      <Button size="sm" variant="outline">
                        <Link href={`/courses/${related.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Link href="/courses" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}