import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="flex items-center justify-between px-4">
      <div className={"flex items-center"}>
        <a href={"/"}>
          <Image
            aria-hidden
            src="/images/logo.png"
            alt="HCI Design Lab Logo"
            width={100}
            height={100}
          />
        </a>
        <ul className="flex gap-4 ml-8">
          <li>
            <a href={"#"}>Home</a>
          </li>
          <li>
            <a href={"#"}>About</a>
          </li>
          <li>
            <a href={"#"}>Projects</a>
          </li>
          <li>
            <a href={"#"}>Contact</a>
          </li>
        </ul>
      </div>
      <div>
        <Button>Schedule Consultation</Button>
      </div>
    </div>
  );
}

export default Header;
