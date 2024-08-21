import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const data = [
  {
    content: `“Your first blog posts won’t be perfect, but you just have to do it. You have to start somewhere.”`,
    name: `Shane Barker`,
  },
  {
    content: `“Think in small, incremental steps that build momentum. If you start now, in two or three years from now, you might be in a really great place.”`,
    name: `Steli Efti`,
  },
  {
    content: `“One of the best ways to sabotage content is to not tie it to your goals. Know why you’re creating content.”`,
    name: `Ellen Gomes`,
  },
  {
    content: `“Experience comes from actually doing something, and you can’t gain experience until you do. Qualifications don’t really matter. Nobody cares.”`,
    name: `Jeff Haden`,
  },
];

function Slide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div>
        <Slider {...settings} className="goru w-[480px]">
          {data.map((d) => (
            <div
              key={d.name}
              className="rounded-xl bg-white text-black w-96 h-64"
            >
              <p className="font-custom2 bg-blue-700 font-bold pt-6 h-56 px-1 rounded-xl text-xl">
                {d.content}
              </p>
              <p className="font-custom h-8 mt-2 text-xl">{d.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Slide;
