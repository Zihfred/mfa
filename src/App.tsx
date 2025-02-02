import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Instance from "@/components/instance";
import Register from "@/components/register";
import {useState} from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      {/*<Route path="/:id" component={Instance} />*/}
      <Route component={NotFound} />
    </Switch>
  );
}
interface Props {
    state?: string,
    setState?: (value:string) => void,
    text?: string
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
