import React from "react";

export default function AboutUs() {
  return (
    <div className="about-us mt-24 min-h-screen bg-gradient-to-b from-purple-600 via-black to-blue-600 text-white py-12 px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Get to know more about our mission, vision, and the team behind Chill Gamer.
        </p>
      </div>

      {/* Content Section */}
      <div className="content max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="image">
          <img
            src="/images/logo.png"
            alt="About Us"
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="text">
          <h2 className="text-3xl font-bold mb-4">
            Who We Are
          </h2>
          <p className="text-gray-200 leading-7">
            At Chill Gamer, we're a team of passionate gamers dedicated to providing honest, in-depth reviews and gaming content. Our goal is to help you make informed decisions about the best games out there.
          </p>
          <h3 className="text-2xl font-semibold mt-6">
            Our Mission
          </h3>
          <p className="text-gray-200 leading-7">
            To create a fun, informative platform where gamers can find honest reviews, exciting news, and in-depth content that enhances their gaming experience.
          </p>
          <h3 className="text-2xl font-semibold mt-6">
            Our Vision
          </h3>
          <p className="text-gray-200 leading-7">
            To be the leading online destination for gaming reviews and content, bringing together a community of gamers who share their passion for gaming.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="team mt-16">
        <h2 className="text-3xl text-center font-bold mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-member text-center bg-gradient-to-b from-purple-600 via-black to-blue-600 p-6 rounded-lg shadow-lg"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Example team data for Chill Gamer
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    "image": "https://nursinginstitutegoa.org/wp-content/uploads/2016/01/tutor-8.jpg",
  },
  {
    name: "Samantha Lee",
    role: "Lead Reviewer",
    "image": "https://cdn.prod.website-files.com/65fd680ade762e318dc27216/65fd680ade762e318dc277d6_Emily_photo.jpeg",
  },
  {
    name: "Chris Brown",
    role: "Content Creator",
    "image": "https://i.pinimg.com/736x/22/4e/50/224e505c57837f749c79d2c5b6c4dba5.jpg",
  },
  {
    name: "Jordan Taylor",
    role: "Community Manager",
    "image": "https://c8.alamy.com/comp/C6GEYT/michel-brown-14th-annual-people-en-espanol-50-most-beautiful-issue-C6GEYT.jpg",
  },
];
