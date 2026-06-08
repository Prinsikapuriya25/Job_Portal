import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* LOGO & DESCRIPTION */}

          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Job
              <span className="text-green-600">Portal</span>
            </h1>

            <p className="text-gray-500 mt-5 leading-relaxed max-w-md mx-auto md:mx-0">
              Discover top job opportunities, connect with recruiters, and build
              your dream career with confidence.
            </p>

            {/* SOCIAL ICONS */}

            <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
              <button
                aria-label="Facebook"
                type="button"
                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-4 h-4"
                >
                  <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                </svg>
              </button>

              <button
                aria-label="Instagram"
                type="button"
                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-4 h-4"
                >
                  <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
                </svg>
              </button>

              <button
                aria-label="LinkedIn"
                type="button"
                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-4 h-4"
                >
                  <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" />
                </svg>
              </button>

              <button
                aria-label="Twitter"
                type="button"
                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-4 h-4"
                >
                  <path d="M523.4 215.7C523.7 220.2 523.7 224.8 523.7 229.3C523.7 368 418.1 527.9 225.1 527.9C165.6 527.9 110.4 510.7 64 480.8C72.4 481.8 80.6 482.1 89.3 482.1C138.4 482.1 183.5 465.5 219.6 437.3C173.5 436.3 134.8 406.1 121.5 364.5C128 365.5 134.5 366.1 141.3 366.1C150.7 366.1 160.1 364.8 168.9 362.5C120.8 352.8 84.8 310.5 84.8 259.5L84.8 258.2C98.8 266 115 270.9 132.2 271.5C103.9 252.7 85.4 220.5 85.4 184.1C85.4 164.6 90.6 146.7 99.7 131.1C151.4 194.8 229 236.4 316.1 240.9C314.5 233.1 313.5 225 313.5 216.9C313.5 159.1 360.3 112 418.4 112C448.6 112 475.9 124.7 495.1 145.1C518.8 140.6 541.6 131.8 561.7 119.8C553.9 144.2 537.3 164.6 515.6 177.6C536.7 175.3 557.2 169.5 576 161.4C561.7 182.2 543.8 200.7 523.4 215.7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* COMPANY */}

          <div>
            <h2 className="text-lg font-bold text-gray-900">Company</h2>

            <ul className="space-y-3 mt-5 text-gray-500">
              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  Careers
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  Blog
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}

          <div>
            <h2 className="text-lg font-bold text-gray-900">Quick Links</h2>

            <ul className="space-y-3 mt-5 text-gray-500">
              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="hover:text-green-600 transition-all"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/browse"
                  className="hover:text-green-600 transition-all"
                >
                  Browse
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-green-600 transition-all"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}

          <div>
            <h2 className="text-lg font-bold text-gray-900">Support</h2>

            <ul className="space-y-3 mt-5 text-gray-500">
              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  Help Center
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:text-green-600 transition-all">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
