import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";

function CourseToolbar({ sort, setSort, filteredCoursesCount }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-white shadow-lg border-gray-200 hover:bg-gray-50 rounded-xl px-4 py-2"
            >
              <ArrowUpDownIcon className="h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-700">Sắp xếp theo</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] rounded-xl shadow-xl border-gray-200">
            <DropdownMenuRadioGroup
              value={sort}
              onValueChange={(value) => setSort(value)}
            >
              {sortOptions.map((sortItem) => (
                <DropdownMenuRadioItem 
                  value={sortItem.id} 
                  key={sortItem.id}
                  className="cursor-pointer hover:bg-gray-50 rounded-lg mx-1 my-1"
                >
                  {sortItem.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
          <span className="text-sm font-semibold text-blue-700">
            {filteredCoursesCount}
          </span>
          <span className="text-sm text-blue-600">
            khóa học
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseToolbar;
