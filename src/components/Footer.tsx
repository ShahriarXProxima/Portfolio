import React from 'react';
import QRCode from 'react-qr-code';

import githubIcon from '../../resources/assets/social/github.png';
import linkedinIcon from '../../resources/assets/social/linkedIn.svg';
import facebookIcon from '../../resources/assets/social/facebook.svg';
import whatsappIcon from '../../resources/assets/social/whatsapp.png';
import telegramIcon from '../../resources/assets/social/telegram.png';
import googleIcon from '../../resources/assets/social/google.png';

export default function Footer() {
  const qrData = "https://drive.google.com/file/d/1-um3LfSZzJDiHPpCxPLTImasjWkTSAbm/view?usp=drive_link";
  
  const baseColors = ["#03624C", "#DCEEFF", "#7DA7D9", "#FFFFFF", "#FF4D00"];
  const colors = [...baseColors, baseColors[0]];
  const [colorIndex, setColorIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setColorIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (colorIndex === baseColors.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setColorIndex(0);
      }, 750); // wait for CSS transition to finish before snapping back
      return () => clearTimeout(timeout);
    }
  }, [colorIndex, baseColors.length]);

  return (
    <footer id="contact" className="w-full bg-[#181818] text-[#F0F0F0] flex flex-col font-sans px-6 md:px-12 py-10">
      {/* Huge Heading */}
      <h2 className="text-[16vw] md:text-[13vw] font-bold leading-[0.8] tracking-tighter mb-20 md:mb-32 ml-[-0.5vw]">
        Open the door
      </h2>

      {/* Main Grid: Info and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 mb-32">

        {/* Left Column: Contact Info */}
        <div className="flex flex-col gap-8 text-[13px] md:text-[14px] font-mono tracking-tight text-gray-300">
          <a href="mailto:shahriarxproximalog1@gmail.com" className="hover:text-white transition-colors text-base">shahriarxproximalog1@gmail.com</a>

          <div className="grid grid-cols-2 gap-y-5 gap-x-8">
            <a href="https://github.com/ShahriarXProxima" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><img src={githubIcon} alt="Github" className="w-6 h-6 hover:opacity-80 transition-opacity" /><span>GitHub</span></a>
            <a href="https://www.linkedin.com/in/shahriarxtahmid/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6 hover:opacity-80 transition-opacity" /><span>LinkedIn</span></a>
            <a href="https://www.facebook.com/proximaXshahriar" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><img src={facebookIcon} alt="Facebook" className="w-6 h-6 hover:opacity-80 transition-opacity" /><span>Facebook</span></a>
            <a href="https://wa.me/proximaXshahriar" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6 hover:opacity-80 transition-opacity" /><span>WhatsApp</span></a>
            <a href="https://t.me/Shahriartahmid" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><img src={telegramIcon} alt="Telegram" className="w-6 h-6 hover:opacity-80 transition-opacity" /><span>Telegram</span></a>
            <a href="mailto:shahriarxproximalog1@gmail.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><img src={googleIcon} alt="Google" className="w-6 h-6 hover:opacity-80 transition-opacity" /><span>Google</span></a>
          </div>

          <div className="mt-4">
            <a href={qrData} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-white rounded-full hover:scale-105 transition-transform w-40 h-40">
              <QRCode value={qrData} size={110} />
            </a>
          </div>
        </div>

        {/* Right Column: Form */}
        <form action="https://formspree.io/f/xykrvpap" method="POST" className="flex flex-col gap-8 lg:pl-16">
          <div className="text-[15px] font-bold font-sans">Name (required)</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm font-sans transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-mono text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm font-sans transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-mono text-gray-300">Email (required)</label>
            <input
              type="email"
              name="email"
              required
              className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm font-sans transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-mono text-gray-300">Message (required)</label>
            <textarea
              name="message"
              required
              className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm font-sans min-h-[100px] resize-none transition-colors"
            ></textarea>
          </div>

          <div className="mt-4">
            <button type="submit" className="bg-white text-black px-8 py-3 text-[13px] font-bold font-mono tracking-wider hover:bg-gray-200 transition-colors rounded-full">
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      {/* 3-Column Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[12px] md:text-[13px] font-mono text-gray-400 mb-20 md:mb-32">
        <div className="leading-relaxed">
          Full-Stack Developer<br />
          React, Spring Boot, Typescript<br />
          Problem Solver
        </div>
        <div className="leading-relaxed md:text-center">
          1 years of experience<br />
          <a href="#" className="underline hover:text-white transition-colors">View Work</a>
        </div>
        <div className="leading-relaxed md:text-right">
          Dhaka, Bangladesh<br />
          2026
        </div>
      </div>

      {/* Bottom Name */}
      <h1 className="text-[14vw] md:text-[12vw] font-bold leading-[0.8] tracking-tighter text-center mb-16 lowercase break-words flex items-center justify-center flex-wrap">
        <span className="text-[#FF4D00]">Shahriar&nbsp;</span>
        <span className="inline-flex flex-col h-[0.8em] overflow-hidden">
          <span 
            className={`flex flex-col ${isTransitioning ? 'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]' : ''}`}
            style={{ transform: `translateY(-${colorIndex * (100 / colors.length)}%)` }}
          >
            {colors.map((color, i) => (
              <span key={i} style={{ color }} className="h-[0.8em] leading-[0.8]">
                tahmid
              </span>
            ))}
          </span>
        </span>
      </h1>

      {/* Footer Links */}
      <div className="flex justify-between items-center text-[12px] md:text-[13px] font-mono mb-8 px-4">
        <div className="w-1/3">
          <a href="#" className="underline hover:text-gray-300 transition-colors">Contact</a>
        </div>
        <div className="w-1/3 text-center">
          <a href="mailto:shahriarxproximalog1@gmail.com" className="underline hover:text-gray-300 transition-colors">hello@shahriar</a>
        </div>
        <div className="w-1/3 flex justify-end"></div>
      </div>

      {/* Copyright Line */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] text-gray-500 font-mono px-4 border-t border-gray-800 pt-6">
        <p className="mb-4 md:mb-0 text-center md:text-left">© 2026 Shahriar Tahmid</p>
        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
      </div>
    </footer>
  );
}
