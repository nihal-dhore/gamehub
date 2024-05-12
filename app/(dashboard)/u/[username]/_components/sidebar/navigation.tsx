"use client";

import { authOptions } from "@/app/api/auth/libs/auth";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { NavItem } from "./nav-item";

export const Navigation = () => {
  const { data } = useSession(authOptions);

  const pathname = usePathname();
  const routes = [
    {
      label: "Stream",
      href: `/u/${data?.user.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${data?.user.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${data?.user.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${data?.user.username}/community`,
      icon: Users,
    },
  ];

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
