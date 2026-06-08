import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobs = () => {
  useGetAllAdminJobs();

  const navigate = useNavigate();

  const [searchJob, setSearchJob] = useState("");

  const { allAdminJobs = [] } = useSelector((store) => store.job);

  const filteredJobs = allAdminJobs.filter((job) =>
    job?.title?.toLowerCase().includes(searchJob.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* HEADER */}
        <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
                Jobs
              </h1>
              <p className="text-gray-500 mt-1 sm:mt-2 md:mt-3 text-sm sm:text-base md:text-lg">
                Manage and monitor all posted jobs
              </p>
            </div>

            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 rounded-xl sm:rounded-2xl px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Add New Job
            </Button>
          </div>

          {/* SEARCH */}
          <div className="mt-4 sm:mt-6 md:mt-8 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchJob}
              onChange={(e) => setSearchJob(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* TABLE / CARDS */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-lg p-10 sm:p-16 md:p-20 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
              No Jobs Found
            </h1>
            <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
              Create your first job posting
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
            {/* TABLE HEADER */}
            <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b bg-gradient-to-r from-green-600 to-emerald-500">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Job Listings
              </h2>
              <p className="text-green-100 mt-0.5 sm:mt-1 text-xs sm:text-sm md:text-base">
                Manage all your posted jobs
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-5 text-left font-bold text-gray-700">
                      Job
                    </th>
                    <th className="px-6 py-5 text-left font-bold text-gray-700">
                      Company
                    </th>
                    <th className="px-6 py-5 text-left font-bold text-gray-700">
                      Location
                    </th>
                    <th className="px-6 py-5 text-left font-bold text-gray-700">
                      Salary
                    </th>
                    <th className="px-6 py-5 text-left font-bold text-gray-700">
                      Type
                    </th>
                    <th className="px-6 py-5 text-left font-bold text-gray-700">
                      Experience
                    </th>
                    <th className="px-6 py-5 text-center font-bold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Card Layout */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} isMobile={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
