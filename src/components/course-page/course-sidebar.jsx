import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter, X } from "lucide-react";
import { filterOptions } from "@/config";

function CourseSidebar({
  showSidebar,
  setShowSidebar,
  search,
  setSearch,
  filters,
  setFilters,
  totalCourses,
  filteredCoursesCount,
}) {
  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  return (
    <div
      className={`w-full lg:w-80 flex-shrink-0 order-1 lg:order-2 ${
        showSidebar ? "block" : "hidden lg:block"
      } ${
        showSidebar
          ? "fixed right-0 top-0 h-full bg-white z-50 lg:relative lg:bg-transparent"
          : ""
      }`}
    >
      <div
        className={`lg:sticky lg:top-4 space-y-6 ${
          showSidebar ? "p-4 overflow-y-auto h-full" : ""
        }`}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Bộ lọc khóa học</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(false)}
            className="p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Tìm kiếm */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Tìm kiếm khóa học
          </h3>
          <Input
            placeholder="Nhập tên khóa học hoặc giảng viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </Card>

        {/* Bộ lọc */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </h3>
          <div className="space-y-4">
            {Object.keys(filterOptions).map((ketItem) => (
              <div className="border-b pb-4 last:border-b-0" key={ketItem}>
                <h4 className="font-medium mb-3 text-sm text-gray-700">
                  {ketItem.toUpperCase()}
                </h4>
                <div className="space-y-2">
                  {filterOptions[ketItem].map((option) => (
                    <Label
                      className="flex font-medium items-center gap-3 text-sm cursor-pointer hover:text-primary transition-colors"
                      key={option.id}
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[ketItem] &&
                          filters[ketItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(ketItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Thống kê */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Thống kê</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tổng khóa học:</span>
              <span className="font-semibold">{totalCourses}</span>
            </div>
            <div className="flex justify-between">
              <span>Đang hiển thị:</span>
              <span className="font-semibold">{filteredCoursesCount}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CourseSidebar;
