import { GraduationCap, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials, auth } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative bg-gray-200/60 backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold md:text-xl text-[14px]">
            Sushi Learning
          </span>
        </Link>
        <div className="flex items-center space-x-1">
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
      <div className="flex items-center space-x-4">
        {/* Profile Dropdown */}
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
    </header>
  );
}

export default StudentViewCommonHeader;
