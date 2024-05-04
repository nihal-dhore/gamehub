import { Logo } from "@/components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col space-y-6 justify-center items-center">
    <Logo />
    {children}
    </div>
  )
}