import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';

export default function UserList() {
  const { users, deleteUser, setEditUser } = useUserContext();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (  
    <div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">State</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.age}</td>
              <td className="border p-2">{user.gender}</td>
              <td className="border p-2">{user.state}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditUser(user)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmId(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmId && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <button
              onClick={() => {
                deleteUser(confirmId);
                setConfirmId(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmId(null)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}