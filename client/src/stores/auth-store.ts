import { create } from "zustand";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthData {
  name?: string;
  email: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  login: (data: AuthData) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  register: (data: AuthData) => Promise<void>;
  logout: () => Promise<void>;
  deleteUser: () => Promise<void>;
}

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create<AuthStore>((set) => {
  // const navigate = useNavigate();

  const checkAuth = async () => {
    set({ loading: true });
    try {
      const res = await axios.get<User>(`${BACKEND_URL}/api/protected`, {
        withCredentials: true,
      });
      set({
        user: {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
        },
      });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  };

  const login = async (data: AuthData) => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/login`, data, {
        withCredentials: true,
      });
      await checkAuth();
      // navigate("/board");
    } catch (error: unknown) {
      let errMsg = "Error al eliminar la carpeta";

      if (isAxiosError(error)) {
        errMsg = error.response?.data?.message || error.message || errMsg;
      } else if (error instanceof Error) {
        errMsg = error.message || errMsg;
      } else if (typeof error === "string") {
        errMsg = error;
      }

      toast.error(errMsg);
    }
  };

  const loginAsGuest = async () => {
    const response = await fetch(`${BACKEND_URL}/api/auth/loginGuest`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();

    if (response.ok) {
      set({ user: data.user });
      checkAuth();
      toast.info(
        "Log in as a guest. This account will be deleted in 1 hour.",
        {}
      );
      // navigate("/board");

      setTimeout(async () => {
        await fetch(`${BACKEND_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        set({ user: null });
        toast.error("Guest account expired. Please log in again.", {});
        // navigate("/");
      }, 60 * 60 * 1000);
    }
  };

  const register = async (data: AuthData) => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, data, {
        withCredentials: true,
      });
      await checkAuth();
      // navigate("/board");
    } catch (error: unknown) {
      let errMsg = "Error al eliminar la carpeta";

      if (isAxiosError(error)) {
        errMsg = error.response?.data?.message || error.message || errMsg;
      } else if (error instanceof Error) {
        errMsg = error.message || errMsg;
      } else if (typeof error === "string") {
        errMsg = error;
      }

      toast.error(errMsg);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      set({ user: null });
      // navigate("/");
    } catch {
      toast.error("Error al cerrar sesión");
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/auth/delete`, {
        withCredentials: true,
      });
      set({ user: null });
      toast.success("Cuenta eliminada exitosamente");
      // navigate("/register");
    } catch (error: unknown) {
      let errMsg = "Error al eliminar la carpeta";

      if (isAxiosError(error)) {
        errMsg = error.response?.data?.message || error.message || errMsg;
      } else if (error instanceof Error) {
        errMsg = error.message || errMsg;
      } else if (typeof error === "string") {
        errMsg = error;
      }

      toast.error(errMsg);
    }
  };

  return {
    user: null,
    loading: true,
    checkAuth,
    login,
    loginAsGuest,
    register,
    logout,
    deleteUser,
  };
});
