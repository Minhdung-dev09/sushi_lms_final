import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, User, Clock, Star, DollarSign } from "lucide-react";

function CourseGrid({ courses, loadingState, onCourseClick }) {
  if (loadingState) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="font-bold text-2xl text-gray-600 mb-2">
          Không tìm thấy khóa học nào
        </h2>
        <p className="text-gray-500">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((courseItem) => (
        <Card
          key={courseItem?._id}
          className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          onClick={() => onCourseClick(courseItem?._id)}
        >
          <div className="relative">
            <img
              src={courseItem?.image}
              alt={courseItem?.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {courseItem?.level?.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              {courseItem?.title}
            </h3>

            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{courseItem?.instructorName}</span>
            </div>

            <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                <span>{courseItem?.curriculum?.length} bài giảng</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>2h 30m</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-gray-500">(120)</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-bold text-xl text-primary">
                  {courseItem?.pricing}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CourseGrid;
