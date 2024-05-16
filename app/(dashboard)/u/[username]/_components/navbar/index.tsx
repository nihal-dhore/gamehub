import { Logo } from "../../_components/navbar/logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav
      className="fixed top-0 w-full h-20 z-[48] bg-[#252731]  
    px-5 lg:px-4 flex justify-between items-center shadow-sm"
    >
      <Logo />
      <Actions />
    </nav>
  );
};
