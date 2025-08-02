import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchRecentBlogsService } from "@/services";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HomeSidebar({ onPostClick }) {
  const { t } = useTranslation();
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchRecentBlogsService();
        if (response?.success) {
          setLatestPosts(response.data || []);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching latest posts:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full lg:w-80 flex-shrink-0">
        <div className="sticky top-4 space-y-6">
          {/* Quảng cáo Google */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
              {t("common.advertisement")}
            </h3>
            <div className="bg-gray-100 rounded-lg p-4 min-h-[250px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-2xl mb-2">📢</div>
                <p className="text-sm">Google AdSense</p>
                <p className="text-xs mt-1">300x250</p>
              </div>
            </div>
          </Card>

          {/* Loading state cho bài viết mới nhất */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 text-lg">{t("home.sidebar.latestPosts")}</h3>
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className="sticky top-4 space-y-6">
        {/* Quảng cáo Google */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 text-sm text-gray-600 uppercase tracking-wide">
            {t("common.advertisement")}
          </h3>
          <div className="bg-gray-100 rounded-lg p-4 min-h-[250px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <img
                src="/ads.png"
                className="w-60 h-30 mb-14"
                alt="Quảng cáo"
              />
              <p className="text-sm">
                <a
                  href="https://sushilaw.io.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-primary/80 font-medium transition-colors"
                >
                  Sushilaw.io.vn - Pháp lý cho mọi người
                </a>
              </p>
            </div>
          </div>
        </Card>

        {/* Top 5 bài viết mới nhất */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 text-lg">{t("home.sidebar.latestPosts")}</h3>
          {error ? (
            <div className="text-center py-4 text-gray-500">
              {t("errors.cannotLoadBlogs")}
            </div>
          ) : latestPosts.length > 0 ? (
            <div className="space-y-4">
              {latestPosts.map((post) => (
                <div
                  key={post._id}
                  className="group cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  onClick={() => onPostClick(post._id)}
                >
                  <div className="flex gap-3">
                    {/* Hình ảnh bài viết */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={post.image || "/banners-img.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Nội dung bài viết */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Badge
                          variant="secondary"
                          className="text-xs px-1 py-0"
                        >
                          {post.category}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              {t("errors.noBlogsYet")}
            </div>
          )}

          {/* Nút xem tất cả bài viết */}
          <div className="mt-4 pt-4 border-t">
            <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              <Link to="/blog">{t("blog.viewAllPosts")} →</Link>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HomeSidebar;
