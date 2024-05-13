//import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db";
import { Session, SessionStrategy, JWT } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt" as SessionStrategy
  },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.email = profile.email;
        token.id = account.access_token;
      }

      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      try {
        const user = await db.user.findUnique({
          where: {
            email: token.email
          }
        })
        if (user) {
          session.user.id = user.id;
          session.user.username = user.username;
          session.user.imageUrl = user.imageUrl;

        }
        //console.log(session);

        return session;
      } catch (error) {
        console.error(error);
      }

      //console.log(token, session);

    },
    async signIn({ account, profile }: any) {
      //console.log(profile, account);
      if (account.provider === "google") {
        try {
          const user = await db.user.findUnique({
            where: {
              email: profile.email
            }
          })

          if (!user) {
            //console.log(user);

            const newUser = await db.user.create({
              data: {
                email: profile.email!,
                imageUrl: profile.picture,
              }
            })
            //console.log(newUser);

          }

          return true;
        }
        catch (error) {
          console.log(error);
          return false;
        }
      }
    }
  }
}