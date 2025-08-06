import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
} from "@/services";
import { BookOpen, Check, ChevronLeft, ChevronRight, Play, Link, ExternalLink } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        studentCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        toast({
          title: "Cập nhật tiến độ thành công!",
          description: "Bài giảng đã được đánh dấu là đã xem.",
          status: "success",
        });
        fetchCurrentCourseProgress();
      } else {
        toast({
          title: "Cập nhật tiến độ thất bại!",
          description: "Không thể cập nhật tiến độ bài giảng.",
          status: "error",
        });
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      studentCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      toast({
        title: "Reset tiến độ thành công!",
        description: "Tiến độ khóa học đã được reset về 0%.",
        status: "success",
      });
      setCurrentLecture(null);
      setShowConfetti(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress();
    } else {
      toast({
        title: "Reset tiến độ thất bại!",
        description: "Không thể reset tiến độ khóa học.",
        status: "error",
      });
    }
  }

  function handleLectureClick(lecture) {
    setCurrentLecture(lecture);
  }

  function handleOpenLink() {
    if (currentLecture?.linkUrl) {
      window.open(currentLecture.linkUrl, '_blank');
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }, [currentLecture]);

  useEffect(() => {
    if (showConfetti) setTimeout(() => setShowConfetti(false), 15000);
  }, [showConfetti]);

  console.log(currentLecture, "currentLecture");

  // Check if current lecture is a link type
  const isLinkLecture = currentLecture?.type === "link";

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-black"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Quay lại trang khóa học của tôi
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {studentCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex-1 ${
            isSideBarOpen ? "mr-[400px]" : ""
          } transition-all duration-300`}
        >
          {isLinkLecture ? (
            // Link Content Display
            <div className="h-[500px] bg-gray-100 flex items-center justify-center">
              <div className="text-center p-8">
                <Link className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4 text-black">
                  {currentLecture?.title}
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  Đây là bài giảng dạng link. Vui lòng click vào nút bên dưới để truy cập nội dung khóa học.
                </p>
                <Button 
                  onClick={handleOpenLink}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Truy cập khóa học
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  Link sẽ mở trong tab mới
                </p>
              </div>
            </div>
          ) : (
            // Video Content Display
            <VideoPlayer
              width="100%"
              height="500px"
              url={currentLecture?.videoUrl}
              onProgressUpdate={setCurrentLecture}
              progressData={currentLecture}
            />
          )}
          <div className="p-6 bg-white">
            <h2 className="text-2xl font-bold mb-2 text-black">
              {currentLecture?.title}
            </h2>
            {isLinkLecture && (
              <p className="text-gray-600 mb-4">
                <Link className="h-4 w-4 inline mr-2" />
                Bài giảng dạng link - Click nút "Truy cập khóa học" ở trên để xem nội dung
              </p>
            )}
          </div>
        </div>
        <div
          className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-white border-l border-gray-300 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-white w-full grid-cols-2 p-0 h-14 border-b border-gray-300">
              <TabsTrigger
                value="content"
                className="text-black rounded-none h-full"
              >
                Nội dung khóa học
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="text-black rounded-none h-full"
              >
                Tổng quan
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {studentCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => (
                      <div
                        className="flex items-center space-x-2 text-sm text-black font-bold cursor-pointer hover:bg-gray-100 p-2 rounded"
                        key={item._id}
                        onClick={() => handleLectureClick(item)}
                      >
                        {studentCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          item.type === "link" ? (
                            <Link className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )
                        )}
                        <span>{item?.title}</span>
                        {item.type === "link" && (
                          <span className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded">
                            Link
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-medium text-gray-500 tracking-tight flex items-center gap-2">
                    <BookOpen className="text-yellow-400" />
                    Về khóa học này
                  </h2>
                  <p className="text-gray-700">
                    {studentCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black">
              Bạn không thể xem trang này
            </DialogTitle>
            <DialogDescription className="text-black">
              Vui lòng mua khóa học để truy cập
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent showOverlay={false} className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-black">Chúc mừng!</DialogTitle>
            <DialogDescription className="flex flex-col gap-3 text-black">
              <Label className="text-black">Bạn đã hoàn thành khóa học</Label>
              <div className="flex flex-row gap-3">
                <Button onClick={() => navigate("/student-courses")}>
                  Trang khóa học của tôi
                </Button>
                <Button onClick={handleRewatchCourse}>Xem lại khóa học</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseProgressPage;
