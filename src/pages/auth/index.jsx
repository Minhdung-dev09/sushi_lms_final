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
      <div className="absolute inset-0 w-full h-full -z-10">
        <img
          src="/banners-img.jpg"
          alt="background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      </div>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b bg-white/30 backdrop-blur-lg z-10 shadow-md">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">Sushi Learning</span>
        </Link>
        <LanguageToggle variant="icon" />
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
                <CardTitle>{t('auth.loginTitle')}</CardTitle>
                <CardDescription>
                  {t('auth.email')} {t('common.and')} {t('auth.password')} {t('common.to')} {t('common.access')} {t('common.account')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={t('auth.loginButton')}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
                <div className="text-center mt-4">
                  <span>{t('auth.dontHaveAccount')} </span>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline focus:outline-none"
                    onClick={() => setActiveTab("signup")}
                  >
                    {t('auth.registerButton')}
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-10 space-y-4 bg-white/60 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-shadow border border-white/40 rounded-3xl">
              <CardHeader>
                <CardTitle>{t('auth.registerTitle')}</CardTitle>
                <CardDescription>{t('common.enter')} {t('common.information')} {t('common.to')} {t('common.start')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={t('auth.registerButton')}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                />
                <div className="text-center mt-4">
                  <span>{t('auth.alreadyHaveAccount')} </span>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline focus:outline-none"
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
  );
}

export default AuthPage;
