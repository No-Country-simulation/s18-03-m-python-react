import {
  HeaderContainer,
  PersonnelManagementCardList
} from '@/components/views';

interface Props { };

export const PersonnelManagementContainer = () => {
  return (
    <div className="container">
      <HeaderContainer titlePage="Gestión de Empleados" />
      <PersonnelManagementCardList />
    </div>
  )
}
