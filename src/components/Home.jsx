import React, { useState, useEffect, useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import SingleReview from "./SingleReview";
import { Fade, Zoom } from "react-awesome-reveal"; // Import the animation components
import "daisyui/dist/full.css"; // Make sure DaisyUI is included in your project
import axios from "axios"; // Import axios
import { authContext } from "../provider/Provider";
import toast from "react-hot-toast";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(authContext);



  const faqs = [
    {
      question: "How can I sign up for an account?",
      answer:
        "Click on the 'Sign Up' button at the top-right corner and fill in your details.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, PayPal, and bank transfers.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription through your account settings.",
    },
  ];

  const [datas, setDatas] = useState([]);
  useEffect(() => {
    fetch("/ratings.json")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  useEffect(() => {
    fetch("https://assignment-10-server-lime-iota.vercel.app/reviews/top")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const defaultMessage = "Thank you for subscribing to our newsletter!";
    
    const formData = {
      to:email,
      subject:defaultMessage, // Ensure user data is correctly passed
      text: defaultMessage,
    };

    try {
      const res = await axios.post("https://mainsender2.vercel.app/send-mail", formData);

      if (res.status === 200) {
        toast.success("Thanks for subscribing to our newsletter!");
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-28 grid justify-items-center">
      {/* Banner Section using DaisyUI Carousel */}
      <div className="carousel w-[70%] mx-auto mb-12">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="/images/banner-1.webp"
            className="w-full h-[400px] object-cover"
            alt="Banner 1"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="/images/banner-2.webp"
            className="w-full h-[400px] object-cover"
            alt="Banner 2"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="/images/banner-3.webp"
            className="w-full h-[400px] object-cover"
            alt="Banner 3"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="/images/banner-1.webp"
            className="w-full h-[400px] object-cover"
            alt="Banner 4"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      {/* Highest Rated Games Section with Zoom animation */}
      <Zoom duration={1500} triggerOnce>
        <div className="highest-rated-games">
          <h2 className="font-semibold text-3xl text-center my-12">
            Highest Rated Games
          </h2>
          {loading ? (
            <div className="flex justify-center items-center my-12">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <div className="cards grid justify-items-center gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {cards.map((card, i) => (
                <SingleReview key={i} review={card}></SingleReview>
              ))}
              {cards.length === 0 && (
                <p className="font-semibold text-center text-3xl my-12 text-red-500">
                  No reviews available
                </p>
              )}
            </div>
          )}
        </div>
      </Zoom>

      {/* Partners Section */}
      <div className="our-partners">
        <h1 className="font-semibold text-center text-3xl my-12">
          Our Partners
        </h1>
        <div className="images flex flex-wrap gap-5 justify-center items-center cursor-pointer">
          <img
            className="w-[100px] rounded-full"
            src="https://cdn.logojoy.com/wp-content/uploads/20200512145801/rockstar-games-logo.png"
            alt=""
          />
          <img
            className="w-[100px] rounded-full"
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112347/884.png"
            alt=""
          />
          <img
            className="w-[100px] rounded-full"
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112450/954.png"
            alt=""
          />
          <img
            className="w-[100px] rounded-full"
            src="https://cdn.logojoy.com/wp-content/uploads/20200512145945/valve-gaming-logo.png"
            alt=""
          />
          <img
            className="w-[100px] rounded-full"
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112356/4105.png"
            alt=""
          />
          <img
            className="w-[100px] rounded-full"
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112444/885.png"
            alt=""
          />
          <img
            className="w-[100px] rounded-full"
            src="https://cdn.logojoy.com/wp-content/uploads/20200512150144/playstation-gaming-logo.png"
            alt=""
          />
        </div>
      </div>

      {/* Clients Section */}
      <div>
        <h1 className="text-center font-semibold text-3xl mt-[50px] mb-10">
          Our Clients
        </h1>
        <div className="w-[90%] md:w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-24">
          {datas.map((data) => (
            <div key={data.clientName}>
              <div className="card card-compact shadow-lg border-none rounded-md hover:shadow-xl transition duration-300">
                <figure className="overflow-hidden">
                  <img
                    className="h-[200px] w-full object-cover"
                    src={data.image}
                    alt="Client"
                  />
                </figure>
                <div className="card-body p-4">
                  <h1 className="text-lg font-bold ">
                    {data.clientName}
                  </h1>
                  <div className="stars flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className="fa-solid fa-star text-yellow-400 text-sm"
                      ></i>
                    ))}
                  </div>
                  <p className="text-sm   line-clamp-2">
                    {data.review}
                  </p>
                  <p className="text-xs">{data.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     

      {/* FAQ Section */}
      <div className="faq mt-20 w-full">
        <h1 className="font-semibold text-center text-3xl my-12">
          Frequently Asked Questions
        </h1>
        <div className="w-[90%]  mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              tabIndex={index}
              className="collapse collapse-arrow border border-gray-200 rounded-md mb-4"
            >
              <div className="collapse-title font-medium text-lg">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter mt-24 bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 text-white  py-12  w-[90%] rounded-xl mx-auto">
        <h2 className="text-3xl text-center mb-6">
          Subscribe to our Newsletter
        </h2>
        <p className="text-center mb-8">
          Get the latest game reviews, updates, and more delivered to your
          inbox.
        </p>
        <div className="flex justify-center">
          <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-[100%] px-4 py-2 text-black"
              required
            />
            <button type="submit" className="btn btn-primary px-6 py-2">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
