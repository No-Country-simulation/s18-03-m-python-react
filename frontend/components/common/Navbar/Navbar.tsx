import NavbarDesktop from "./NavbarDesktop/NavbarDesktop"
import NavbarMobile from "./NavbarMobile/NavbarMobile"


export default function Navbar() {
  return (
    <nav>
        <div className="hidden mx-auto md:block">
            <NavbarDesktop />
        </div>
        <div className="block mx-auto md:hidden">
            <NavbarMobile />	
        </div>
    </nav>
  )
}

