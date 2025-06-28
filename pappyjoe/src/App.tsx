// import React from 'react';
import { UserProvider } from './context/UserContext';
import UserList from './components/UserList';
import UserForm from './components/UserForm';


export default function App() {

  return (
    <UserProvider>
      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <UserForm />
        <UserList />
      </main>
   </UserProvider>
  );
}
