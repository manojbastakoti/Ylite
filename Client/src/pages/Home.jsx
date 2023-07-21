import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import { UserContext } from "../context/UserContext";

const BASE_URL = "http://localhost:8000/posts";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { profile } = useContext(UserContext);
  console.log("post", profile);
  useEffect(() => {
    const getPosts = async () => {
      const response = await axios({
        method: "get",
        url: BASE_URL,
        withCredentials: true,
      });
      console.log(response);
      const data = response.data;
      console.log(data);

      console.log(data);
      setTotalPosts(data.total);

      if (!posts) {
        setPosts(data.data);
      } else {
        setPosts([...posts, ...data.data]);
      }
    };
    getPosts();
  }, [currentPage]);

  if (!posts) {
    return (
      <div className="loading grid justify-center items-center min-h-[300px]">
        <img src="./assets/loading.gif" className="h-[100px] " alt="spinner" />
      </div>
    );
  }

  if (posts.length <= 0)
    return (
      <>
        <div className="create-button max-w-screen-2xl mx-auto mt-5 mb-2 flex justify-end">
          {profile && (
            <Link
              to="/create-post"
              className="bg-blue-500  hover:bg-blue-600 p-3 rounded-md text-lg dark:text-white"
            >
              Create Post
            </Link>
          )}
        </div>
        <div className="no-data text-2xl font-bold grid justify-center items-center min-h-[300px]">
          <h1 className="dark:text-white">No Posts found !</h1>
        </div>
      </>
    );

  return (
    <>
      <div className="create-button max-w-screen-2xl mx-auto mt-5 mb-2 flex justify-end">
        {profile && (
          <Link
            to="/create-blog"
            className="bg-blue-500  hover:bg-blue-600 p-3 rounded-md text-lg dark:text-white"
          >
            Create Blog
          </Link>
        )}
      </div>
      <div className="blog-wrapper max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
        {posts.map((post, index) => (
          <Post {...post} key={index} />
        ))}
      </div>
      {posts?.length >= totalPosts ? (
        ""
      ) : (
        <div className="see-more flex justify-center items-center pt-2 pb-3 mb-14">
          <div className="cursor-pointer flex flex-col justify-center items-center ">
            <h1
              className="text-md font-semibold"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              See More
            </h1>
            <i className="fa-solid fa-angles-down"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
