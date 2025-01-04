import React from 'react'
import { Link } from 'react-router-dom'

export default function SingleReview({review}) {
  return (
    <div>
        <div >

<div className="card card-compact  w-[90%] mx-auto shadow-xl my-7">
  <figure>
    <img className='w-[400px] h-[400px] object-cover'
      src={review.coverImage}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{review.title}</h2>
    <p>{review.description}</p>
    <p className='font-bold'>Rating:{review.rating}</p>
    <p className='font-semibold'>Genre:{review.genre}</p>
    <p className='font-semibold'>Published on:{review.publishingYear}</p>
    <p className='font-semibold'>Reviewer:{review.displayName}</p>
    <div className="card-actions justify-end">
      <Link to={`/details/${review._id}`} className="btn btn-success">Explore details</Link>
    </div>
  </div>
</div>


          </div>
    </div>
  )
}
