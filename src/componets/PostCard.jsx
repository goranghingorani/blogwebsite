import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import "../App.css";

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="postcard w-full bg-gray-100 rounded-xl p-4 duration-300 hover:scale-110">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getfilepreview(featuredimage)}
            alt={title}
            className="postcardimg rounded-xl h-44 w-56"
          />
        </div>
        <div className="truncate">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
