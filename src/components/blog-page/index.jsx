import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import BlogGrid from "./blog-grid";
import BlogSidebar from "./blog-sidebar";
import {
  fetchPublicBlogListService,
  fetchBlogsByCategoryService,
  fetchBlogsByTagService,
  fetchPopularBlogsService,
  fetchRecentBlogsService,
  searchBlogsService,
} from "@/services";

function BlogPage({ posts, onPostClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("all"); // all, popular, recent

  // Fetch blogs based on filters
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let response;

        if (viewMode === "popular") {
          response = await fetchPopularBlogsService();
        } else if (viewMode === "recent") {
          response = await fetchRecentBlogsService();
        } else if (selectedCategory !== "Tất cả") {
          response = await fetchBlogsByCategoryService(selectedCategory);
        } else if (selectedTags.length > 0) {
          // Fetch by first selected tag
          response = await fetchBlogsByTagService(selectedTags[0]);
        } else if (searchTerm.trim()) {
          response = await searchBlogsService(searchTerm);
        } else {
          response = await fetchPublicBlogListService("status=published");
        }

        if (response?.success) {
          setFilteredPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Fallback to local filtering
        const localFiltered = posts.filter((post) => {
          const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.summary.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory =
            selectedCategory === "Tất cả" || post.category === selectedCategory;
          const matchesTags =
            selectedTags.length === 0 ||
            selectedTags.some((tag) => post.tags.includes(tag));

          return matchesSearch && matchesCategory && matchesTags;
        });
        setFilteredPosts(localFiltered);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchTerm, selectedCategory, selectedTags, viewMode, posts]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setSelectedCategory("Tất cả");
    setSelectedTags([]);
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header với title và nút toggle sidebar */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Bài viết nổi bật</h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("all")}
          >
            Tất cả
          </Button>
          <Button
            variant={viewMode === "popular" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("popular")}
          >
            Phổ biến
          </Button>
          <Button
            variant={viewMode === "recent" ? "default" : "outline"}
            size="sm"
            onClick={() => handleViewModeChange("recent")}
          >
            Mới nhất
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content - Bài viết */}
        <div className="flex-1 order-2 lg:order-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Đang tải bài viết...</div>
            </div>
          ) : (
            <BlogGrid posts={filteredPosts} onPostClick={onPostClick} />
          )}
        </div>

        {/* Sidebar - Bộ lọc */}
        <BlogSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          handleTagToggle={handleTagToggle}
          totalPosts={posts.length}
          filteredPostsCount={filteredPosts.length}
        />
      </div>
    </div>
  );
}

export default BlogPage;
