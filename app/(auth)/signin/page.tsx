"use client";
import { Button } from "@/components/ui/button";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

function onClickSignin() {
  signIn("google", {
    callbackUrl: "/",
    redirect: true,
  });
}

export default function signin() {
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      className="cursor-pointer text-base bg-transparent py-6 px-10 select-none hover:opacity-90 transition hover:transition"
      onClick={onClickSignin}
    >
      <img className="mr-2" title="Google Icon" src="/google.svg" />
      Continue with Google
    </Button>
  );
  {
    /* <div>
      <div className="bg-gray-200 rounded-full">
        <Image src={"/spooky.svg"} alt="Gamehub" width={80} height={80} />
      </div>
    </div> */
  }
}
