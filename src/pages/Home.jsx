import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slide from "../componets/Slide";
import "../App.css";
function Home() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <header>
      <div className="flex justify-evenly items-center font-custom1 hero-page">
        <div className="flex justify-center  items-center">
          <div>
            <span className="text-6xl text-blue-900 ">W</span>
            <span className="text-4xl lowercase">elcome!</span>
            <br />
            <span>Signup and get started </span>
            <span>WITH THE WORLD OF BLOGS</span>
            <br />
            <p className="">The best platform to write and store your blogs </p>
          </div>
        </div>
        <div className="chota flex justify-center items-center mt-6">
          <div>
            <span className="pr-2">
              <span className="text-6xl text-blue-900 font-custom1">M</span>
              <span className="text-4xl font-custom1 lowercase">otivation</span>
            </span>
            <br />
            <Slide />
          </div>
        </div>
      </div>
      {/* <div>
        <div className="flex justify-between  items-center">
          <div
            id="left"
            className="font-custom1 pl-24 py-32 "
            data-aos="flip-right"
          >
            <span className="text-6xl text-blue-900 ">W</span>
            <span className="text-4xl lowercase">elcome!</span>
            <br />
            <span>Signup and get started </span>
            <span>WITH THE WORLD OF BLOGS</span>
            <br />
            <p className="">The best platform to write and store your blogs </p>
          </div>
          <div id="right" className="mt-16 ml-40">
            <span className="pr-2">
              <span className="text-6xl text-blue-900 font-custom1">M</span>
              <span className="text-4xl font-custom1 lowercase">otivation</span>
            </span>
            <br />
            <Slide />
          </div>
        </div>
      </div> */}
      <div className="flex justify-evenly items-center hero-page">
        <div className="goru2 flex justify-center items-center">
          <div
            id="left"
            className=" goru2 font-custom1 mb-8"
            data-aos="flip-right"
          >
            <span className="text-6xl text-blue-900">O</span>
            <span className="text-4xl">ur Stats</span>
            <br />
            <div className="flex gap-8 justify-center">
              <div>
                <span>Active Users</span>
                <br />
                <span>10k+</span>
              </div>
              <div>
                <span>Blogs</span>
                <br />
                <span>100k+</span>
              </div>
              <div>
                <span>Buisness Partners</span>
                <br />
                <span>25+</span>
              </div>
            </div>
          </div>
        </div>
        <div className="goru1 flex justify-center items-center mt-4">
          {" "}
          <div id="right" className="mt-7">
            <div className="font-custom1 text-4xl">
              <h2>
                <span className="text-6xl text-blue-900">F</span>amous Indian
                BLoggers
              </h2>
            </div>
            <div className="grid grid-cols-2 mb-10 gap-3">
              <div
                id="item1"
                className="col-span-1 duration-300 border-4 border-black rounded-xl w-52 h-52 hover:scale-110"
              >
                <img
                  src="https://en.wikiflux.org/wiki/images/9/96/Shradha_Sharma_.jpg"
                  className="w-52 h-40 rounded-lg"
                  alt=""
                />
                <p className="authorname w-52 h-12 font-custom1 mt-2">
                  Shradha Sharma
                </p>
              </div>
              <div
                id="item2"
                className="col-span-1 duration-300 border-4 border-black rounded-xl w-52 h-52 hover:scale-110"
              >
                <img
                  src="https://seowebfirm.com/wp-content/uploads/2022/05/Amit-Agarwal-1.webp"
                  className="w-52 h-40 rounded-lg"
                  alt=""
                />
                <p className=" authorname w-52 h-12 font-custom1 mt-2">
                  Amit Agarwal
                </p>
              </div>
              <div
                id="item3"
                className="col-span-1 duration-300 border-4 border-black rounded-xl w-52 h-52 hover:scale-110"
              >
                <img
                  src="https://i0.wp.com/harsh.in/wp-content/uploads/2020/05/harsh-about.jpg"
                  className="w-52 h-40 rounded-lg"
                  alt=""
                />
                <p className=" authorname w-52 h-10 mt-2 font-custom1">
                  Harsh Agarwal
                </p>
              </div>
              <div
                id="item4"
                className="col-span-1 duration-300 border-4 border-black rounded-xl w-52 h-52 hover:scale-110"
              >
                <img
                  src="https://secure.gravatar.com/avatar/28213934b373bcca4e2a61c04bf50d3a?s=500&d=mm&r=g"
                  className="w-52 h-40 rounded-lg"
                  alt=""
                />
                <p className=" authorname w-52 h-10 mt-2 font-custom1">
                  Anuradha Goyal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
