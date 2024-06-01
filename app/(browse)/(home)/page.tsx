import { authOptions } from "@/app/api/auth/libs/auth";
import { Appbar } from "@/components/Appbar";
import { UpdateScreen } from "@/components/UpdateScreen";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session: Session | null = await getServerSession(authOptions);

  //{session ?? redirect("/signin")}
  
  return <div>HomePage</div>;
}
