'use client'
import { useState, useMemo } from 'react';
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { UserCard } from '../UserCard/UserCard';
import { LogoIcon } from '@/components/icons';
import { Input } from '@/components/ui';


interface User {
  id: string;
  name: string;
  cargo: string;
  email: string;
  status: 'active' | 'inactive';
  imageSrc?: string;
  alt?: string;
}

const users: User[] = [
  { id: "1", name: 'Pepe 1 Argento', cargo:"Front-End" ,email: 'pepe1@org.com', status: 'active',imageSrc: "https://i.pravatar.cc/300", alt:"usuario 1" },
  { id: "2", name: 'Pepe 2 Argento', cargo:"Back-End",email: 'pepe2@org.com', status: 'inactive',imageSrc: "https://i.pravatar.cc/301", alt:"usuario 2" },
  { id: "3", name: 'Pepe 3 Argento', cargo:"Front-End",email: 'pepe3@org.com', status: 'active',imageSrc: "https://i.pravatar.cc/302", alt:"usuario 3" },
  { id: "4", name: 'Pepe 4 Argento', cargo:"Design",email: 'pepe4@org.com', status: 'active',imageSrc: "https://i.pravatar.cc/303", alt:"usuario 4" },
  { id: "5", name: 'Pepe 5 Argento', cargo:"QA",email: 'pepe5@org.com', status: 'active',imageSrc: "https://i.pravatar.cc/304", alt:"usuario 5" },
  { id: "6", name: 'Pepe 6 Argento', cargo:"UX-UI",email: 'pepe6@org.com', status: 'active',imageSrc: "https://i.pravatar.cc/305", alt:"usuario 6" },
];

const filterUsers = (users: User[], query: string) => {
  if (!query) return users;
  return users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => (
  <div className="relative w-full max-w-md">
    <Input
      type="text"
      placeholder="Buscar por Empleado o Email"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-4 pr-10 py-2 w-full h-12 border-2 border-black-800 focus:border-base-primary text-xl rounded-xl"
    />
    <MagnifyingGlassIcon className="absolute right-3 size-8 top-1/2 transform -translate-y-1/2 text-base-primary" />
  </div>
);

export const UserList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => filterUsers(users, searchQuery), [searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between px-5 items-center  space-x-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <LogoIcon />
      </div>
      <div className="bg-white p-4 rounded-lg">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              cargo={user.cargo}
              email={user.email}
              initialStatus={user.status}
              imageSrc={user.imageSrc}
              alt={user.alt}
            />
          ))
        ) : (
          <div className="text-2xl px-20 text-base-primary animate-blink">No hay empleados</div>
        )}
      </div>
    </div>
  );
};
