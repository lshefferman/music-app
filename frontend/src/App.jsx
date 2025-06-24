import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PlaylistPage from "./pages/PlaylistPage";
import { useThemeStore } from "./store/useThemeStore";
import DisplayPlaylistsPage from "./pages/DisplayPlaylistsPage";

function App() {
  const { theme } = useThemeStore();

  return (
    <div>
      <div
        className="min-h-screen bg-base-200 transition-colors duration-300"
        data-theme={theme}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlist" element={<DisplayPlaylistsPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
        </Routes>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
