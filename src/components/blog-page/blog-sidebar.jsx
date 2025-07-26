import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Tag } from "lucide-react";

const categories = [
  "Tất cả",
  "Học tập",
  "Kỹ năng",
  "Phát triển",
  "Công nghệ",
  "Ngôn ngữ",
];
const tags = [
  "học trực tuyến",
  "giáo dục",
  "công nghệ",
  "học tập",
  "kỹ năng",
  "hiệu quả",
  "kỹ năng mềm",
  "phát triển",
  "nghề nghiệp",
  "thói quen",
  "rèn luyện",
  "AI",
  "ngoại ngữ",
  "phương pháp",
];

function BlogSidebar({
  showSidebar,
  setShowSidebar,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
  handleTagToggle,
  totalPosts,
  filteredPostsCount,
}) {
  return (
    <div
      className={`w-full lg:w-80 flex-shrink-0 order-1 lg:order-2 ${
        showSidebar ? "block" : "hidden lg:block"
      } ${
        showSidebar
          ? "fixed right-0 top-0 h-full bg-white z-50 lg:relative lg:bg-transparent"
          : ""
      }`}
    >
      <div
        className={`lg:sticky lg:top-4 space-y-6 ${
          showSidebar ? "p-4 overflow-y-auto h-full" : ""
        }`}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Bộ lọc bài viết</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(false)}
            className="p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tìm kiếm */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Tìm kiếm bài viết
          </h3>
          <Input
            placeholder="Nhập từ khóa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </Card>

        {/* Lọc theo danh mục */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Danh mục
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Card>

        {/* Lọc theo tags */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTags([])}
              className="mt-3 text-xs"
            >
              Xóa tất cả tags
            </Button>
          )}
        </Card>

        {/* Thống kê */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Thống kê</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tổng bài viết:</span>
              <span className="font-semibold">{totalPosts}</span>
            </div>
            <div className="flex justify-between">
              <span>Đang hiển thị:</span>
              <span className="font-semibold">{filteredPostsCount}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BlogSidebar;
