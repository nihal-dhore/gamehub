import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export function Logo() {
  return (
    <div className="flex items-center flex-col">
      <div
        className={cn(
          "bg-gray-200 rounded-full flex items-center justify-center mb-3",
          font.className
        )}
      >
        <Image src={"/spooky.svg"} alt="Gamehub" width={80} height={80} />
      </div>
      <p className="text-xl font-semibold">GameHub</p>
      <p className="text-sm text-muted-foreground">let&apos;s play</p>
    </div>
  );
}
