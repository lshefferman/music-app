import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlaylistPage from "./pages/PlaylistPage";
import DisplayPlaylistsPage from "./pages/DisplayPlaylistsPage";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import { useUserStore } from "./store/useUserStore";

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <div
        className="min-h-screen bg-base-200 transition-colors duration-300"
        data-theme="pastel"
      >
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginForm /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupForm /> : <Navigate to="/" />}
          />
          <Route path="/playlist" element={<DisplayPlaylistsPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
        </Routes>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
