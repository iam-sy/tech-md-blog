import DefaultLayout from "@/components/layout/DefaultLayout";
import LoginClient from "@/app/login/client";

const LoginPage = (props: any) => {
  return (
    <DefaultLayout>
      <LoginClient />
    </DefaultLayout>
  );
};

export default LoginPage;
