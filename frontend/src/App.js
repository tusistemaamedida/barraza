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
import Deposit from "./pages/app/deposit";
import Orders from "./pages/app/orders";
import Preparations from "./pages/app/preparations";
import Scanner from "./pages/app/preparations/scanner";
import Armed from "./pages/app/orders/armed";

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
        <Route path='/deposit' exact component={Deposit} />
        <Route path='/orders' exact component={Orders} />
        <Route path='/preparations' exact component={Preparations} />
        <Route path='/preparations/scanner/:id' exact component={Scanner} />
        <Route path='/orders/armed/:id' exact component={Armed} />
      </Switch>
      {/*  <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
