import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import InstructorBlog from "@/components/instructor-view/blog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  fetchInstructorCourseListService,
  fetchInstructorBlogListService,
} from "@/services";
import { BarChart, Book, FileText, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const {
    instructorCoursesList,
    setInstructorCoursesList,
    instructorBlogsList,
    setInstructorBlogsList,
  } = useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  async function fetchAllBlogs() {
    try {
      const response = await fetchInstructorBlogListService();
      if (response?.success) {
        setInstructorBlogsList(response?.data);
      } else {
        // Fallback to mock data if service fails
        const mockBlogs = [
          {
            _id: "1",
            title: "Lợi ích của việc học trực tuyến",
            summary:
              "Khám phá những lợi ích nổi bật của việc học trực tuyến trong thời đại số.",
            content: "Nội dung chi tiết về lợi ích học trực tuyến...",
            category: "Học tập",
            author: "Admin",
            image: "/banners-img.jpg",
            tags: ["học trực tuyến", "giáo dục", "công nghệ"],
            status: "published",
            createdAt: "2024-01-15",
          },
          {
            _id: "2",
            title: "5 mẹo để học hiệu quả hơn",
            summary:
              "Những bí quyết giúp bạn tối ưu hóa quá trình học tập và đạt kết quả cao.",
            content: "Nội dung chi tiết về các mẹo học tập...",
            category: "Kỹ năng",
            author: "Chuyên gia",
            image: "/banners-img.jpg",
            tags: ["học tập", "kỹ năng", "hiệu quả"],
            status: "draft",
            createdAt: "2024-01-10",
          },
        ];
        setInstructorBlogsList(mockBlogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Fallback to mock data
      const mockBlogs = [
        {
          _id: "1",
          title: "Lợi ích của việc học trực tuyến",
          summary:
            "Khám phá những lợi ích nổi bật của việc học trực tuyến trong thời đại số.",
          content: "Nội dung chi tiết về lợi ích học trực tuyến...",
          category: "Học tập",
          author: "Admin",
          image: "/banners-img.jpg",
          tags: ["học trực tuyến", "giáo dục", "công nghệ"],
          status: "published",
          createdAt: "2024-01-15",
        },
        {
          _id: "2",
          title: "5 mẹo để học hiệu quả hơn",
          summary:
            "Những bí quyết giúp bạn tối ưu hóa quá trình học tập và đạt kết quả cao.",
          content: "Nội dung chi tiết về các mẹo học tập...",
          category: "Kỹ năng",
          author: "Chuyên gia",
          image: "/banners-img.jpg",
          tags: ["học tập", "kỹ năng", "hiệu quả"],
          status: "draft",
          createdAt: "2024-01-10",
        },
      ];
      setInstructorBlogsList(mockBlogs);
    }
  }

  useEffect(() => {
    fetchAllCourses();
    fetchAllBlogs();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Bảng điều khiển",
      value: "dashboard",
      component: (
        <InstructorDashboard
          listOfCourses={instructorCoursesList}
          listOfBlogs={instructorBlogsList}
        />
      ),
    },
    {
      icon: Book,
      label: "Khóa học",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: FileText,
      label: "Bài viết",
      value: "blogs",
      component: (
        <InstructorBlog
          listOfBlogs={instructorBlogsList}
          onBlogUpdate={fetchAllBlogs}
        />
      ),
    },
    {
      icon: LogOut,
      label: "Đăng xuất",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  console.log(instructorCoursesList, "instructorCoursesList");

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Sushi Learning</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Bảng điều khiển</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value} key={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
