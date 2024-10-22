import { HeaderContainer } from "@/components/molecules";
import PlatformGestion from "@/components/organisms/PlatformGestion/PlatformGestion";

export default function GestionPlatformPage() {
  return (
    <div className="container mb-10 ">
      <HeaderContainer titlePage="Gestion de la Plataforma" />
      <PlatformGestion />
    </div>
  )
}
