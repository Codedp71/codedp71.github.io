import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Search,
  Calendar,
  User,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Filter,
  Clock,
} from "lucide-react";
import type { Article } from "@shared/schema";

const categoryInfo = {
  technology: { name: "Technology", color: "blue" },
  regulations: { name: "Regulations", color: "green" },
  education: { name: "Education", color: "purple" },
  trends: { name: "Trends", color: "orange" },
};

export default function IndustryInsights() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  // Filter and sort articles
  const filteredArticles = articles?.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.publishedAt!).getTime() - new Date(b.publishedAt!).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      case "newest":
      default:
        return new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime();
    }
  });

  const featuredArticles = articles?.filter(article => article.featured) || [];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Industry Insights & Updates</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Stay ahead of the curve with expert analysis, breakthrough technologies, regulatory updates, and market trends in the aerospace industry.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-12">
              <TrendingUp className="h-6 w-6 text-amber-500 mr-3" />
              <h2 className="text-3xl font-bold text-blue-600">Featured Insights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 3).map((article) => (
                <Card key={article.id} className="card-hover border-0 shadow-lg overflow-hidden">
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
                      <span>{new Date(article.publishedAt!).toLocaleDateString()}</span>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <Badge 
                        variant="secondary" 
                        className={`capitalize ${
                          categoryInfo[article.category as keyof typeof categoryInfo]?.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          categoryInfo[article.category as keyof typeof categoryInfo]?.color === 'green' ? 'bg-green-100 text-green-800' :
                          categoryInfo[article.category as keyof typeof categoryInfo]?.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {categoryInfo[article.category as keyof typeof categoryInfo]?.name}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-3 hover:text-amber-500 transition-colors duration-200">
                      <Link href={`/articles/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-slate-500">
                        <User className="h-4 w-4 mr-2" />
                        <span>{article.author}</span>
                      </div>
                      <Link 
                        href={`/articles/${article.id}`}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-amber-500 transition-colors duration-200"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryInfo).map(([key, info]) => (
                    <SelectItem key={key} value={key}>{info.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredArticles.length > 0 && (
            <div className="mt-4 text-sm text-slate-600">
              Showing {sortedArticles.length} of {articles?.length || 0} articles
            </div>
          )}
        </div>
      </section>

      {/* Category Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Content Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our comprehensive coverage of aerospace industry topics
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryInfo).map(([key, info]) => {
              const articleCount = articles?.filter(article => article.category === key).length || 0;
              return (
                <Card key={key} className="card-hover border-0 shadow-lg cursor-pointer" onClick={() => setSelectedCategory(key)}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      info.color === 'blue' ? 'bg-blue-100' :
                      info.color === 'green' ? 'bg-green-100' :
                      info.color === 'purple' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      <BookOpen className={`h-8 w-8 ${
                        info.color === 'blue' ? 'text-blue-600' :
                        info.color === 'green' ? 'text-green-600' :
                        info.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{info.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {articleCount} article{articleCount !== 1 ? 's' : ''} available
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`border-${info.color}-600 text-${info.color}-600 hover:bg-${info.color}-600 hover:text-white`}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-blue-600">Latest Articles</h2>
            {selectedCategory !== "all" && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                View All Articles
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-0 shadow-lg animate-pulse">
                  <div className="h-48 bg-slate-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedArticles.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search criteria or browse all articles.</p>
              {(searchQuery || selectedCategory !== "all") && (
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
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArticles.map((article) => (
                <Card key={article.id} className="card-hover border-0 shadow-lg overflow-hidden">
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
                      <span>{new Date(article.publishedAt!).toLocaleDateString()}</span>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <Badge 
                        variant="secondary" 
                        className={`capitalize ${
                          categoryInfo[article.category as keyof typeof categoryInfo]?.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                          categoryInfo[article.category as keyof typeof categoryInfo]?.color === 'green' ? 'bg-green-100 text-green-800' :
                          categoryInfo[article.category as keyof typeof categoryInfo]?.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {categoryInfo[article.category as keyof typeof categoryInfo]?.name}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-blue-600 mb-3 hover:text-amber-500 transition-colors duration-200">
                      <Link href={`/articles/${article.id}`}>{article.title}</Link>
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-slate-500">
                        <User className="h-4 w-4 mr-2" />
                        <span>{article.author}</span>
                      </div>
                      <Link 
                        href={`/articles/${article.id}`}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-amber-500 transition-colors duration-200"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest aerospace insights, industry trends, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="bg-white/10 border-white/30 text-white placeholder-blue-200"
            />
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
