import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";
import { ThemeProvider } from "./components/ui/theme-provider";
import ProtectedRoute from "./components/auth/protected-route";
import Register from "./pages/Register";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        {/* Ruta protegida */}
        <Route element={<ProtectedRoute />}>
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

// Probar el registro y login, mandar el token al hacer fetch de folders y bookmarks por que son rutas protegidas
