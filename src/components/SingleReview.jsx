import React from "react";
import { Link } from "react-router-dom";

export default function SingleReview({ review }) {
  return (
    <div>
      <div>
        <div className="card card-compact w-[70%] mx-auto shadow-md my-5 h-[400px]">
          <figure>
            <img
              className="w-[200px] h-[200px] object-cover mx-auto mt-2"
              src={review.coverImage}
              alt={review.title}
            />
          </figure>
          <div className="card-body p-2">
            <h2 className="text-lg font-semibold">{review.title}</h2>
            {/* Truncated description */}
            <p className="text-sm  line-clamp-1">
              {review.description}
            </p>
            <p className="text-sm font-medium">
              Rating: {review.rating}
            </p>
            <p className="text-sm font-medium ">{review.genre}</p>
            <div className="card-actions justify-end">
              <Link
                to={`/details/${review._id}`}
                className="btn btn-sm bg-gradient-to-r  from-purple-600 via-blue to-blue-600 text-white"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
