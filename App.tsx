import Navigation from "./Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import "./global.css";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
