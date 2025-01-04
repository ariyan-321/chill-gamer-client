import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainHome from '../components/MainHome';
import Home from '../components/Home';
import AllReviews from '../components/AllReviews';
import AddReviews from '../components/AddReviews';
import MyReviews from '../components/MyReviews';
import GameWatchlist from '../components/GameWatchlist';
import ErrorPage from '../Pages/ErrorPage';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';
import ReviewDetails from '../components/ReviewDetails';
import UpdateReview from '../components/UpdateReview';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainHome></MainHome>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/allReviews",
            element:<AllReviews></AllReviews>
        },
        {
            path:'/addReviews',
            element:<PrivateRoute><AddReviews></AddReviews></PrivateRoute>
        }
        ,{
            path:"/myReviews",
            element:<PrivateRoute><MyReviews></MyReviews></PrivateRoute>
        },
        {
          path:"/details/:id",
          element:<ReviewDetails></ReviewDetails>,
          loader:({params})=> fetch(`https://assignment-10-server-lime-iota.vercel.app/reviews/${params.id}`)
        },
        {
          path:"updateReview/:id",
          element:<UpdateReview></UpdateReview>,
          loader:({params})=> fetch(`https://assignment-10-server-lime-iota.vercel.app/reviews/${params.id}`)
        },

        {
            path:"/gameWatchlist",
            element:<PrivateRoute><GameWatchlist></GameWatchlist></PrivateRoute>,
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        }
      ]
    },
    
  ]);



export default router ;

