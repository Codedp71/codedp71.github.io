import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  Search,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  Filter,
  ArrowRight,
} from "lucide-react";
// ✅ Import local data instead of fetching from API
import { coursesData } from "@/lib/data";

const categoryInfo = {
  drone: {
    title: "Drone Training Courses",
    description: "Master drone operations, regulations, and design principles with our comprehensive DGCA-compliant training programs.",
  },
  "design-simulation": {
    title: "Design & Simulation Courses",
    description: "Learn advanced aerospace design and simulation techniques using industry-standard tools like Ansys and CAD software.",
  },
};

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // ✅ Read URL query param correctly using window.location.search
  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const categoryFromUrl = urlParams.get("category");

  // ✅ Use local static data — no API call needed
  const courses = coursesData;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesUrlCategory =
      !categoryFromUrl || course.category === categoryFromUrl;

    return matchesSearch && matchesCategory && matchesUrlCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "duration":
        return a.duration.localeCompare(b.duration);
      case "featured":
      default:
        return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
    }
  });

  const currentCategory = categoryFromUrl || selectedCategory;
  const categoryData =
    currentCategory !== "all"
      ? categoryInfo[currentCategory as keyof typeof categoryInfo]
      : null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {categoryData?.title || "Aerospace Courses"}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {categoryData?.description ||
              "Discover our comprehensive range of aerospace courses designed to build expertise and advance your career."}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={categoryFromUrl || selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="drone">Drone Training</SelectItem>
                  <SelectItem value="design-simulation">Design & Simulation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            Showing {sortedCourses.length} of {courses.length} courses
          </div>
        </div>
      </section>

      {/* Course Categories — always visible */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Course Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from our specialized training programs designed for different aspects of aerospace engineering
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {Object.entries(categoryInfo).map(([key, info]) => (
              <Card key={key} className="card-hover border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">{info.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{info.description}</p>
                  <Button className="btn-primary">
                    <Link href={`/courses?category=${key}`} className="flex items-center">
                      View Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedCourses.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No courses found</h3>
              <p className="text-slate-500">Try adjusting your search or category filter.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCourses.map((course) => (
                <Card key={course.id} className="card-hover border-0 shadow-lg overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={course.category === "drone" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {course.category.replace("-", " & ")}
                      </Badge>
                      {course.featured && (
                        <Badge variant="outline" className="border-amber-500 text-amber-600">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl text-blue-600 hover:text-amber-500 transition-colors">
                      <Link href={`/courses/${course.id}`}>{course.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 mb-4 leading-relaxed">{course.description}</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{course.duration}</span>
                        <Separator orientation="vertical" className="mx-2 h-4" />
                        <span className="capitalize">{course.format}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{course.targetAudience}</span>
                      </div>
                    </div>
                    {course.learningOutcomes && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-sm text-slate-700 mb-2">
                          Key Learning Outcomes:
                        </h4>
                        <ul className="space-y-1">
                          {course.learningOutcomes.slice(0, 3).map((outcome, index) => (
                            <li key={index} className="flex items-start text-sm text-slate-600">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      {course.price ? (
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{course.price.toLocaleString()}
                        </div>
                      ) : (
                        <div className="text-lg font-semibold text-slate-600">
                          Contact for Price
                        </div>
                      )}
                      <Button className="btn-secondary">
                        <Link href={`/courses/${course.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Need Help Choosing the Right Course?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Our education consultants can help you select the perfect course based on your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary">
              <Link href="/contact" className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Get Course Guidance
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <Link href="/consultancy" className="flex items-center">
                Request Custom Training <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}