import React, { useEffect, useState } from "react";
import RegisterForm from "../../components/register/RegisterForm";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token;
  }, [router.query.token]);

  return (
    <main className="w-screen flex items-center justify-center mt-20 space-x-16">
      <RegisterForm />
    </main>
  );
}
