import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Common from "./components/Common";

export default function App() {
  return (
    <div className="mainwrapper bg-[#F0EEED] h-screen w-screen dark:bg-[#121212]">
      <main className="max-w-screen-2xl mx-auto py-4 ">
        <Routes>
          <Route path="/" element={<Common />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
