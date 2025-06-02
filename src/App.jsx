import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

// Add custom CSS animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .animate-fadeIn { animation: fadeIn 1s ease-out; }
  .animate-slideUp { animation: slideUp 0.8s ease-out forwards; opacity: 0; }
  .animate-pulse { animation: pulse 2s infinite; }
  .animation-delay-200 { animation-delay: 0.2s; }
  .animation-delay-400 { animation-delay: 0.4s; }
  .animation-delay-600 { animation-delay: 0.6s; }
  .animation-delay-800 { animation-delay: 0.8s; }
  .animation-delay-1000 { animation-delay: 1s; }

  .text-shadow-glow {
    text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4);
  }

  .bg-gradient-custom {
    background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%);
  }
`;

function App() {
  let [showContent, setShowContent] = useState(false);
  
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          const svgElement = document.querySelector(".svg");
          if (svgElement) {
            svgElement.remove();
          }
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.8,
      x: "-50%",
      y: "-50%",
      top: "50%",
      left: "50%",
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    // Additional animations for navbar and bottom bar
    gsap.from(".navbar", {
      y: -100,
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
      ease: "Power3.easeOut",
    });

    gsap.from(".btmbar", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      delay: 0.7,
      ease: "Power3.easeOut",
    });

    // Floating animation for character
    gsap.to(".character", {
      y: "-45%",
      repeat: -1,
      yoyo: true,
      duration: 3,
      delay: 2,
      ease: "Sine.easeInOut",
    });

    // Text glow animation
    gsap.to(".text h1", {
      textShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)",
      repeat: -1,
      yoyo: true,
      duration: 2,
      delay: 1,
      ease: "Sine.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      const yMove = (e.clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
        y: `${yMove * 0.2}%`,
        duration: 1,
      });
      gsap.to(".sky", {
        x: xMove,
        y: yMove * 0.5,
        duration: 1.2,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
        y: yMove * 0.8,
        duration: 1.5,
      });
      gsap.to(".character", {
        x: `${-50 + xMove * 0.1}%`,
        rotationY: xMove * 0.5,
        duration: 1.8,
      });
    });

    // Logo lines animation
    gsap.from(".line", {
      width: 0,
      duration: 1,
      delay: 1,
      stagger: 0.2,
      ease: "Power2.easeOut",
    });

    // PS5 logo hover effect
    const ps5Logo = document.querySelector(".btmbar img");
    ps5Logo?.addEventListener("mouseenter", () => {
      gsap.to(ps5Logo, {
        scale: 1.2,
        rotation: 360,
        duration: 0.5,
        ease: "Back.easeOut",
      });
    });
    
    ps5Logo?.addEventListener("mouseleave", () => {
      gsap.to(ps5Logo, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "Power2.easeOut",
      });
    });
  }, [showContent]);

  return (
    <>
      <style>{customStyles}</style>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 300 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="30"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  WUKONG
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.jpg"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-8 px-8">
              <div className="logo flex gap-6 items-center">
                <div className="lines flex flex-col gap-1">
                  <div className="line w-12 h-1 bg-white"></div>
                  <div className="line w-8 h-1 bg-white"></div>
                  <div className="line w-4 h-1 bg-white"></div>
                </div>
                <h3 className="text-3xl font-bold leading-none text-white">
                  Black Myth
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.jpg"
                alt=""
              />
              <img
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.jpg"
                alt=""
              />
              <div className="text text-white flex flex-col gap-1.5 absolute top-12 left-3 -translate-x-2 scale-[1.4] rotate-[-10deg] z-[5]">
                <h1 className="text-[15rem] leading-none font-bold text-shadow-glow">WUK</h1>
                <h1 className="text-[15rem] leading-none font-bold text-shadow-glow">ONG</h1>
              </div>
              <img
                className="absolute character bottom-0 left-3 translate-x-[10%] translate-y-[80%] scale-[2.2] rotate-[-20deg] max-h-[130%] object-contain z-[7]"
                src="./girlbg.webp"
                alt=""
              />
            </div>
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-12 px-8 bg-gradient-custom z-[10]">
              <div className="flex gap-4 items-center animate-pulse">
                <i className="text-3xl ri-arrow-down-line animate-bounce"></i>
                <h3 className="text-lg font-medium hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                  Black Myth: Wukong
                </h3>
              </div>
              <img
                className="absolute h-12 bottom-4 right-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
                src="./ps5.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] animate-fadeIn">
              <div className="limg relative w-1/2 h-full overflow-hidden">
                <img
className="absolute bottom-1 left-1 scale-[1.3] hover:scale-[1.5] transition-transform duration-200 cursor-pointer"
                  src="./imag.jpg"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
              <div className="rg w-1/2 py-8 px-8">
                <h1 className="text-6xl animate-slideUp hover:text-yellow-400 transition-colors duration-300 cursor-default font-bold mb-4">Still Running,</h1>
                <h1 className="text-6xl animate-slideUp animation-delay-200 hover:text-yellow-400 transition-colors duration-300 cursor-default font-bold mb-8">Not Hunting</h1>
                <p className="mt-6 text-lg animate-slideUp animation-delay-400 opacity-80 hover:opacity-100 transition-opacity duration-300 leading-relaxed mb-4">
                  Black Myth: Wukong is an action RPG inspired by Chinese mythology, particularly Journey to the West. Players take on the role of the "Destined One," a protagonist based on Sun Wukong, and embark on a journey filled with combat, exploration, and a narrative exploring themes of identity and morality.
                </p>
                <p className="text-lg animate-slideUp animation-delay-600 opacity-80 hover:opacity-100 transition-opacity duration-300 leading-relaxed mb-4">
                  The game features a unique blend of action RPG gameplay with elements of Souls-like combat, where precision and timing are crucial for surviving challenging encounters with mythical creatures and legendary bosses.
                </p>
                <p className="text-lg animate-slideUp animation-delay-800 opacity-80 hover:opacity-100 transition-opacity duration-300 leading-relaxed mb-8">
                  Experience stunning visuals powered by Unreal Engine 5, bringing ancient Chinese landscapes and legendary characters to life with unprecedented detail and immersion.
                </p>
                <button className="bg-yellow-500 px-8 py-4 text-black text-xl font-bold animate-slideUp animation-delay-1000 hover:bg-yellow-400 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 rounded-lg">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;