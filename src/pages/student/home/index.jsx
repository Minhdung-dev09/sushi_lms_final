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
import { images, handleImageError } from "@/lib/images";

function StudentHomePage() {
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

  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg:px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-4">
            &quot;Học Tập Hiệu Quả – Phát Triển Bứt Phá&quot;
          </h1>
          <p className="text-xl">
            Kỹ năng cho hiện tại và tương lai của bạn. Bắt đầu ngay với chúng
            tôi
          </p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
          <img
            src={images.banner.jpg}
            width={500}
            height={300}
            className="w-full h-auto rounded-lg shadow-lg"
            onError={(e) => handleImageError(e, "#f3f4f6")}
          />
        </div>
      </section>
      {/* Bỏ section danh mục khóa học */}
      {/* <section className="py-8 px-4 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Danh mục khóa học</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section> */}
      <section className="py-12 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content - Khóa học nổi bật */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Khóa học nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                studentViewCoursesList.map((courseItem) => (
                  <div
                    key={courseItem?._id}
                    onClick={() => handleCourseNavigate(courseItem?._id)}
                    className="border rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 bg-white"
                  >
                    <img
                      src={courseItem?.image}
                      width={400}
                      height={200}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 truncate">
                        {courseItem?.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-2 truncate">
                        {courseItem?.instructorName}
                      </p>
                      <p className="font-bold text-xl text-primary">
                        {courseItem?.pricing * 23000} VNĐ
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-2xl font-bold">
                  Không tìm thấy khóa học nào
                </h2>
              )}
            </div>
            <div className="flex justify-center mt-10">
              <Button
                className="px-8 py-3 text-lg font-semibold rounded-full shadow-md"
                onClick={() => navigate("/courses")}
              >
                Xem tất cả khóa học
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <HomeSidebar onPostClick={handlePostClick} />
        </div>
      </section>
      {/* Carousel đánh giá học viên + Thông số nổi bật - layout đơn giản, đều nhau, không tiêu đề */}
      <section className="py-12 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-5 gap-14 items-stretch">
          {/* Carousel bên trái (chiếm 3/5) */}
          <div className="flex flex-col justify-center h-full md:col-span-3">
            <Carousel autoplay autoplaySpeed={2000} dots className="w-full">
              {studentReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center h-full"
                >
                  <div className="bg-gradient-to-br from-yellow-100 to-white rounded-2xl shadow-xl p-10 flex flex-col items-start min-h-[220px] h-full w-full border border-yellow-200 justify-center">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarFilled
                          key={i}
                          className={`mr-1 text-xl ${
                            i < review.stars
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-base font-medium mb-2 text-left text-gray-800">
                      &quot;{review.content}&quot;
                    </div>
                    <div className="text-sm text-gray-700 mb-1 font-semibold">
                      - {review.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Khóa học: {review.course}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          {/* Thông số nổi bật bên phải (chiếm 2/5) */}
          <div className="flex flex-col justify-center h-full md:col-span-2">
            <div className="grid grid-cols-2 gap-8 w-full h-full">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg border border-yellow-100 px-6 py-8 flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="text-2xl font-bold text-yellow-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-base text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default StudentHomePage;
