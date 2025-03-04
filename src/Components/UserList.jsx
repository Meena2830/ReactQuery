import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
};

const deleteUser = async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  return id;
};

const UserList = () => {
  const queryClient = useQueryClient();
  const { data: users, error, isLoading } = useQuery({
    queryKey: ["users"], 
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: deleteUser, 
    onSuccess: (id) => {
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers.filter((user) => user.id !== id)
      );
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users!</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => mutation.mutate(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
