import React from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-100 via-white to-emerald-200 py-16 sm:py-20 lg:py-24">
      {/* BLUR EFFECTS */}

      <div className="absolute top-8 left-4 sm:top-10 sm:left-10 w-56 h-56 sm:w-72 sm:h-72 bg-green-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-8 right-4 sm:bottom-10 sm:right-10 w-56 h-56 sm:w-72 sm:h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          {/* BADGE */}

          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 rounded-full bg-white shadow-md border border-green-100">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>

            <p className="text-xs sm:text-sm font-medium text-green-700">
              No.1 Smart Job Portal Platform
            </p>
          </div>

          {/* HEADING */}

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 mt-8 leading-tight">
            Find Your Dream <br />
            <span className="text-green-600">Job & Career</span>
          </h1>

          {/* DESCRIPTION */}

          <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg mt-6 leading-relaxed">
            Explore thousands of job opportunities from top companies, connect
            with recruiters, and build your future with confidence.
          </p>

          {/* SEARCH BAR */}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white max-w-2xl mx-auto mt-10 rounded-full shadow-2xl border border-green-100 overflow-hidden">
            <input
              type="text"
              placeholder="Search jobs, companies, keywords..."
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 min-w-0 px-5 py-4 sm:px-6 outline-none text-gray-700 bg-transparent"
            />

            <Button
              onClick={searchJobHandler}
              className="rounded-none sm:rounded-r-full rounded-b-full sm:rounded-b-none px-8 py-5 sm:px-8 sm:py-4 bg-green-600 hover:bg-green-700"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* BUTTON */}

          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <Link to="/jobs" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto rounded-full px-6 py-4 sm:px-8 sm:py-6 bg-green-600 hover:bg-green-700 text-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                Explore Jobs
              </Button>
            </Link>
          </div>

          {/* STATS */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mt-14">
            <div className="min-w-[110px]">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                10K+
              </h2>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Active Jobs
              </p>
            </div>

            <div className="min-w-[110px]">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                500+
              </h2>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Companies
              </p>
            </div>

            <div className="min-w-[110px]">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                25K+
              </h2>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Candidates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
