import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Post from "../components/Post";
import { UserContext } from "../context/UserContext";

const BASE_URL = "http://localhost:8000/posts";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { profile } = useContext(UserContext);
  const { keyword } = useParams();

  console.log("post", profile);
  // keyword;

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const keyword = searchParams.get("keyword");

  useEffect(() => {
    const getPosts = async (keyword = " ") => {
      console.log("keyword", keyword);
      const response = await axios({
        method: "get",
        url: `${BASE_URL}?keyword=${keyword}`,
        withCredentials: true,
      });
      console.log(response);
      const data = response.data;
      console.log(data);

      console.log(data);
      setTotalPosts(data.total);
      setPosts(data.data);
      // setQuery(" ");

      // if (!posts) {
      //   setPosts(data.data);
      // } else {
      //   setPosts([...posts, ...data.data]);
      // }
    };
    getPosts(keyword);
  }, [currentPage, keyword]);

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
        <div className="no-data text-2xl font-bold grid justify-center items-center min-h-[300px]">
          <h1 className="dark:text-white">No Posts found !</h1>
        </div>
      </>
    );

  return (
    <>
      <div className="blog-wrapper max-w-screen-2xl mx-auto grid md:grid-cols-4 gap-10 mb-16 mt-16">
        {posts.map((post, index) => (
          <Post {...post} key={index} />
        ))}
      </div>
      {posts?.length < totalPosts ? (
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
