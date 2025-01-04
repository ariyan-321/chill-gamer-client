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
            timer: 1500
          });
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Add Your Game Review</h1>
        <p className="text-gray-600 text-sm text-center mb-8">
          Share your thoughts and experiences with the game. Your review helps others make informed decisions!
        </p>
        <form onSubmit={handleAddReview} className="grid grid-cols-2 gap-4">
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Game Cover Image/Thumbnail (URL)</span>
            </label>
            <input
              name="coverImage"
              type="text"
              placeholder="Enter cover image URL"
              className="input input-bordered"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Game Title/Name</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter game title"
              className="input input-bordered"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Review Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Write a detailed review"
              className="textarea textarea-bordered"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Rating (1-10)</span>
            </label>
            <input
              name="rating"
              type="number"
              placeholder="Enter rating (1-10)"
              className="input input-bordered"
              min="1"
              max="10"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Publishing Year</span>
            </label>
            <input
              name="publishingYear"
              type="number"
              placeholder="Enter publishing year (e.g., 2024)"
              className="input input-bordered"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">Genres</span>
            </label>
            <select
              name="genre"
              className="select select-bordered"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="" disabled>
                Select genre
              </option>
              <option value="Action">Action</option>
              <option value="RPG">RPG</option>
              <option value="Adventure">Adventure</option>
              <option value="Strategy">Strategy</option>
              <option value="Simulation">Simulation</option>
            </select>
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text">User Display Name</span>
            </label>
            <input
              name="displayName"
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="form-control col-span-2">
            <button className="btn btn-primary w-full">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
}
