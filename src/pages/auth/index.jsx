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
import { useTranslation } from "react-i18next";
import LanguageToggle from "@/components/ui/language-toggle";
import { GraduationCap } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const { t } = useTranslation();
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
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b bg-white shadow-sm z-20">
        <Link to={"/"} className="flex items-center justify-center">
        <div className="text-2xl flex items-center gap-2 font-bold mb-2 text-yellow-400">
            <img src="/logo.svg" alt="Sushi Learning" className="h-8 w-8" />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sushi Learning</span>
          </div>
        </Link>
        <LanguageToggle variant="icon" />
      </header>
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Tabs
              value={activeTab}
              defaultValue="signin"
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsContent value="signin">
                <Card className="p-8 space-y-6 bg-white shadow-xl border-0 rounded-2xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {t('auth.loginTitle')}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      {t('auth.email')} {t('common.and')} {t('auth.password')} {t('common.to')} {t('common.access')} {t('common.account')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CommonForm
                      formControls={signInFormControls}
                      buttonText={t('auth.loginButton')}
                      formData={signInFormData}
                      setFormData={setSignInFormData}
                      isButtonDisabled={!checkIfSignInFormIsValid()}
                      handleSubmit={handleLoginUser}
                    />
                    <div className="text-center pt-4">
                      <span className="text-gray-600">{t('auth.dontHaveAccount')} </span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        onClick={() => setActiveTab("signup")}
                      >
                        {t('auth.registerButton')}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card className="p-8 space-y-6 bg-white shadow-xl border-0 rounded-2xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {t('auth.registerTitle')}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      {t('common.enter')} {t('common.information')} {t('common.to')} {t('common.start')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CommonForm
                      formControls={signUpFormControls}
                      buttonText={t('auth.registerButton')}
                      formData={signUpFormData}
                      setFormData={setSignUpFormData}
                      isButtonDisabled={!checkIfSignUpFormIsValid()}
                      handleSubmit={handleRegisterUser}
                    />
                    <div className="text-center pt-4">
                      <span className="text-gray-600">{t('auth.alreadyHaveAccount')} </span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        onClick={() => setActiveTab("signin")}
                      >
                        {t('auth.loginButton')}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right side - Background Image */}
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 m-8 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/banners-img.jpg"
              alt="Learning background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative flex-1">
        {/* Full screen background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/banners-img.jpg"
            alt="Learning background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Form perfectly centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
          <div className="w-full max-w-sm">
            <Tabs
              value={activeTab}
              defaultValue="signin"
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsContent value="signin">
                <Card className="p-6 space-y-4 bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {t('auth.loginTitle')}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1 text-sm">
                      {t('auth.email')} {t('common.and')} {t('auth.password')} {t('common.to')} {t('common.access')} {t('common.account')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CommonForm
                      formControls={signInFormControls}
                      buttonText={t('auth.loginButton')}
                      formData={signInFormData}
                      setFormData={setSignInFormData}
                      isButtonDisabled={!checkIfSignInFormIsValid()}
                      handleSubmit={handleLoginUser}
                    />
                    <div className="text-center pt-2">
                      <span className="text-gray-600 text-sm">{t('auth.dontHaveAccount')} </span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                        onClick={() => setActiveTab("signup")}
                      >
                        {t('auth.registerButton')}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card className="p-6 space-y-4 bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-2xl">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {t('auth.registerTitle')}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-1 text-sm">
                      {t('common.enter')} {t('common.information')} {t('common.to')} {t('common.start')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CommonForm
                      formControls={signUpFormControls}
                      buttonText={t('auth.registerButton')}
                      formData={signUpFormData}
                      setFormData={setSignUpFormData}
                      isButtonDisabled={!checkIfSignUpFormIsValid()}
                      handleSubmit={handleRegisterUser}
                    />
                    <div className="text-center pt-2">
                      <span className="text-gray-600 text-sm">{t('auth.alreadyHaveAccount')} </span>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                        onClick={() => setActiveTab("signin")}
                      >
                        {t('auth.loginButton')}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
