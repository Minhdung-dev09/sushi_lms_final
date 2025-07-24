import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

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

function StudentBlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = mockPosts.find((p) => p.id === Number(id));

  if (!post) {
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
      <Card className="max-w-2xl mx-auto p-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-gray-700 mb-6">{post.summary}</p>
        <button className="text-primary underline" onClick={() => navigate(-1)}>
          Quay lại danh sách bài viết
        </button>
      </Card>
    </div>
  );
}

export default StudentBlogDetailPage;
