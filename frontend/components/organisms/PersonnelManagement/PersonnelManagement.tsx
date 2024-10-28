import {
  HeaderContainer,
  PersonnelManagementCardList
} from '@/components/molecules';



export const PersonnelManagementContainer = () => {
  return (
    <div className="container px-0">
      <HeaderContainer titlePage="Gestión Empleados" />
      <PersonnelManagementCardList />
    </div>
  )
}
