import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addUser = async (newUser) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
  return response.data;
};

const UserForm = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: addUser, 
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (oldUsers) => [...oldUsers, newUser]);
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    mutation.mutate({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;
