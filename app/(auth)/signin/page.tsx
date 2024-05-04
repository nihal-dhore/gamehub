"use client";
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
    <div
      className="cursor-pointer border py-3 px-6 rounded-lg flex items-center"
      onClick={onClickSignin}
    >
      <img className="mr-2" title="Google Icon" src="/google.svg" />
      Continue with Google
    </div>
  );
  {
    /* <div>
      <div className="bg-gray-200 rounded-full">
        <Image src={"/spooky.svg"} alt="Gamehub" width={80} height={80} />
      </div>
    </div> */
  }
}
