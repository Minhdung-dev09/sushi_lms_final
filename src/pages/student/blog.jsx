import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const mockPosts = [
  {
    id: 1,
    title: "Lợi ích của việc học trực tuyến",
    summary:
      "Khám phá những lợi ích nổi bật của việc học trực tuyến trong thời đại số.",
    image: "/banners-img.jpg",
  },
  {
    id: 2,
    title: "5 mẹo để học hiệu quả hơn",
    summary:
      "Những bí quyết giúp bạn tối ưu hóa quá trình học tập và đạt kết quả cao.",
    image: "/banners-img.jpg",
  },
  {
    id: 3,
    title: "Tại sao nên chọn các khóa học kỹ năng mềm?",
    summary:
      "Kỹ năng mềm ngày càng quan trọng trong công việc và cuộc sống. Hãy tìm hiểu lý do tại sao!",
    image: "/banners-img.jpg",
  },
];

function StudentBlogPage() {
  const [posts] = useState(mockPosts);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Bài viết nổi bật</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="font-bold text-xl mb-2">{post.title}</h2>
              <p className="text-gray-700 text-base mb-4">{post.summary}</p>
              <button
                className="text-primary font-semibold hover:underline"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                Đọc tiếp
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default StudentBlogPage;
