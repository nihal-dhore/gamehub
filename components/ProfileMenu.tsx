"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/libs/auth";
import { useRouter } from "next/navigation";
import { UpdateScreen } from "./UpdateScreen";

export const ProfileMenu = () => {
  const session = useSession(authOptions);
  const router = useRouter();

  return (
    <div className="shrink-0 flex items-center justify-center">
      <DropdownMenu>
        {/* <div className="cursor-pointer absolute top-11 z-50 border rounded-lg w-[12%]">
      <ul className="text-center">
        <li
          onClick={() => {
            setUpdateScreen(true);
            setProfileMenu(false);
          }}
        >
          Update Profile
        </li>
      </ul>
    </div> */}
        <DropdownMenuTrigger>
          {session.data?.user && (
            <img
              className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-purple-400 p-[1px]"
              src={session.data.user.imageUrl!}
              alt="Pic"
            ></img>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push("/user/update")}>
            Update Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};