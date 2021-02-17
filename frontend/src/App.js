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
import Products from "./pages/app/products";

const queryClient = new QueryClient();
const queryCache = new QueryCache();
function App() {
  return (
    <QueryClientProvider client={queryClient} queryCache={queryCache}>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/home' exact component={Dashboard} />
        <Route path='/users' exact component={Users} />
        <Route path='/products' exact component={Products} />
      </Switch>
      {/*  <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
