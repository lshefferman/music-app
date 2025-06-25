import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlaylistPage from "./pages/PlaylistPage";
import DisplayPlaylistsPage from "./pages/DisplayPlaylistsPage";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

function App() {
  return (
    <div>
      <div
        className="min-h-screen bg-base-200 transition-colors duration-300"
        data-theme="pastel"
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/playlist" element={<DisplayPlaylistsPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
        </Routes>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
