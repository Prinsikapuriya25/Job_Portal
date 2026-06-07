import React, { useEffect, useState } from "react";

import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Search, Loader2 } from "lucide-react";

const Jobs = () => {
  
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let filteredJobs = [...allJobs];

      // SEARCH BAR FILTER

      if (searchText.trim() !== "") {
        filteredJobs = filteredJobs.filter((job) => {
          return (
            job.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchText.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchText.toLowerCase()) ||
            job.jobType?.toLowerCase().includes(searchText.toLowerCase())
          );
        });
      }

      // FILTER CARD FILTER

      if (searchedQuery.trim() !== "") {
        filteredJobs = filteredJobs.filter((job) => {
          const salary = Number(job.salary);

          // Salary Filters

          if (searchedQuery === "0 - 3 LPA") {
            return salary <= 300000;
          }

          if (searchedQuery === "3 - 5 LPA") {
            return salary > 300000 && salary <= 500000;
          }

          if (searchedQuery === "5 - 10 LPA") {
            return salary > 500000 && salary <= 1000000;
          }

          if (searchedQuery === "10 - 20 LPA") {
            return salary > 1000000 && salary <= 2000000;
          }

          if (searchedQuery === "20+ LPA") {
            return salary > 2000000;
          }

          // Normal Filters

          return (
            job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description
              ?.toLowerCase()
              .includes(searchedQuery.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase())
          );
        });
      }

      setFilterJobs(filteredJobs);

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [allJobs, searchedQuery, searchText]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* SEARCH BAR */}

      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm px-5 py-4 flex items-center gap-3">
          <Search className="text-green-600 w-5 h-5" />

          <input
            type="text"
            placeholder="Search jobs, skills, locations..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full outline-none text-gray-700 bg-transparent"
          />
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex gap-6">
          {/* FILTER SECTION */}

          <div className="w-[25%] hidden lg:block">
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </div>

          {/* JOBS SECTION */}

          <div className="flex-1 h-[85vh] overflow-y-auto pb-5">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[70vh]">
                <Loader2 className="w-14 h-14 text-green-600 animate-spin" />

                <p className="mt-4 text-lg font-semibold text-gray-600">
                  Searching jobs...
                </p>
              </div>
            ) : filterJobs.length <= 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-2xl font-semibold text-gray-500">
                  Job not found
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 30 }}
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
      </div>
    </div>
  );
};

export default Jobs;
