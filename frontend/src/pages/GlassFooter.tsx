import { motion } from "motion/react";

export default function GlassFooter() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a0a] text-white px-6 py-12 md:px-20 border-t border-white/10"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">
          {/* Logo & CTA */}
          <div className="max-w-xl">
            <h1 className="text-5xl sm:text-6xl font-semibold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
              Career Cosmos
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-300">
              The next stellar journey starts here— <br />
              Launch your career into the cosmos and explore infinite possibilities! 🚀
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-10 text-sm">
            <div className="space-y-3">
              <p className="hover:text-blue-400 cursor-pointer transition-colors">Home Base</p>
              <p className="hover:text-purple-400 cursor-pointer transition-colors">Mission Benefits</p>
              <p className="hover:text-cyan-400 cursor-pointer transition-colors">Galaxy Portfolio</p>
              <p className="hover:text-pink-400 cursor-pointer transition-colors">Pilot Reviews</p>
              <p className="hover:text-blue-400 cursor-pointer transition-colors">About Universe</p>
            </div>
            <div className="space-y-3">
              <p className="hover:text-blue-400 cursor-pointer transition-colors">LinkedIn Nebula</p>
              <p className="hover:text-purple-400 cursor-pointer transition-colors">Facebook Galaxy</p>
              <p className="hover:text-cyan-400 cursor-pointer transition-colors">Twitter Cosmos</p>
              <p className="hover:text-pink-400 cursor-pointer transition-colors">Instagram Stars</p>
              <p className="hover:text-blue-400 cursor-pointer transition-colors">YouTube Universe</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 mb-10" />

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* Communication */}
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.59a1 1 0 01-.24 1.01l-2.21 2.19z"/>
              </svg>
              <span>SPACE COMM</span>
            </div>
            <p>(+1) 555-COSMOS</p>
          </div>

          {/* Transmission */}
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 
                2v12c0 1.1.9 2 2 2h16c1.1 0 
                2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
                4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>TRANSMISSION</span>
            </div>
            <p>mission@career-cosmos.space</p>
          </div>

          {/* Space Station */}
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.14 2 5 5.14 5 
                9c0 5.25 7 13 7 
                13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 
                9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 
                6.5 12 6.5s2.5 1.12 2.5 
                2.5S13.38 11.5 12 11.5z"/>
              </svg>
              <span>SPACE STATION</span>
            </div>
            <p>
              Orbital Platform 7, Sector 12, <br />
              Milky Way Galaxy, Universe 1
            </p>
          </div>

          {/* Mission Hours */}
          <div>
            <div className="flex items-center gap-2 text-pink-400 font-semibold mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8V12l3 3 .7-.7L13 
                11.5V8zm0-6C6.48 2 2 6.48 2 
                12s4.48 10 10 10 10-4.48 
                10-10S17.52 2 12 2z"/>
              </svg>
              <span>MISSION HOURS</span>
            </div>
            <p>Mon to Sat: 24/7 Orbit Time</p>
            <p>Sun: Light Speed Travel</p>
          </div>
        </div>

        <hr className="border-gray-800 mt-10 mb-6" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
          <p>© Career Cosmos - All galaxies reserved 2024 🌌</p>
          <p>Made with 🚀 by <span className="text-blue-400">Stellar Developers</span></p>
        </div>
      </div>
    </motion.footer>
  );
}