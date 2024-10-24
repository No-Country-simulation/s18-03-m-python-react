import { HeaderContainer } from "@/components/molecules"
import { PersonnelVacationCardList } from "@/components/molecules/PersonnelVacationCardList/PersonnelVacationCardList"



function Vacation() {
  return (
    <div>
      <HeaderContainer titlePage="Vacaciones y licencias" />
      <PersonnelVacationCardList  />
      
    </div>
  )
}

export default Vacation
