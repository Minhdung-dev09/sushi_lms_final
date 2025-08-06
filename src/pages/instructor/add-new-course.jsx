import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
  updateCourseByIdService,
} from "@/services";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddNewCoursePage() {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    // Validate landing page form data
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        console.log(`Landing page validation failed for: ${key}`);
        return false;
      }
    }

    // Validate curriculum form data
    if (courseCurriculumFormData.length === 0) {
      console.log("Curriculum validation failed: No curriculum items");
      return false;
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      // Check title is not empty
      if (isEmpty(item.title)) {
        console.log("Curriculum validation failed: Empty title");
        return false;
      }

      // Check content based on type
      if (item.type === "video") {
        if (isEmpty(item.videoUrl) || isEmpty(item.public_id)) {
          console.log("Curriculum validation failed: Video content missing");
          return false;
        }
      } else if (item.type === "link") {
        if (isEmpty(item.linkUrl)) {
          console.log("Curriculum validation failed: Link URL missing");
          return false;
        }
      } else {
        console.log("Curriculum validation failed: Invalid content type");
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }

    if (!hasFreePreview) {
      console.log("Curriculum validation failed: No free preview found");
      return false;
    }

    return true;
  }

  async function handleCreateCourse() {
    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublised: true,
    };

    const response =
      currentEditedCourseId !== null
        ? await updateCourseByIdService(
            currentEditedCourseId,
            courseFinalFormData
          )
        : await addNewCourseService(courseFinalFormData);

    if (response?.success) {
      toast({
        title: currentEditedCourseId !== null ? t('notifications.courseUpdateSuccess') : t('notifications.courseCreateSuccess'),
        description: currentEditedCourseId !== null ? t('notifications.courseUpdateSuccessDesc') : t('notifications.courseCreateSuccessDesc'),
        status: "success",
      });
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
      setCurrentEditedCourseId(null);
    } else {
      toast({
        title: currentEditedCourseId !== null ? t('notifications.courseUpdateFailed') : t('notifications.courseCreateFailed'),
        description: response?.message || t('common.pleaseTryAgain'),
        status: "error",
      });
    }

    console.log(courseFinalFormData, "courseFinalFormData");
  }

  async function fetchCurrentCourseDetails() {
    const response = await fetchInstructorCourseDetailsService(
      currentEditedCourseId
    );

    if (response?.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];

        return acc;
      }, {});

      console.log(setCourseFormData, response?.data, "setCourseFormData");
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }

    console.log(response, "response");
  }

  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  // Ensure there's at least one curriculum item when creating new course
  useEffect(() => {
    if (currentEditedCourseId === null && courseCurriculumFormData.length === 0) {
      const initialLecture = {
        title: "",
        videoUrl: "",
        linkUrl: "",
        type: "video",
        freePreview: false,
        public_id: "",
      };
      setCourseCurriculumFormData([initialLecture]);
    }
  }, [currentEditedCourseId, courseCurriculumFormData.length]);

  console.log(params, currentEditedCourseId, "params");

  // Debug logging
  console.log("Course Landing Form Data:", courseLandingFormData);
  console.log("Course Curriculum Form Data:", courseCurriculumFormData);
  console.log("Validation Result:", validateFormData());
  
  // Additional debug info
  if (courseCurriculumFormData.length > 0) {
    courseCurriculumFormData.forEach((item, index) => {
      console.log(`Curriculum Item ${index}:`, {
        title: item.title,
        type: item.type,
        videoUrl: item.videoUrl,
        linkUrl: item.linkUrl,
        public_id: item.public_id,
        freePreview: item.freePreview
      });
    });
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <Button
          disabled={!validateFormData()}
          className="text-sm tracking-wider font-bold px-4 sm:px-8 w-full sm:w-auto"
          onClick={handleCreateCourse}
        >
          HOÀN TẤT
        </Button>
      </div>
      <Card>
        <CardContent className="p-2 sm:p-6">
          <div className="container mx-auto">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="curriculum" className="text-xs sm:text-sm">{t('course.curriculum')}</TabsTrigger>
                <TabsTrigger value="course-landing-page" className="text-xs sm:text-sm">
                  {t('course.landingPage')}
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs sm:text-sm">{t('common.settings')}</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCoursePage;
