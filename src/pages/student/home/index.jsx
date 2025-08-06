// Remove the import and use the image directly with root path
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import { StarFilled } from "@ant-design/icons";
import Footer from "@/components/ui/footer";
import LoadingSpinner from "@/components/ui/loading-spinner";
import HomeSidebar from "@/components/home-page/home-sidebar";
import { useTranslation } from "react-i18next";

// CSS tùy chỉnh cho carousel dots
const customDotsStyle = `
  .custom-dots .slick-dots {
    bottom: -40px;
  }
  .custom-dots .slick-dots li button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #e5e7eb;
    border: none;
    transition: all 0.3s ease;
  }
  .custom-dots .slick-dots li.slick-active button {
    background: #3b82f6;
    transform: scale(1.2);
  }
  .custom-dots .slick-dots li button:hover {
    background: #60a5fa;
  }
`;

function StudentHomePage() {
  const { t } = useTranslation();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function fetchAllStudentViewCourses() {
    setLoadingState(true);
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
    setLoadingState(false);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  const handlePostClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  if (loadingState) {
    return <LoadingSpinner />;
  }

  // Dữ liệu mẫu cho đánh giá học viên (thêm số sao)
  const studentReviews = [
    {
      name: "Nguyễn Văn A",
      content: "Khóa học rất tuyệt vời, giảng viên nhiệt tình và dễ hiểu!",
      course: "Lập trình React cơ bản",
      stars: 5,
    },
    {
      name: "Trần Thị B",
      content: "Sau khi học xong mình đã tự tin làm dự án thực tế.",
      course: "Thiết kế UI/UX",
      stars: 4,
    },
    {
      name: "Lê Văn C",
      content:
        "Bài giảng chi tiết, dễ tiếp thu, thực hành nhiều ví dụ thực tế.",
      course: "Python cho người mới bắt đầu",
      stars: 5,
    },
    {
      name: "Phạm Thị D",
      content: "Hỗ trợ học viên rất tốt, mình rất hài lòng!",
      course: "Digital Marketing",
      stars: 5,
    },
  ];

  // Dữ liệu mẫu cho thông số nổi bật
  const stats = [
    { label: "Học viên", value: "5.000+" },
    { label: "Khóa học bán/ngày", value: "130+" },
    { label: "Giảng viên", value: "40+" },
    { label: "Đánh giá 5 sao", value: "98%" },
  ];

  // Dữ liệu cho banner carousel với background images
  const bannerData = [
    {
      title: t("banner.slide1.title"),
      subtitle: t("banner.slide1.subtitle"),
      backgroundImage: "/banner-img.png",
      overlayImage: "/banner-img.png"
    },
    {
      title: t("banner.slide2.title"),
      subtitle: t("banner.slide2.subtitle"),
      backgroundImage: "/banners-img.jpg",
      overlayImage: "/banners-img.jpg"
    },
    {
      title: t("banner.slide3.title"),
      subtitle: t("banner.slide3.subtitle"),
      backgroundImage: "/bg2.jpeg",
      overlayImage: "/bg2.jpeg"
    },
    {
      title: t("banner.slide4.title"),
      subtitle: t("banner.slide4.subtitle"),
      backgroundImage: "/bg4.jpg",
      overlayImage: "/bg4.jpg"
    },
    {
      title: t("banner.slide5.title"),
      subtitle: t("banner.slide5.subtitle"),
      backgroundImage: "/bg-3.jpeg",
      overlayImage: "/bg-3.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{customDotsStyle}</style>
      {/* Banner Carousel Full Width */}
      <section className="w-full">
        <Carousel autoplay autoplaySpeed={4000} dots className="w-full">
          {bannerData.map((slide, index) => (
            <div key={index} className="w-full">
              <div 
                className="relative flex flex-col lg:flex-row items-center justify-between py-16 px-4 lg:px-8 min-h-[500px] lg:min-h-[600px]"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                                 {/* Mobile: Chỉ hiển thị title */}
                 <div className="lg:hidden w-full text-center z-10 mb-4">
                   <h1 className="text-2xl font-bold text-white leading-tight drop-shadow-lg">
                     {slide.title}
                   </h1>
                 </div>
                 
                 {/* Desktop: Hiển thị đầy đủ title, subtitle và buttons */}
                 <div className="hidden lg:block lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 z-10">
                   <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                     {slide.title}
                   </h1>
                   <p className="text-lg lg:text-xl text-white mb-8 leading-relaxed drop-shadow-lg">
                     {slide.subtitle}
                   </p>
                   <div className="flex flex-col sm:flex-row gap-4">
                     <Button
                       className="px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:-translate-y-1 border-0"
                       onClick={() => navigate("/courses")}
                     >
                       {t("banner.exploreCourses")}
                     </Button>
                     <Button
                       variant="outline"
                       className="px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-white text-white hover:bg-white hover:text-gray-800 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm bg-white/10"
                       onClick={() => navigate("/blog")}
                     >
                       {t("banner.readBlog")}
                     </Button>
                   </div>
                 </div>
                                 <div className="flex lg:w-1/2 justify-center lg:justify-end z-10">
                   <img
                     src={slide.overlayImage}
                     alt="Banner"
                     className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-2xl shadow-2xl object-cover"
                   />
                 </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Khóa học nổi bật với layout mới */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main content - Khóa học nổi bật */}
            <div className="flex-1">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <div className="mb-8">
                     <h2 className="text-xl font-medium text-gray-500 tracking-tight flex items-center gap-2">
                      <StarFilled className="text-yellow-400" />
                      {t("home.featuredCourses")}
                      </h2>
                   </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                  studentViewCoursesList.map((courseItem) => (
                    <div
                      key={courseItem?._id}
                      onClick={() => handleCourseNavigate(courseItem?._id)}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                    >
                      {/* Image Container với tối ưu hóa */}
                      <div className="relative overflow-hidden h-32">
                        <img
                          src={courseItem?.image}
                          alt={courseItem?.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = '/bg2.jpg'; // Fallback image
                            e.target.onerror = null;
                          }}
                        />
                        {/* Overlay gradient khi hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Badge cho khóa học mới hoặc hot */}
                        <div className="absolute top-2 left-2">
                          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                            HOT
                          </span>
                        </div>
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {courseItem?.category || "Lập trình"}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-sm mb-1 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {courseItem?.title}
                        </h3>
                        
                        <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                          {courseItem?.instructorName}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-lg font-bold text-blue-600">
                              {courseItem?.pricing * 23000}₫
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              {Math.round(courseItem?.pricing * 23000 * 1.3)}₫
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <span>PR</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                                     <div className="col-span-full text-center py-12">
                     <div className="bg-gray-50 rounded-2xl p-8">
                       <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                       </svg>
                       <h3 className="text-xl font-semibold text-gray-600 mb-2">{t("home.noCoursesFound")}</h3>
                       <p className="text-gray-500">{t("home.noCoursesFoundDesc")}</p>
                     </div>
                   </div>
                )}
              </div>
              
              <div className="flex justify-center mt-12">
                                 <Button
                   className="px-8 py-4 text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                   onClick={() => navigate("/courses")}
                 >
                   {t("home.viewAllCourses")}
                 </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <HomeSidebar onPostClick={handlePostClick} />
            </div>
          </div>
        </div>
      </section>

                    {/* Phần đánh giá và thống kê - Thiết kế mới cho đánh giá, cũ cho thống kê */}
       <section className="py-20 px-4 lg:px-8 bg-white">
         <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Carousel đánh giá (chiếm 2/3) - Thiết kế mới */}
             <div className="lg:col-span-2">
               <Carousel autoplay autoplaySpeed={5000} dots={{ className: "custom-dots" }} className="w-full">
                 {studentReviews.map((review, idx) => (
                   <div key={idx} className="px-4">
                     <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:scale-[1.02]">
                       {/* Header với avatar và rating */}
                       <div className="flex items-start justify-between mb-6">
                         <div className="flex items-center space-x-4">
                           <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                             {review.name.charAt(0)}
                           </div>
                           <div>
                             <h4 className="font-semibold text-gray-900 text-lg">
                               {review.name}
                             </h4>
                             <p className="text-sm text-gray-500">
                               Học viên {review.course}
                             </p>
                           </div>
                         </div>
                         <div className="flex items-center space-x-1">
                           {[...Array(5)].map((_, i) => (
                             <StarFilled
                               key={i}
                               className={`text-lg ${
                                 i < review.stars
                                   ? "text-yellow-400"
                                   : "text-gray-300"
                               }`}
                             />
                           ))}
                         </div>
                       </div>

                       {/* Nội dung đánh giá */}
                       <div className="relative">
                         <svg className="absolute top-0 left-0 w-8 h-8 text-blue-100 transform -translate-x-2 -translate-y-2" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                         </svg>
                         <blockquote className="text-lg text-gray-700 leading-relaxed pl-8 italic">
                           "{review.content}"
                         </blockquote>
                       </div>

                       {/* Footer với thời gian */}
                       <div className="mt-6 pt-6 border-t border-gray-100">
                         <div className="flex items-center justify-between text-sm text-gray-500">
                           <span>Đánh giá vào {new Date().toLocaleDateString('vi-VN')}</span>
                           <div className="flex items-center space-x-2">
                             <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                             <span>Đã hoàn thành khóa học</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </Carousel>
             </div>

             {/* Thống kê số liệu (chiếm 1/3) - Layout cũ gọn gàng */}
             <div className="lg:col-span-1">
               <div className="grid grid-cols-2 gap-6 h-full">
                 {stats.map((stat, idx) => (
                   <div
                     key={idx}
                     className="bg-white rounded-xl shadow-lg border border-yellow-100 px-6 py-8 flex flex-col items-center justify-center w-full h-full"
                   >
                     <div className="text-2xl font-bold text-yellow-500 mb-1">
                       {stat.value}
                     </div>
                     <div className="text-base text-gray-700 font-medium text-center">
                       {stat.label}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>
      <Footer />
    </div>
  );
}

export default StudentHomePage;
