import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import CourseGrid from "./course-grid";
import CourseSidebar from "./course-sidebar";
import CourseToolbar from "./course-toolbar";

function CoursePage({
  studentViewCoursesList,
  loadingState,
  filters,
  setFilters,
  search,
  setSearch,
  sort,
  setSort,
  handleCourseNavigate,
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  // Lọc khóa học dựa trên tìm kiếm
  const filteredCourses =
    studentViewCoursesList?.filter(
      (courseItem) =>
        courseItem?.title?.toLowerCase().includes(search.toLowerCase()) ||
        courseItem?.instructorName?.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header với nút toggle sidebar */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            {/* Toolbar được đặt ở đây để tối ưu layout */}
            <CourseToolbar
              sort={sort}
              setSort={setSort}
              filteredCoursesCount={filteredCourses.length}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden bg-white shadow-lg border-gray-200 hover:bg-gray-50"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {/* Mobile overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - Khóa học */}
          <div className="flex-1 order-2 lg:order-1">
            <CourseGrid
              courses={filteredCourses}
              loadingState={loadingState}
              onCourseClick={handleCourseNavigate}
            />
          </div>

          {/* Sidebar - Bộ lọc */}
          <CourseSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
            totalCourses={studentViewCoursesList?.length || 0}
            filteredCoursesCount={filteredCourses.length}
          />
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
