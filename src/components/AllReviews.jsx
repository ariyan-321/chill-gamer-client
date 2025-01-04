import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import SingleReview from "./SingleReview";
import { Fade, Zoom, Slide } from "react-awesome-reveal"; // Import animation components

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    fetch("https://assignment-10-server-lime-iota.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setFilteredReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const handleSort = (option) => {
    setSortOption(option);
    const sortedReviews = [...filteredReviews];
    if (option === "rating-asc") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    } else if (option === "rating-desc") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (option === "year-asc") {
      sortedReviews.sort((a, b) => a.publishingYear - b.publishingYear);
    } else if (option === "year-desc") {
      sortedReviews.sort((a, b) => b.publishingYear - a.publishingYear);
    }
    setFilteredReviews(sortedReviews);
  };

  const handleFilter = (genre) => {
    setGenreFilter(genre);
    if (genre === "") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.genre === genre);
      setFilteredReviews(filtered);
    }
  };

  const genres = [...new Set(reviews.map((review) => review.genre))];

  return (
    <div>
      {/* Typewriter Header with Fade animation */}
      <Fade duration={1500} triggerOnce>
        <h1 className="text-center font-bold text-3xl my-8">
          <Typewriter
            words={[
              "Explore Reviews",
              "Discover Genres",
              "Find Your Next Favorite Game!",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
      </Fade>

      {/* Sort and Filter Dropdowns with Slide animation */}
      <Slide direction="up" duration={1500} triggerOnce>
        <div className="flex justify-center gap-6 mb-6 m-5">
          {/* Sort Dropdown */}
          <select
            className="select select-bordered w-full max-w-xs"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="rating-desc">Rating (High to Low)</option>
            <option value="year-asc">Year (Oldest First)</option>
            <option value="year-desc">Year (Newest First)</option>
          </select>

          {/* Genre Filter Dropdown */}
          <select
            className="select select-bordered w-full max-w-xs"
            value={genreFilter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre, i) => (
              <option key={i} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </Slide>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid justify-items-center mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Reviews Section with Zoom animation */}
          {filteredReviews.map((review, i) => (
            <Zoom key={i} duration={1500} triggerOnce>
              <SingleReview review={review} />
            </Zoom>
          ))}
        </div>
      )}

      {/* Fallback if no reviews */}
      {filteredReviews.length <= 0 && !loading && (
        <p className="text-center font-bold text-red-500 text-3xl">
          No data available
        </p>
      )}
    </div>
  );
}
