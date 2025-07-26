import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import PropTypes from "prop-types";

const blogInitialFormData = {
  title: "",
  summary: "",
  content: "",
  category: "",
  author: "",
  image: "",
  tags: [],
  status: "draft", // draft or published
};

function BlogForm({ blog, onSubmit, onClose }) {
  const [formData, setFormData] = useState(blogInitialFormData);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        summary: blog.summary || "",
        content: blog.content || "",
        category: blog.category || "",
        author: blog.author || "",
        image: blog.image || "",
        tags: blog.tags || [],
        status: blog.status || "draft",
      });
    }
  }, [blog]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    onSubmit(formData);
  };

  const categories = [
    "Học tập",
    "Kỹ năng",
    "Phát triển",
    "Công nghệ",
    "Ngôn ngữ",
    "Giáo dục",
    "Khác",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-2xl font-bold">
            {blog ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tiêu đề */}
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề bài viết *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Nhập tiêu đề bài viết..."
                required
              />
            </div>

            {/* Tóm tắt */}
            <div className="space-y-2">
              <Label htmlFor="summary">Tóm tắt</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Nhập tóm tắt bài viết..."
                rows={3}
              />
            </div>

            {/* Nội dung */}
            <div className="space-y-2">
              <Label htmlFor="content">Nội dung bài viết *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Nhập nội dung bài viết..."
                rows={10}
                required
              />
            </div>

            {/* Danh mục và Tác giả */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Tác giả</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Nhập tên tác giả..."
                />
              </div>
            </div>

            {/* Hình ảnh */}
            <div className="space-y-2">
              <Label htmlFor="image">URL hình ảnh</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="Nhập URL hình ảnh..."
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Thêm tag..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Thêm
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Trạng thái */}
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === "published"}
                onCheckedChange={(checked) =>
                  handleInputChange("status", checked ? "published" : "draft")
                }
              />
              <Label htmlFor="status">Xuất bản ngay</Label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button type="submit">
                {blog ? "Cập nhật" : "Thêm bài viết"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

BlogForm.propTypes = {
  blog: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BlogForm;
