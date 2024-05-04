import { authOptions } from "@/app/api/auth/libs/auth";
import { UpdateScreen } from "@/components/UpdateScreen";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Update() {
  const session: Session | null = await getServerSession(authOptions);
  //console.log(session);
  
  return (
    <>
      {session?.user && <UpdateScreen />}
      {!session?.user && redirect("/signin")}
    </>
  );
}
