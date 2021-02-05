import { ReactQueryDevtools } from "react-query/devtools";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";

import logo from "./logo.svg";
import { Button } from "antd";
import "./App.css";
import { useState } from "react";

import Login from "./pages/auth/login";
import Dashboard from "./pages/app/dashboard";
import { Route, Switch } from "react-router-dom";
import Users from "./pages/app/users";

const queryClient = new QueryClient();
const queryCache = new QueryCache();
function App() {
  return (
    <QueryClientProvider client={queryClient} queryCache={queryCache}>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/home' exact component={Dashboard} />
        <Route path='/users' exact component={Users} />
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const toJSON = (_) => _.json();

const getArticles = async () => {
  const fetcher = await fetch("https://dev.to/api/articles").then(toJSON);
  return fetcher;
};

function Todos() {
  // Queries
  const { data, isLoading, error } = useQuery("articles", getArticles);

  if (isLoading) return "loading...";
  if (error) return error;
  return <>{data.map((d) => d.title)}</>;
}

export default App;
