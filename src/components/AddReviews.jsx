import React, { useContext, useState } from "react";
import { authContext } from "../provider/Provider";
import Swal from "sweetalert2";

export default function AddReviews() {
  const { user } = useContext(authContext);

  // State for controlled inputs
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;

    const coverImage = form.coverImage.value;
    const title = form.title.value;
    const description = form.description.value;
    const rating = form.rating.value;
    const publishingYear = form.publishingYear.value;
    const email = form.email.value;
    const displayName = form.displayName.value;

    const newReview = {
      coverImage,
      title,
      description,
      rating: parseFloat(rating),
      publishingYear: parseInt(publishingYear),
      genre: selectedGenre,
      email,
      displayName,
    };

    fetch("https://assignment-10-server-lime-iota.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Review added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="flex mt-24 justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 py-12">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Add Your Game Review
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Share your thoughts and experiences with the game. Your review helps others make informed decisions!
        </p>
        <form onSubmit={handleAddReview} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Game Cover Image/Thumbnail (URL)</span>
            </label>
            <input
              name="coverImage"
              type="text"
              placeholder="Enter cover image URL"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Game Title/Name</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter game title"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Review Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Write a detailed review"
              className="textarea textarea-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Rating (1-10)</span>
            </label>
            <input
              name="rating"
              type="number"
              placeholder="Enter rating (1-10)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="10"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Publishing Year</span>
            </label>
            <input
              name="publishingYear"
              type="number"
              placeholder="Enter publishing year (e.g., 2024)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Genres</span>
            </label>
            <select
              name="genre"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="" disabled>Select genre</option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Adventure">Adventure</option>
              <option value="Strategy">Strategy</option>
              <option value="Simulation">Simulation</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">User Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">User Display Name</span>
            </label>
            <input
              name="displayName"
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="form-control">
            <button className="btn btn-primary w-full py-3 text-white font-semibold rounded-md shadow-lg transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
