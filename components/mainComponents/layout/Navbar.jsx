import { Logo } from "@/public/assets/assets";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavButton from "./NavButton";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <div className="border-b p-4 lg:p-0">
      <div className="max-w-7xl mx-auto my-2 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/">
              <Image src={Logo} alt="Logo Image" width={150} height={150} />
            </Link>

            {/* Search Bar */}
            <div className="hidden  md:flex items-center border rounded-md overflow-hidden w-full max-w-xl shadow-sm">
              {/* Search input with icon */}
              <div className="flex items-center px-3 gap-2 w-full border-r">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search events"
                  className="outline-none w-full py-2 text-sm bg-transparent"
                />
              </div>

              {/* Search Button */}
              <button className="bg-red-500 hover:bg-red-600 p-3">
                <Search className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <NavButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
