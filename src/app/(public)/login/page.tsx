import { Suspense } from "react";
import LoginForm from "./_components/LoginForm";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default Page;
