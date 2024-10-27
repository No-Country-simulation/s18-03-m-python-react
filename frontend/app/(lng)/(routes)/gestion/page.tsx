import { HeaderContainer } from "@/components/molecules";
import PlatformGestion from "@/components/organisms/PlatformGestion/PlatformGestion";

export default function GestionPlatformPage() {
  return (
    <div className="container mb-10 px-0">
      <HeaderContainer titlePage="Gestion Plataforma" />
      <PlatformGestion />
    </div>
  )
}
