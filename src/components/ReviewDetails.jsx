import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { authContext } from "../provider/Provider";
import { FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";
export default function ReviewDetails() {
  const data = useLoaderData(); // Review data
  const{user}=useContext(authContext)

  

  const handleWishlist=()=>{

    const wishlistData = {
      gameId: data?._id,
      userEmail: user?.email,
      title: data?.title,
      coverImage: data?.coverImage,
      genre: data?.genre,
      rating: data?.rating,
      publishingYear: data?.publishingYear,
    };

      fetch("https://assignment-10-server-lime-iota.vercel.app/wishlists",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(wishlistData)
      })
      .then(res=> res.json())
      .then(data=>{
        if(data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Seccessfully added to wishlist",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Game Cover Image */}
          <img
            src={data?.coverImage}
            alt={data?.title}
            className="w-full md:w-1/3 rounded-lg "
          />

          {/* Game Details */}
          <div className="w-full">
            <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-600 mb-4">{data.description}</p>
            <div className="mb-4">
              <span className="font-semibold">Genre:</span> {data.genre}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Rating:</span> {data.rating}/10
            </div>
            <div className="mb-4">
              <span className="font-semibold">Publishing Year:</span>{" "}
              {data.publishingYear}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Reviewer Name:</span>{" "}
              {data?.displayName || "Anonymous"}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Reviewer Email:</span> {data?.email}
            </div>
            {
                user?.email && 
                <button onClick={ handleWishlist} className="btn">add to Watchlist<FaRegHeart /></button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
