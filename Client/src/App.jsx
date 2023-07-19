import { Link, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

export default function App() {
  return (
    <div className="mainwrapper bg-[#F0EEED] h-screen w-screen dark:bg-[#121212]">
      <main className="max-w-screen-2xl mx-auto py-4 ">
        <Navbar />
      </main>
    </div>
  );
}
