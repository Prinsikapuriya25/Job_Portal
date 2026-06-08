import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const Browse = () => {
  useGetAllJobs();

  const dispatch = useDispatch();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const filteredJobs = allJobs.filter((job) => {
    if (!searchedQuery) return true;

    return (
      job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
      job?.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <Navbar />

      {/* HERO */}

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
        <div className="bg-white border border-gray-100 shadow-xl rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <Search className="text-green-600 w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Browse Jobs
              </h1>

              <p className="text-gray-500 mt-2 max-w-2xl">
                Explore jobs based on your interests and skills
              </p>
            </div>
          </div>

          {/* SEARCH QUERY */}

          {searchedQuery && (
            <div className="mt-6 inline-flex flex-wrap items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
              <span>Search:</span>
              <span className="font-bold truncate">{searchedQuery}</span>
            </div>
          )}
        </div>
      </div>

      {/* JOBS */}

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Available Jobs
          </h1>

          <div className="bg-white border border-gray-100 shadow-md rounded-2xl px-4 py-3 w-full md:w-auto text-center md:text-left">
            <span className="text-green-600 font-bold">
              {filteredJobs.length}
            </span>
            <span className="text-gray-500"> Jobs Found</span>
          </div>
        </div>

        {filteredJobs.length <= 0 ? (
          <div className="bg-white border border-gray-100 shadow-xl rounded-3xl py-24 text-center">
            <h1 className="text-3xl font-bold text-gray-900">No Jobs Found</h1>

            <p className="text-gray-500 mt-3">
              Try another keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job?._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
