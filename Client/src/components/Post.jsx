import react from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:8000/";
const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

function Post({ id, title, description, creator, image, views, createdAt }) {
  return (
    <div className="post grid grid-row-2 mt-5  bg-white dark:bg-[#252525] shadow-md rounded-md">
      <div className="top-box mb-2">
        <img
          src={`${BASE_URL}${image}`}
          className="h-[300px] w-[100%] object-cover"
          alt="article"
        />
      </div>
      <div className="bottom-box pl-8 pr-8 mb-3">
        <div className="title">
          <h1 className="text-xl font-bold dark:text-white">
            {truncateText(title, 20)}
          </h1>
        </div>
        <div className="info">
          <p className="dark:text-[#ffffff]">{truncateText(description, 50)}</p>
        </div>
        <div className="date py-1 flex justify-between pr-2">
          <p className="italic text-slate-500">
            Posted:<span>{createdAt}</span>
          </p>
          <p className="text-green-700 font-semibold">
            <i className="fa-solid fa-eye"></i> <span>{views}</span>
          </p>
        </div>
        <div className="author flex justify-between pt-1">
          <p className="text-[#6C9BCF] font-semibold">
            Author:<span>{creator}</span>
          </p>
          <Link
            to={`/post/${id}`}
            className="text-[#FF6D60] font-semibold pr-2 underline"
          >
            See more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
