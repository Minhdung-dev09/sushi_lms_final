import { GraduationCap, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetCredentials, auth } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Check current active page
  const isActivePage = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b relative bg-gray-200/60 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center hover:text-black">
            <GraduationCap className="h-8 w-8 mr-4 " />
            <span className="font-extrabold md:text-xl text-[14px]">
              Sushi Learning
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => {
                location.pathname.includes("/courses")
                  ? null
                  : navigate("/courses");
              }}
              className="text-[14px] md:text-[16px] font-medium"
            >
              Khám phá khóa học
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                location.pathname.includes("/blog") ? null : navigate("/blog");
              }}
              className="text-[14px] md:text-[16px] font-medium"
            >
              Bài viết
            </Button>
          </div>
        </div>

        {/* Desktop Profile Dropdown */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-gray-100 focus:outline-none">
                <User className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Thông tin cá nhân */}
              {auth?.user && (
                <div className="px-3 py-2 border-b mb-1">
                  <div className="font-semibold text-sm truncate max-w-[180px]">
                    {auth.user.userName || auth.user.name || "User"}
                  </div>
                  <div className="text-xs text-gray-500 truncate max-w-[180px]">
                    {auth.user.userEmail || auth.user.email}
                  </div>
                </div>
              )}
              <DropdownMenuItem
                onClick={() => navigate("/student-courses")}
                className="cursor-pointer"
              >
                Khóa học của tôi
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-gray-100 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

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
          className={`absolute top-0 right-0 w-80 h-full bg-white/65 backdrop-blur-sm shadow-2xl transform transition-transform duration-300 ease-out ${
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
            {/* Navigation Links */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  navigate("/courses");
                  closeMobileMenu();
                }}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors font-medium ${
                  isActivePage("/courses")
                    ? "bg-blue-200 text-gray-900"
                    : ""
                }`}
              >
                Khám phá khóa học
              </button>

              <button
                onClick={() => {
                  navigate("/blog");
                  closeMobileMenu();
                }}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors font-medium ${
                  isActivePage("/blog")
                    ? "bg-blue-200 text-gray-900"
                    : ""
                }`}
              >
                Bài viết
              </button>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-800"></div>

            {/* User Info & Profile Section */}
            <div className="space-y-2">
              {/* User Info */}
              {auth?.user && (
                <div className="px-4 py-3">
                  <div className="font-semibold text-gray-900">
                    {auth.user.userName || auth.user.name || "User"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {auth.user.userEmail || auth.user.email}
                  </div>
                </div>
              )}

              {/* Profile Actions */}
              <button
                onClick={() => {
                  navigate("/student-courses");
                  closeMobileMenu();
                }}
                className={`w-full text-left py-3 px-4 rounded-lg transition-colors font-medium ${
                  isActivePage("/student-courses")
                    ? "bg-blue-200 text-gray-900"
                    : ""
                }`}
              >
                Khóa học của tôi
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-red-600 font-medium"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentViewCommonHeader;
