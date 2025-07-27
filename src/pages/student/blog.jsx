import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogPage from "@/components/blog-page";
import { fetchPublicBlogListService } from "@/services";
import { images } from "@/lib/images";

const mockPosts = [
  {
    _id: "1",
    title: "Lợi ích của việc học trực tuyến",
    summary:
      "Khám phá những lợi ích nổi bật của việc học trực tuyến trong thời đại số.",
    image: images.banner.jpg,
    category: "Học tập",
    author: "Admin",
    createdAt: "2024-01-15T10:30:00.000Z",
    tags: ["học trực tuyến", "giáo dục", "công nghệ"],
  },
  {
    _id: "2",
    title: "5 mẹo để học hiệu quả hơn",
    summary:
      "Những bí quyết giúp bạn tối ưu hóa quá trình học tập và đạt kết quả cao.",
    image: images.banner.jpg,
    category: "Kỹ năng",
    author: "Chuyên gia",
    createdAt: "2024-01-10T14:20:00.000Z",
    tags: ["học tập", "kỹ năng", "hiệu quả"],
  },
  {
    _id: "3",
    title: "Tại sao nên chọn các khóa học kỹ năng mềm?",
    summary:
      "Kỹ năng mềm ngày càng quan trọng trong công việc và cuộc sống. Hãy tìm hiểu lý do tại sao!",
    image: images.banner.jpg,
    category: "Phát triển",
    author: "Coach",
    createdAt: "2024-01-08T09:15:00.000Z",
    tags: ["kỹ năng mềm", "phát triển", "nghề nghiệp"],
  },
  {
    _id: "4",
    title: "Cách xây dựng thói quen học tập tốt",
    summary:
      "Hướng dẫn chi tiết cách tạo lập và duy trì những thói quen học tập hiệu quả.",
    image: images.banner.jpg,
    category: "Học tập",
    author: "Giáo viên",
    createdAt: "2024-01-05T16:45:00.000Z",
    tags: ["thói quen", "học tập", "rèn luyện"],
  },
  {
    _id: "5",
    title: "Công nghệ AI trong giáo dục",
    summary:
      "Tìm hiểu về vai trò và ứng dụng của trí tuệ nhân tạo trong lĩnh vực giáo dục hiện đại.",
    image: images.banner.jpg,
    category: "Công nghệ",
    author: "Tech Expert",
    createdAt: "2024-01-03T11:20:00.000Z",
    tags: ["AI", "công nghệ", "giáo dục"],
  },
  {
    _id: "6",
    title: "Phương pháp học ngoại ngữ hiệu quả",
    summary:
      "Những phương pháp và công cụ giúp bạn học ngoại ngữ một cách hiệu quả và nhanh chóng.",
    image: images.banner.jpg,
    category: "Ngôn ngữ",
    author: "Language Coach",
    createdAt: "2024-01-01T08:30:00.000Z",
    tags: ["ngoại ngữ", "học tập", "phương pháp"],
  },
];

function StudentBlogPage() {
  const [posts, setPosts] = useState(mockPosts);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetchPublicBlogListService("status=published");
        if (response?.success) {
          setPosts(response?.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Keep using mock data if service fails
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải bài viết...</div>
        </div>
      </div>
    );
  }

  return <BlogPage posts={posts} onPostClick={handlePostClick} />;
}

export default StudentBlogPage;
