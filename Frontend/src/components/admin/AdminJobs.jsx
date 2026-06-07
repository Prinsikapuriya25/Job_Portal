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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}

        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900">Jobs</h1>

              <p className="text-gray-500 mt-3 text-lg">
                Manage and monitor all posted jobs
              </p>
            </div>

            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-green-600 hover:bg-green-700 rounded-2xl px-8 py-7 text-base shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="mr-2 w-5 h-5" />
              Add New Job
            </Button>
          </div>

          {/* SEARCH */}

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-green-600" />

            <input
              type="text"
              placeholder="Search jobs..."
              value={searchJob}
              onChange={(e) => setSearchJob(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        {/* TABLE */}

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-[2rem] shadow-lg p-20 text-center">
            <h1 className="text-4xl font-bold text-gray-400">No Jobs Found</h1>

            <p className="text-gray-500 mt-3">Create your first job posting</p>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
            {/* TABLE HEADER */}

            <div className="px-8 py-6 border-b bg-gradient-to-r from-green-600 to-emerald-500">
              <h2 className="text-2xl font-bold text-white">Job Listings</h2>

              <p className="text-green-100 mt-1">Manage all your posted jobs</p>
            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
