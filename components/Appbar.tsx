"use client";
import { authOptions } from "@/app/api/auth/libs/auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProfileMenu } from "./ProfileMenu";
import { UpdateScreen } from "./UpdateScreen";

export const Appbar = () => {
  const [updateScreen, setUpdateScreen] = useState(false);
  const router = useRouter();
  const session = useSession(authOptions);
  return (
    <div className={`flex flex-col w-full ${updateScreen && "h-screen z-30"}`}>
      <div className="flex justify-evenly w-full">
        {!session.data?.user && (
          <button
            onClick={() => {
              router.push("/signin");
            }}
          >
            signin
          </button>
        )}
        {session.data?.user && (
          <button
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            signout
          </button>
        )}
        {/* <ProfileMenu setUpdateScreen={setUpdateScreen} /> */}
      </div>
      {/* {updateScreen && <UpdateScreen setUpdateScreen={setUpdateScreen} />} */}
    </div>
  );
};
