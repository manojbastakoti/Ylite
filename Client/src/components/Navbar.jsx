import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Nav max-w-screen-xl mx-auto bg-white shadow-md px-4 py-3 flex items-center justify-between rounded-md  dark:bg-[#252525] dark:border-1 dark:border-[#757677]">
      {/* <img className="h-[80px] mr-3" src="./assets/bookshelf.png"/> */}
      <div className="flex logo items-center gap-5  dark:text-white">
        <Link to="/">
          <img src="./assets/ylite_logo.png" className="w-24" />
        </Link>

        <div className="hidden lg:flex justify-center items-center gap-5">
          <Link to="/create-post">Create Post</Link>
        </div>
      </div>
      <div className="links hidden lg:flex justify-end gap-5 items-center  dark:text-white">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e) =>
                setText((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-orange-600 rounded-lg border border-blue-700 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <Link to="/login">Login</Link>
        {/* <div className="icons dark:text-white">
          {theme === "light" ? (
            <div className="icon cursor-pointer">
              <i className="fa-solid fa-moon"></i>
            </div>
          ) : (
            <div className="icon cursor-pointer">
              <i className="fa-solid fa-sun"></i>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
