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
  }, []);

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

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-white border border-gray-100 shadow-xl rounded-[2rem] p-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <Search className="text-green-600 w-8 h-8" />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                Browse Jobs
              </h1>

              <p className="text-gray-500 mt-2">
                Explore jobs based on your interests and skills
              </p>
            </div>
          </div>

          {/* SEARCH QUERY */}

          {searchedQuery && (
            <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium">
              Search:
              <span className="font-bold">{searchedQuery}</span>
            </div>
          )}
        </div>
      </div>

      {/* JOBS */}

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Jobs</h1>

          <div className="bg-white border border-gray-100 shadow-md rounded-2xl px-5 py-3">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
