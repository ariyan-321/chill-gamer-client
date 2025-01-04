import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="text-center p-8 bg-opacity-80 bg-black rounded-lg shadow-xl">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">Oops! Page Not Found</p>
        <p className="mb-8">
          Sorry, the page you're looking for doesn't exist. You can always go back to the homepage.
        </p>
        <Link to={"/"}>
        <button
          
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
        >
          Go Back to Home
        </button>
        </Link>
      </div>
    </div>
    </div>
  )
}
