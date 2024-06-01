import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>we couldn&apos;t find the page you were searching for.</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Go back Home</Link>
      </Button>
    </div>
  );
}
