import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../provider/Provider";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";

export default function MyReviews() {
  const { user } = useContext(authContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = user?.email;

  useEffect(() => {
    if (email) {
      setLoading(true);
      fetch("https://assignment-10-server-lime-iota.vercel.app/reviews")
        .then((res) => res.json())
        .then((data) => {
          const filteredReviews = data.filter(
            (review) => review.email === email
          );
          setReviews(filteredReviews);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-server-lime-iota.vercel.app/reviews/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = reviews.filter((review) => review._id !== id);
              setReviews(remaining);
              Swal.fire("Deleted!", "Your review has been deleted.", "success");
            }
          })
          .catch((err) => console.error("Failed to delete:", err));
      }
    });
  };

  return (
    <div className="p-6 mt-24 w-[90%] mx-auto">
      {/* Typewriter Header */}
      <h1 className="text-center font-bold text-3xl lg:text-4xl my-8 ">
        <Typewriter
          words={[
            "Manage Your Reviews",
            "Track Ratings and Titles",
            "Stay on Top of Your Reviews",
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      {/* Show loader when data is being fetched */}
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg text-blue-500"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg bg-white">
            {/* Table Head */}
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left font-semibold">#</th>
                <th className="border px-4 py-2 text-left font-semibold">Title</th>
                <th className="border px-4 py-2 text-left font-semibold">Rating</th>
                <th className="border px-4 py-2 text-left font-semibold">Publish Year</th>
                <th className="border px-4 py-2 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Table Rows */}
              {reviews.map((review, i) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2">{review.title}</td>
                  <td className="border px-4 py-2">{review.rating}</td>
                  <td className="border px-4 py-2">{review.publishingYear}</td>
                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <Link
                      to={`/updateReview/${review._id}`}
                      className="btn btn-primary btn-sm text-white bg-blue-500 hover:bg-blue-700"
                    >
                      Update
                    </Link>
                    <Link
                      to={`/details/${review._id}`}
                      className="btn btn-info btn-sm text-white bg-teal-500 hover:bg-teal-700"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-error btn-sm text-white bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Fallback if no reviews */}
      {reviews.length <= 0 && !loading && (
        <p className="text-red-700 text-3xl text-center font-bold mt-5">
          No reviews available.
        </p>
      )}
    </div>
  );
}
