import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export async function fetchStudentViewCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);

  return data;
}

export async function fetchStudentViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(
    `/student/course/get/details/${courseId}`
  );

  return data;
}

export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(
    `/student/course/purchase-info/${courseId}/${studentId}`
  );

  return data;
}

export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);

  return data;
}

export async function captureAndFinalizePaymentService(
  paymentId,
  payerId,
  orderId
) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });

  return data;
}

export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/courses-bought/get/${studentId}`
  );

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    }
  );

  return data;
}

export async function deleteCourseByIdService(id) {
  const { data } = await axiosInstance.delete(
    `/instructor/course/delete/${id}`
  );
  return data;
}

// Blog management services
export async function fetchInstructorBlogListService() {
  const { data } = await axiosInstance.get(`/instructor/blog/get`);
  return data;
}

export async function addNewBlogService(formData) {
  const { data } = await axiosInstance.post(`/instructor/blog/add`, formData);
  return data;
}

export async function fetchInstructorBlogDetailsService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/blog/get/details/${id}`
  );
  return data;
}

export async function updateBlogByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/blog/update/${id}`,
    formData
  );
  return data;
}

export async function deleteBlogByIdService(id) {
  const { data } = await axiosInstance.delete(`/instructor/blog/delete/${id}`);
  return data;
}

// Public blog services for students
export async function fetchPublicBlogListService(query) {
  const { data } = await axiosInstance.get(`/student/blog/get?${query}`);
  return data;
}

export async function fetchPublicBlogDetailsService(blogId) {
  const { data } = await axiosInstance.get(
    `/student/blog/get/details/${blogId}`
  );
  return data;
}

export async function fetchBlogsByCategoryService(category) {
  const { data } = await axiosInstance.get(
    `/student/blog/category/${category}`
  );
  return data;
}

export async function fetchBlogsByTagService(tag) {
  const { data } = await axiosInstance.get(`/student/blog/tag/${tag}`);
  return data;
}

export async function fetchPopularBlogsService() {
  const { data } = await axiosInstance.get(`/student/blog/popular`);
  return data;
}

export async function fetchRecentBlogsService() {
  const { data } = await axiosInstance.get(`/student/blog/recent`);
  return data;
}

export async function searchBlogsService(searchTerm) {
  const { data } = await axiosInstance.get(
    `/student/blog/search?q=${searchTerm}`
  );
  return data;
}

// Free course enrollment service
export async function enrollFreeCourseService(formData) {
  const { data } = await axiosInstance.post(`/student/course/enroll-free`, formData);
  return data;
}
