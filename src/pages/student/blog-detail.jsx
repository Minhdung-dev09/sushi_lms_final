import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { fetchPublicBlogDetailsService } from "@/services";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag, Eye, Heart } from "lucide-react";

function StudentBlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetchPublicBlogDetailsService(id);
        if (response?.success) {
          setPost(response.data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching blog detail:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải bài viết...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
        <button className="text-primary underline" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            className="text-primary underline mb-4 inline-flex items-center"
            onClick={() => navigate(-1)}
          >
            ← Quay lại danh sách bài viết
          </button>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.viewCount || 0} lượt xem</span>
            </div>
          </div>

          {/* Category and Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            {post.tags &&
              post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
          </div>
        </div>

        {/* Featured Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        {/* Summary */}
        {post.summary && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-lg text-gray-700 italic">{post.summary}</p>
          </div>
        )}

        {/* Content */}
        <div className="prose max-w-none">
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </Card>
    </div>
  );
}

export default StudentBlogDetailPage;
