import {
  HeaderContainer,
  PersonnelManagementCardList
} from '@/components/molecules';



export const PersonnelManagementContainer = () => {
  return (
    <div className="container">
      <HeaderContainer titlePage="Gestión de Empleados" />
      <PersonnelManagementCardList />
    </div>
  )
}
