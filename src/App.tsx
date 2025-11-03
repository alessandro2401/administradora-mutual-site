import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Legislacao from "./pages/Legislacao";
import Seguradoras from "./pages/Seguradoras";
import Mutualismo from "./pages/Mutualismo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/legislacao" component={Legislacao} />
      <Route path="/seguradoras" component={Seguradoras} />
      <Route path="/mutualismo" component={Mutualismo} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

