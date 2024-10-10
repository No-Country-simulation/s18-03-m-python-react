import {
  UserDropdown,
  UserList,
  UserTimer
} from '@/components/views';

interface Props { };

export const PersonnelManagementContainer = () => {
  return (
    <div className="container">
      <div className="flex flex-row items-center justify-between bg-white shadow p-4 px-20 border-2 border-b-8 border-x-base-primary-200">
        <h1 className="text-4xl font-bold text-gray-800">Gestión de Personal</h1>
        <span className="flex items-center shadow rounded-lg bg-white px-5">
        <UserTimer />
        <UserDropdown />
        </span>
      </div>
      <div className="flex-col justify-between items-center p-4 bg-white shadow">
        <UserList />
      </div>
    </div>
  )
}
