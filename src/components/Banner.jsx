import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images from src/assets
import banner1 from "../assets/banner_1.jpg";
import banner2 from "../assets/banner_2.jpg";
import banner3 from "../assets/banner_3.jpg";
// import product-category from "./
// CategorySection"

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const eventSlides = [
    {
      id: 1,
      title: "",
      description: "",
      image: banner1,
      buttonText: "Get offer",
    },
    {
      id: 2,
      title: "",
      description: "",
      image: banner2,
      buttonText: "Get offer",
    },
    {
      id: 3,
      title: "",
      description: "",
      image: banner3,
      buttonText: "Get offer",
    },
  ];

  const scrollToCategory = () => {
    const section = document.getElementById("product-category");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-base-100 mx-20 rounded-lg">
    <div className="  mx-auto  ">
      <Slider {...settings}>
        {eventSlides.map((event) => (
          <div key={event.id}>
            <div
              className=" w-full h-[500px] flex items-center justify-center text-white text-center bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${event.image})`,
              }}
            >
              <div className="bg-green bg-opacity-60 p-8 rounded-xl max-w-xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                <p className="mb-6">{event.description}</p>
                <button
                  onClick={scrollToCategory}
                  className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full"
                >
                  {event.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default Banner;
