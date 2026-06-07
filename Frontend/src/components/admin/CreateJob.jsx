import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { JOB_API_END_POINT, COMPANY_API_END_POINT } from "@/utils/constant";

const CreateJob = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();
  }, []);

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (companies.length === 0) {
      toast.error("Please register a company first.");

      navigate("/admin/companies/create");

      return;
    }

    try {
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* HEADER */}

          <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 px-10 py-10">
            <h1 className="text-4xl font-extrabold text-white">Create Job</h1>

            <p className="text-green-100 mt-2">
              Create and publish a new job posting
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={submitHandler} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Job Title</label>

                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeHandler}
                  placeholder="Frontend Developer"
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Location</label>

                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeHandler}
                  placeholder="Ahmedabad"
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Salary</label>

                <input
                  type="number"
                  name="salary"
                  value={input.salary}
                  onChange={changeHandler}
                  placeholder="500000"
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Job Type</label>

                <input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeHandler}
                  placeholder="Full Time"
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeHandler}
                  placeholder="2 Years"
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">
                  Open Positions
                </label>

                <input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeHandler}
                  placeholder="5"
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-gray-700">Company</label>

                <select
                  name="companyId"
                  value={input.companyId}
                  onChange={changeHandler}
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Company</option>

                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-gray-700">
                  Requirements
                </label>

                <input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeHandler}
                  placeholder="React, Node, MongoDB"
                  className="w-full h-12 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  rows={6}
                  name="description"
                  value={input.description}
                  onChange={changeHandler}
                  placeholder="Write job description..."
                  className="w-full rounded-3xl border border-gray-200 p-5 resize-none outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-2xl font-semibold shadow-lg"
              >
                Create Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
