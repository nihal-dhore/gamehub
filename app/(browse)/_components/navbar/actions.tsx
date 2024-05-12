import { authOptions } from "@/app/api/auth/libs/auth";
import { Session, getServerSession } from "next-auth";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { SigninButton } from "../../../../components/SigninButton";
import { ProfileMenu } from "../../../../components/ProfileMenu";

export const Actions = async () => {
  const session: Session | null = await getServerSession(authOptions);
  //console.log(session);

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4">
      {!session?.user && <SigninButton />}
      {session?.user && (
        <div className="flex items-center gap-x-4">
          <Button
            size={"sm"}
            variant={"ghost"}
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${session.user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <ProfileMenu />
        </div>
      )}
    </div>
  );
};
