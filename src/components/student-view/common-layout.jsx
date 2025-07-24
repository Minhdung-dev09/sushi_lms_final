import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";

function StudentViewCommonLayout() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      {!location.pathname.includes("course-progress") ? (
        <StudentViewCommonHeader />
      ) : null}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentViewCommonLayout;
