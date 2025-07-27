import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { GraduationCap } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
    setOnRegisterSuccess,
  } = useContext(AuthContext);

  // Set callback to switch to signin tab after successful registration
  useEffect(() => {
    setOnRegisterSuccess(() => () => setActiveTab("signin"));
  }, [setOnRegisterSuccess]);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  console.log(signInFormData);

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="/banners-img.jpg"
          alt="background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      </div>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white/30 backdrop-blur-lg z-10 shadow-md">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">Sushi Learning</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsContent value="signin">
            <Card className="p-10 space-y-4 bg-white/60 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-shadow border border-white/40 rounded-3xl">
              <CardHeader>
                <CardTitle>Đăng nhập vào tài khoản</CardTitle>
                <CardDescription>
                  Nhập email và mật khẩu để truy cập tài khoản
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Đăng nhập"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
                <div className="text-center mt-4">
                  <span>Chưa có tài khoản? </span>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline focus:outline-none"
                    onClick={() => setActiveTab("signup")}
                  >
                    Đăng ký
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-10 space-y-4 bg-white/60 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-shadow border border-white/40 rounded-3xl">
              <CardHeader>
                <CardTitle>Tạo tài khoản mới</CardTitle>
                <CardDescription>Nhập thông tin để bắt đầu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Đăng ký"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                />
                <div className="text-center mt-4">
                  <span>Đã có tài khoản? </span>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline focus:outline-none"
                    onClick={() => setActiveTab("signin")}
                  >
                    Đăng nhập
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
