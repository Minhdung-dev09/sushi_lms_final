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
import {
  BarChart,
  Book,
  FileText,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resetCredentials, auth } = useContext(AuthContext);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem.value === "logout") {
      handleLogout();
    } else {
      setActiveTab(menuItem.value);
    }
    closeMobileMenu();
  };

  console.log(instructorCoursesList, "instructorCoursesList");

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <GraduationCap className="h-8 w-8" />
          <span className="font-extrabold text-xl">Sushi Learning</span>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-gray-100 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <div className="flex h-full min-h-screen bg-gray-100">
        {/* Desktop Sidebar */}
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

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
              Bảng điều khiển
            </h1>
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobileMenu}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="p-6">
            {/* User Info */}
            {auth?.user && (
              <div className="mb-6 px-4 py-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-900">
                  {auth.user.userName || auth.user.name || "Instructor"}
                </div>
                <div className="text-sm text-gray-500">
                  {auth.user.userEmail || auth.user.email}
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-2">
              {menuItems.map((menuItem) => (
                <button
                  key={menuItem.value}
                  onClick={() => handleMenuClick(menuItem)}
                  className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition-colors ${
                    activeTab === menuItem.value
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50 text-gray-900"
                  } ${menuItem.value === "logout" ? "text-red-600" : ""}`}
                >
                  <menuItem.icon className="w-5 h-5" />
                  <span className="font-medium">{menuItem.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorDashboardpage;
