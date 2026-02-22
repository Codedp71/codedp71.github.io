import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import type { Article } from "@shared/schema";

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:id");
  const articleId = parseInt(params?.id || "0");

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: ["/api/articles", articleId],
    enabled: !!articleId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-blue-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Article Not Found</h1>
          <p className="text-slate-600">The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 object-cover"
            />
          )}
          
          <div className="p-8">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {article.category}
              </Badge>
              <h1 className="text-3xl font-bold text-blue-600 mb-4">
                {article.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-slate-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{format(new Date(article.publishedAt), "MMMM dd, yyyy")}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg prose-blue max-w-none">
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}