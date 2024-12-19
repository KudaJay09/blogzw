import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "./themetoggle";

function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-4xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-3xl">
        Mike<span className="text-primary">Blog</span>
      </Link>

      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
