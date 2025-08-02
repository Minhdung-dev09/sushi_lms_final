import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Calendar, User } from "lucide-react";

function BlogGrid({ posts, onPostClick }) {
  const { t } = useTranslation();
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="font-bold text-2xl text-gray-600 mb-2">
          {t('errors.noBlogsFound')}
        </h2>
        <p className="text-gray-500">
          {t('common.try')} {t('common.change')} {t('common.filter')} {t('common.or')} {t('common.keyword')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card
          key={post._id || post.id}
          className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          onClick={() => onPostClick(post._id || post.id)}
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.createdAt || post.date).toLocaleDateString(
                  "vi-VN"
                )}
              </span>
            </div>

            <h2 className="font-bold text-lg mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">
              {post.summary}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <User className="w-3 h-3" />
                {post.author}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80"
              >
                {t('blog.readMore')}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default BlogGrid;
