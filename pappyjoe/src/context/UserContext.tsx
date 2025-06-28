import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  state: string;
}

interface UserContextProps {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  editUser: User | null;
  setEditUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);

  const addUser = (user: User) => setUsers([...users, user]);
  const updateUser = (updated: User) =>
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
  const deleteUser = (id: string) => setUsers(users.filter((u) => u.id !== id));

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, editUser, setEditUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used inside UserProvider');
  return context;
}