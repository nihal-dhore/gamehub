"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const SigninButton = () => {
  const router = useRouter();
  return (
    <Button
      size={"sm"}
      variant={"primary"}
      onClick={() => {
        router.push("/signin");
      }}
    >
      Signin
    </Button>
  );
};
