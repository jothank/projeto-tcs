import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { AppRoutes } from "./routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider authType="localstorage" authName="_auth">
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
