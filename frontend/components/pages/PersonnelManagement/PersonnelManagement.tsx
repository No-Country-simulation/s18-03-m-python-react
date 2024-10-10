import {
  UserDropdown,
  UserList,
  UserTimer
} from '@/components/views';

interface Props { };

export const PersonnelManagement = () => {
  return (
    <div className="container">
      <div className="flex flex-row justify-between items-center bg-white shadow p-4 px-20 border-b-4 border-x-base-primary-200">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Personal</h1>
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
