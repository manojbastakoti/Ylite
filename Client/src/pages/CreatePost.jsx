import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const CreatePost = () => {
  const { profile, setProfile } = useContext(UserContext);
  console.log(profile);
  return <div>CreatePost</div>;
};

export default CreatePost;
