import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "@/hooks/use-toast";
import BlogForm from "./blog-form";
import { 
  addNewBlogService, 
  updateBlogByIdService, 
  deleteBlogByIdService 
} from "@/services";

function InstructorBlog({ listOfBlogs, onBlogUpdate }) {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const { setCurrentEditedBlogId } = useContext(InstructorContext);

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        const response = await deleteBlogByIdService(blogId);
        if (response?.success) {
          toast({
            title: "Xóa bài viết thành công!",
            description: "Bài viết đã được xóa khỏi hệ thống.",
            status: "success",
          });
          if (onBlogUpdate) onBlogUpdate();
        } else {
          toast({
            title: "Xóa bài viết thất bại!",
            description: response?.message || "Vui lòng thử lại.",
            status: "error",
          });
        }
      } catch (error) {
        toast({
          title: "Xóa bài viết thất bại!",
          description: "Đã xảy ra lỗi khi xóa bài viết.",
          status: "error",
        });
      }
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setCurrentEditedBlogId(blog._id);
    setShowAddForm(true);
  };

  const handleAddNewBlog = () => {
    setEditingBlog(null);
    setCurrentEditedBlogId(null);
    setShowAddForm(true);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    setEditingBlog(null);
  };

  const handleFormSubmit = async (blogData) => {
    try {
      let response;
      if (editingBlog) {
        response = await updateBlogByIdService(editingBlog._id, blogData);
      } else {
        response = await addNewBlogService(blogData);
      }

      if (response?.success) {
        toast({
          title: editingBlog
            ? "Cập nhật bài viết thành công!"
            : "Thêm bài viết thành công!",
          description: editingBlog
            ? "Bài viết đã được cập nhật."
            : "Bài viết mới đã được thêm vào hệ thống.",
          status: "success",
        });
        setShowAddForm(false);
        setEditingBlog(null);
        if (onBlogUpdate) onBlogUpdate();
      } else {
        toast({
          title: editingBlog ? "Cập nhật bài viết thất bại!" : "Thêm bài viết thất bại!",
          description: response?.message || "Vui lòng thử lại.",
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: editingBlog ? "Cập nhật bài viết thất bại!" : "Thêm bài viết thất bại!",
        description: "Đã xảy ra lỗi khi lưu bài viết.",
        status: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-3xl font-extrabold">
            Quản lý bài viết
          </CardTitle>
          <Button onClick={handleAddNewBlog} className="p-6">
            <Plus className="mr-2 h-4 w-4" />
            Thêm bài viết mới
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Tác giả</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfBlogs && listOfBlogs.length > 0 ? (
                  listOfBlogs.map((blog) => (
                    <TableRow key={blog?._id}>
                      <TableCell className="font-medium">
                        <div className="max-w-xs truncate">{blog?.title}</div>
                      </TableCell>
                      <TableCell>{blog?.category}</TableCell>
                      <TableCell>{blog?.author}</TableCell>
                      <TableCell>
                        {new Date(blog?.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            blog?.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog?.status === "published"
                            ? "Đã xuất bản"
                            : "Bản nháp"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleEditBlog(blog)}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBlog(blog?._id)}
                        >
                          <Delete className="h-6 w-6" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      Chưa có bài viết nào. Hãy tạo bài viết đầu tiên!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Blog Form Modal */}
      {showAddForm && (
        <BlogForm
          blog={editingBlog}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

InstructorBlog.propTypes = {
  listOfBlogs: PropTypes.array,
  onBlogUpdate: PropTypes.func,
};

export default InstructorBlog;
