import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateReview() {
  const review = useLoaderData(); // Fetch the review data

  const handleUpdateReview = (e) => {
    e.preventDefault();

    const coverImage = e.target.coverImage.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const rating = e.target.rating.value;
    const genre = e.target.genre.value;
    const publishingYear = e.target.publishingYear.value;
    const email = e.target.email.value;
    const name = e.target.name.value;

    const updatedReview = {
      coverImage,
      title,
      description,
      rating: parseFloat(rating),
      genre,
      publishingYear: parseInt(publishingYear),
      email,
      name,
    };


    fetch(`https://assignment-10-server-lime-iota.vercel.app/reviews/${review._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "successfully updated review",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-10">
        <Link to="/allReviews" className="btn mb-5">
          Go back to all reviews page
        </Link>
        <div className="bg-white p-8 shadow-xl rounded-lg">
          <h1 className="text-4xl font-bold mb-5 text-center">
            Update Game Review
          </h1>
          <p className="text-lg mb-10 text-center text-gray-600">
            Update your review to reflect your latest opinions and experiences.
            Your thoughts help others make informed decisions!
          </p>
          <form onSubmit={handleUpdateReview} className="grid gap-6 w-[80%] mx-auto">
            {/* Cover Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Game Cover Image (URL)</span>
              </label>
              <input
                defaultValue={review.coverImage}
                type="text"
                name="coverImage"
                placeholder="Enter cover image URL"
                className="input input-bordered"
                required
              />
            </div>

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Game Title</span>
              </label>
              <input
                defaultValue={review.title}
                type="text"
                name="title"
                placeholder="Enter game title"
                className="input input-bordered"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                defaultValue={review.description}
                name="description"
                placeholder="Write your review description"
                className="textarea textarea-bordered"
                required
              ></textarea>
            </div>

            {/* Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating (1-10)</span>
              </label>
              <input
                defaultValue={review.rating}
                type="number"
                name="rating"
                placeholder="Enter rating (1-10)"
                className="input input-bordered"
                min="1"
                max="10"
                required
              />
            </div>

            {/* Genre */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <input
                defaultValue={review.genre}
                type="text"
                name="genre"
                placeholder="Enter genre"
                className="input input-bordered"
                required
              />
            </div>

            {/* Publishing Year */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Publishing Year</span>
              </label>
              <input
                defaultValue={review.publishingYear}
                type="number"
                name="publishingYear"
                placeholder="Enter publishing year"
                className="input input-bordered"
                required
              />
            </div>

            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reviewer Name</span>
              </label>
              <input
                defaultValue={review.displayName}
                type="text"
                name="name"
                placeholder="Enter reviewer name"
                className="input input-bordered"
                readOnly
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reviewer Email</span>
              </label>
              <input
                defaultValue={review.email}
                type="email"
                name="email"
                placeholder="Enter reviewer email"
                className="input input-bordered"
                readOnly
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
