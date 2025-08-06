import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Play, User, Clock, Star, DollarSign, Eye } from "lucide-react";

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
          className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
          onClick={() => onCourseClick(courseItem?._id)}
        >
          {/* Image Container với tối ưu hóa */}
          <div className="relative overflow-hidden aspect-video">
            <img
              src={courseItem?.image}
              alt={courseItem?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.src = '/bg2.jpeg'; // Fallback image
                e.target.onerror = null;
              }}
            />
            {/* Overlay gradient khi hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
                         <div className="absolute top-3 right-3">
               <Badge variant="secondary" className="bg-white/90 text-gray-800">
                 {courseItem?.level?.toUpperCase()}
               </Badge>
             </div>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
                <Play className="w-6 h-6 text-blue-600 fill-current" />
              </div>
            </div>
          </div>

                     {/* Content */}
           <div className="p-4">
             <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
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
                 <span className="font-bold text-xl text-primary">
                   {courseItem?.pricing * 23000} VNĐ
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
