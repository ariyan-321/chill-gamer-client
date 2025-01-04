import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import SingleReview from "./SingleReview";
import { Fade, Zoom } from "react-awesome-reveal"; // Import the animation components

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const[datas,setDatas]=useState([])
  useEffect(()=>{
    fetch("/ratings.json")
    .then(res=> res.json())
    .then(data=> setDatas(data))
  },[])


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

  useEffect(() => {
    if (isDarkTheme) {
      document.body.style.backgroundColor = "#1a1a1a";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
  }, [isDarkTheme]);

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleDone = () => {
    console.log("Typing completed!");
  };

  return (
    <div>
      {/* Typewriter Header with Fade animation */}
      <Fade duration={1500} triggerOnce>
        <h1 className="text-center font-semibold text-3xl my-12">
          Life is simple{' '}
          <span>
            <Typewriter
              words={['Eat', 'Sleep', 'Code', 'Repeat!']}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={handleDone}
            />
          </span>
        </h1>
      </Fade>

      {/* Theme Toggle with Fade animation */}
      <Fade duration={1500} triggerOnce>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-xl m-7">Change the Theme</h2>
          <div>
            <label className="flex cursor-pointer gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                className="toggle theme-controller"
                checked={isDarkTheme}
                onChange={handleThemeToggle}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
        </div>
      </Fade>

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
            <div className="cards grid justify-items-center gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, i) => (
                <SingleReview key={i} review={card}></SingleReview>
              ))}
              {cards.length === 0 && (
                <p className="font-semibold text-center text-3xl my-12 text-red-500">
                  No data available
                </p>
              )}
            </div>
          )}
        </div>

         

      </Zoom>
      <div className="our-partners">
            <h1 className="font-semibold text-center text-3xl my-12">Out Partners</h1>
            <div className="images flex flex-wrap gap-5 justify-center items-center cursor-pointer">
              <img className="w-[100px] rounded-full" src="https://cdn.logojoy.com/wp-content/uploads/20200512145801/rockstar-games-logo.png" alt="" />
              <img className="w-[100px] rounded-full" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112347/884.png" alt="" />
              <img className="w-[100px] rounded-full" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112450/954.png" alt="" />
              <img className="w-[100px] rounded-full" src="https://cdn.logojoy.com/wp-content/uploads/20200512145945/valve-gaming-logo.png" alt="" />
              <img className="w-[100px] rounded-full" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112356/4105.png" alt="" />
              <img className="w-[100px] rounded-full" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01112444/885.png" alt="" />
              <img className="w-[100px] rounded-full" src="https://cdn.logojoy.com/wp-content/uploads/20200512150144/playstation-gaming-logo.png" alt="" />

            </div>
          </div>

          <div>
            <h1 className="text-center font-semibold text-3xl mt-[100px] mb-12">Our clients</h1>
            <div className=' w-[90%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center mt-[100px] gap-7'>

{
    datas.map(data=> <div>

<div className="card card-compact   shadow-xl">
<figure>
<img className='h-[400px] object-cover'
src={data.image}
alt="Shoes" />
</figure>
<div className="card-body font-bold">
<h1 className='text-3xl'> {data.clientName}</h1>
<div className="stars ">
<i className="fa-solid fa-star text-yellow-400"></i>
<i className="fa-solid fa-star text-yellow-400"></i>
<i className="fa-solid fa-star text-yellow-400"></i>
<i className="fa-solid fa-star text-yellow-400"></i>
<i className="fa-solid fa-star text-yellow-400"></i>
</div>
       <p>{data.review}</p>
       <p>{data.date}</p>

</div>
</div>

    </div>)
}

</div>
          </div>
    </div>
  );
}
