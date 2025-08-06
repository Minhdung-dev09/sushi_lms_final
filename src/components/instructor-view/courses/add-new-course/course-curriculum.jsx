import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import {
  mediaBulkUploadService,
  mediaDeleteService,
  mediaUploadService,
} from "@/services";
import { Upload, Link, Video } from "lucide-react";
import { useContext, useRef } from "react";
import { toast } from "@/hooks/use-toast";

function CourseCurriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const bulkUploadInputRef = useRef(null);

  function handleNewLecture() {
    const newLecture = {
      title: "",
      videoUrl: "",
      linkUrl: "",
      type: "video",
      freePreview: false,
      public_id: "",
    };
    
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      newLecture,
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleContentTypeChange(value, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const currentItem = cpyCourseCurriculumFormData[currentIndex];
    
    cpyCourseCurriculumFormData[currentIndex] = {
      ...currentItem,
      type: value,
      // Clear the other type's data when switching
      videoUrl: value === "video" ? currentItem.videoUrl : "",
      public_id: value === "video" ? currentItem.public_id : "",
      linkUrl: value === "link" ? currentItem.linkUrl : "",
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleLinkUrlChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      linkUrl: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          toast({
            title: "Upload video thành công!",
            description: "Video đã được tải lên thành công.",
            status: "success",
          });
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        toast({
          title: "Upload video thất bại!",
          description: "Có lỗi xảy ra khi tải video lên.",
          status: "error",
        });
        console.log(error);
      }
    }
  }

  async function handleReplaceVideo(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex] &&
      cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );

    if (deleteCurrentMediaResponse?.success) {
      toast({
        title: "Xóa video thành công!",
        description: "Video cũ đã được xóa.",
        status: "success",
      });
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };

      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    } else {
      toast({
        title: "Xóa video thất bại!",
        description: "Không thể xóa video cũ.",
        status: "error",
      });
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      if (!item || typeof item !== "object" || item.title.trim() === "") {
        return false;
      }
      
      if (item.type === "video") {
        return item.videoUrl.trim() !== "";
      } else if (item.type === "link") {
        return item.linkUrl.trim() !== "";
      }
      
      return false;
    });
  }

  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }

  function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value === "";
      });
    });
  }

  async function handleMediaBulkUpload(event) {
    const selectedFiles = Array.from(event.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));

    try {
      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(
        bulkFormData,
        setMediaUploadProgressPercentage
      );

      console.log(response, "bulk");
      if (response?.success) {
        let cpyCourseCurriculumFormdata =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
            ? []
            : [...courseCurriculumFormData];

        cpyCourseCurriculumFormdata = [
          ...cpyCourseCurriculumFormdata,
          ...response?.data.map((item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${
              cpyCourseCurriculumFormdata.length + (index + 1)
            }`,
            freePreview: false,
            type: "video",
            linkUrl: "",
          })),
        ];
        setCourseCurriculumFormData(cpyCourseCurriculumFormdata);
        setMediaUploadProgress(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteLecture(currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentSelectedVideoPublicId =
      cpyCourseCurriculumFormData[currentIndex] &&
      cpyCourseCurriculumFormData[currentIndex].public_id;

    if (getCurrentSelectedVideoPublicId) {
      const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);
      if (!response?.success) {
        toast({
          title: "Lỗi!",
          description: "Không thể xóa video từ server.",
          status: "error",
        });
        return;
      }
    }

    cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
      (_, index) => index !== currentIndex
    );

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
        <CardTitle className="text-lg sm:text-xl">Tạo nội dung khóa học</CardTitle>
        <div>
          <Input
            type="file"
            ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            onChange={handleMediaBulkUpload}
          />
          <Button
            as="label"
            htmlFor="bulk-media-upload"
            variant="outline"
            className="cursor-pointer w-full sm:w-auto"
            onClick={handleOpenBulkUploadDialog}
          >
            <Upload className="w-4 h-5 mr-2" />
            <span className="hidden sm:inline">Tải lên nhiều video</span>
            <span className="sm:hidden">Tải nhiều</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
          className="w-full sm:w-auto"
        >
          Thêm bài giảng
        </Button>
        {mediaUploadProgress ? (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        ) : null}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div
              className="border p-3 sm:p-5 rounded-md"
              key={curriculumItem.public_id || index}
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start sm:items-center">
                <h3 className="font-semibold text-sm sm:text-base">Bài giảng {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Nhập tiêu đề bài giảng"
                  className="w-full sm:max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`} className="text-xs sm:text-sm">
                    Xem thử miễn phí
                  </Label>
                </div>
              </div>
              
              {/* Content Type Selector */}
              <div className="mt-4">
                <Label className="text-sm font-medium mb-2 block">Loại nội dung:</Label>
                <Select
                  value={courseCurriculumFormData[index]?.type || "video"}
                  onValueChange={(value) => handleContentTypeChange(value, index)}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">
                      <div className="flex items-center">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </div>
                    </SelectItem>
                    <SelectItem value="link">
                      <div className="flex items-center">
                        <Link className="w-4 h-4 mr-2" />
                        Link
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 sm:mt-6">
                {courseCurriculumFormData[index]?.type === "video" ? (
                  // Video Content
                  courseCurriculumFormData[index]?.videoUrl ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-auto">
                        <VideoPlayer
                          url={courseCurriculumFormData[index]?.videoUrl}
                          width="100%"
                          height="200px"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={() => handleReplaceVideo(index)} className="w-full sm:w-auto">
                          Thay video khác
                        </Button>
                        <Button
                          onClick={() => handleDeleteLecture(index)}
                          className="bg-red-900 w-full sm:w-auto"
                        >
                          Xóa bài giảng
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(event) =>
                        handleSingleLectureUpload(event, index)
                      }
                      className="mb-4"
                    />
                  )
                ) : (
                  // Link Content
                  <div className="space-y-3">
                    <Input
                      type="url"
                      placeholder="Nhập link khóa học (VD: https://youtube.com/watch?v=...)"
                      value={courseCurriculumFormData[index]?.linkUrl || ""}
                      onChange={(event) => handleLinkUrlChange(event, index)}
                      className="w-full"
                    />
                    {courseCurriculumFormData[index]?.linkUrl && (
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => window.open(courseCurriculumFormData[index]?.linkUrl, '_blank')}
                          variant="outline"
                          className="w-full sm:w-auto"
                        >
                          <Link className="w-4 h-4 mr-2" />
                          Kiểm tra link
                        </Button>
                        <Button
                          onClick={() => handleDeleteLecture(index)}
                          className="bg-red-900 w-full sm:w-auto"
                        >
                          Xóa bài giảng
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
