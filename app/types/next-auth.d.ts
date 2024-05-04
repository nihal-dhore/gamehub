import "next-auth"
import { Account } from "next-auth";
import { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      username: string | null;
      imageUrl: string | null; a
    }
  }
}

declare module "next-auth" {
  interface JWT {
    id: string | undefined;
    email: string;
  }
}