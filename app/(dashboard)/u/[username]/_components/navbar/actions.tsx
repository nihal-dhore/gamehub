import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { ProfileMenu } from "@/components/ProfileMenu";

export const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        className="text-muted-foreground hover:text-primary"
        size={"sm"}
        variant={"ghost"}
        asChild
      >
        <Link href={"/"}>
          <LogOut className="h-5 w-5 mr-2" />
          Exit
        </Link>
      </Button>
      <ProfileMenu />
    </div>
  );
};
