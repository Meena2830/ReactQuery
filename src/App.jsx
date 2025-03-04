import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserList from "./Components/UserList";
import UserForm from "./Components/UserForm";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>User Management</h1>
        <UserForm />
        <UserList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
