import Logo from "@components/Logo";
import NavLinks from "./NavLinks";

export default function DesktopHeader() {
  return (
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Logo />
      <NavLinks />
    </div>
  );
}
