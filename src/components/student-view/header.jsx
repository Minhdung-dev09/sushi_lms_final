import { User, Menu, X, GraduationCap, Home, BookOpen, FileText, LogOut, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../ui/language-toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetCredentials, auth } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navigationItems = [
    { path: "/home", label: t('common.home'), icon: Home },
    { path: "/courses", label: t('common.courses'), icon: BookOpen },
    { path: "/blog", label: t('common.blog'), icon: FileText },
  ];

  return (
    <>
      {/* Modern Header with Glass Effect */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/70 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link 
                to="/home" 
                className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img src="/logo.svg" alt="Sushi Learning" className="h-8 w-8" />
                  <div className="absolute inset-0 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 scale-150"></div>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sushi Learning
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => {
                      if (!isActive) {
                        navigate(item.path);
                      }
                    }}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                    )}
                  </Button>
                );
              })}
            </nav>

            {/* Desktop Profile Section */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageToggle variant="icon" />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 focus:outline-none transition-all duration-300 hover:scale-105">
                    <User className="w-5 h-5 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2">
                  {/* User Info */}
                  {auth?.user && (
                    <>
                      <div className="px-3 py-3 border-b border-gray-100 mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-gray-900 truncate">
                              {auth.user.userName || auth.user.name || "User"}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {auth.user.userEmail || auth.user.email}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem
                    onClick={() => navigate("/student-courses")}
                    className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{t('common.myCourses')}</span>
                  </DropdownMenuItem>
                  

                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('common.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 focus:outline-none transition-all duration-300"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* Enhanced Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop with blur effect */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Menu Panel with slide animation */}
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">{t('navigation.menu')}</h2>
            </div>
            <button
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="p-6 bg-white/90 backdrop-blur-sm h-full overflow-y-auto">
            {/* Navigation Links */}
            <div className="space-y-2 mb-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      closeMobileMenu();
                    }}
                    className={`w-full flex items-center space-x-3 text-left py-4 px-4 rounded-xl transition-all duration-300 font-medium ${
                      isActive 
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Language Toggle */}
            <div className="mb-6">
              <LanguageToggle variant="text" className="w-full justify-start py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200" />
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-200"></div>

            {/* User Info & Profile Section */}
            <div className="space-y-2">
              {/* User Info Card */}
              {auth?.user && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {auth.user.userName || auth.user.name || "User"}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {auth.user.userEmail || auth.user.email}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Actions */}
              <button
                onClick={() => {
                  navigate("/student-courses");
                  closeMobileMenu();
                }}
                className={`w-full flex items-center space-x-3 text-left py-4 px-4 rounded-xl transition-all duration-300 font-medium ${
                  isActivePage("/student-courses")
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>{t('common.myCourses')}</span>
              </button>



              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full flex items-center space-x-3 text-left py-4 px-4 rounded-xl hover:bg-red-50 transition-colors duration-200 text-red-600 font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>{t('common.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentViewCommonHeader;
