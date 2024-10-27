import {
  HeaderContainer,
  PersonnelManagementCardList
} from '@/components/molecules';

interface Props { };

export const PersonnelManagementContainer = () => {
  return (
    <div className="container px-0">
      <HeaderContainer titlePage="Gestión Empleados" />
      <PersonnelManagementCardList />
    </div>
  )
}
