import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../provider/Provider";
import { FaTrash, FaEye } from "react-icons/fa"; // Added FaEye for the icon
import { Typewriter } from "react-simple-typewriter";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function GameWatchlist() {
  const { user } = useContext(authContext); // Get user from context
  const [data, setData] = useState([]); // State to store wishlists
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const email = user?.email; // Get user email

  useEffect(() => {
    if (email) {
      fetch("https://assignment-10-server-lime-iota.vercel.app/wishlists")
        .then((res) => res.json())
        .then((data) => {
          const filteredWishlists = data.filter(
            (wishlist) => wishlist.userEmail === email
          );
          setData(filteredWishlists);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((err) => {
          setError("Failed to load wishlists"); // Set error if something goes wrong
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
        fetch(`https://assignment-10-server-lime-iota.vercel.app/wishlists/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.deletedCount > 0) {
              const remaining = data.filter((item) => item._id !== id);
              setData(remaining);
              Swal.fire("Deleted!", "Your wishlist item has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete the item.", "error");
            }
          })
          .catch((err) => {
            console.error("Failed to delete:", err);
            Swal.fire("Error!", "An error occurred while deleting the item.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-12">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center font-bold text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Typewriter Header */}
      <h1 className="text-center font-bold text-3xl my-8">
        <Typewriter
          words={[
            "Manage Your Games",
            "Track Favorites",
            "Stay Organized!",
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      <h1 className="text-center font-semibold text-3xl my-12">Game Watchlists</h1>

      {/* Table View Section */}
      <h1 className="font-semibold text-center text-3xl my-7">Watchlist Data in Table Format</h1>

      <div className="w-full overflow-x-auto mx-auto px-7 mb-12">
        <table className="table table-auto w-full min-w-max">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Rating</th>
              <th className="px-4 py-2 text-left">Genre</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Table Rows */}
            {data.map((wishlistItem, index) => (
              <tr key={wishlistItem._id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{wishlistItem.title}</td>
                <td className="px-4 py-2">{wishlistItem.rating}</td>
                <td className="px-4 py-2">{wishlistItem.genre}</td>
                <td className="px-4 py-2 flex items-center gap-4">
                  {/* Changed the Details button */}
                  <Link
                    to={`/details/${wishlistItem.gameId}`}
                    className="btn btn-sm btn-primary flex items-center gap-2"
                  >
                    <FaEye /> {/* Eye icon */}
                  </Link>

                  <button
                    onClick={() => handleDelete(wishlistItem._id)}
                    className="btn btn-error btn-sm"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grid View Section (Card View) */}
      <h1 className="font-semibold text-center text-3xl mt-[200px] mb-5">Watchlist Data in Card Format</h1>

      <div className="grid justify-items-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {data.map((wishlistItem) => (
          <div key={wishlistItem._id} className="p-4 border rounded-lg shadow-md">
            <h3 className="font-semibold text-xl">{wishlistItem.title}</h3>
            <img
              src={wishlistItem.coverImage}
              alt={wishlistItem.title}
              className="w-full h-48 object-cover mt-2 rounded-lg"
            />
            <p className="mt-2">Rating: {wishlistItem.rating}/10</p>
            <p className="text-gray-500">Genre: {wishlistItem.genre}</p>
            <div className="flex justify-end gap-3 mt-4 items-center">
              <Link
                to={`/details/${wishlistItem.gameId}`}
                className="btn btn-primary btn-sm flex items-center gap-2"
              >
                <FaEye />
              </Link>
              <button
                onClick={() => handleDelete(wishlistItem._id)}
                className="btn btn-error btn-sm"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback if no wishlist items */}
      {data.length <= 0 && (
        <p className="text-center text-xl text-red-600">No games in your wishlist.</p>
      )}
    </div>
  );
}
