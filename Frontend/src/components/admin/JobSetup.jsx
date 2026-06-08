import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  BriefcaseBusiness,
  MapPin,
  IndianRupee,
  FileText,
  Users,
  ArrowLeft,
  Save,
  Loader2,
  Clock,
  ListChecks,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const JobSetUp = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    position: "",
    requirements: "",
    experience: "",
    jobType: "",
  });

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const job = res.data.job;

          setJobData({
            title: job.title || "",
            description: job.description || "",
            location: job.location || "",
            salary: job.salary || "",
            position: job.position || "",
            requirements: job.requirements?.join(", ") || "",
            experience: job.experienceLevel || "",
            jobType: job.jobType || "",
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch job details",
        );
      }
    };

    if (id) {
      fetchSingleJob();
    }
  }, [id]);

  const changeHandler = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        jobData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="rounded-2xl mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* HEADER */}

          <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white flex items-center justify-center">
                <BriefcaseBusiness className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Job Setup
                </h1>

                <p className="text-green-100 mt-2 text-sm sm:text-lg">
                  Update your job information professionally
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form onSubmit={submitHandler} className="p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* TITLE */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <BriefcaseBusiness className="w-4 h-4 text-green-600" />
                  Job Title
                </label>

                <Input
                  name="title"
                  value={jobData.title}
                  onChange={changeHandler}
                  placeholder="Frontend Developer"
                  className="rounded-2xl h-12 w-full"
                />
              </div>

              {/* LOCATION */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  Location
                </label>

                <Input
                  name="location"
                  value={jobData.location}
                  onChange={changeHandler}
                  placeholder="Ahmedabad"
                  className="rounded-2xl h-12 w-full"
                />
              </div>

              {/* SALARY */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  Salary
                </label>

                <Input
                  name="salary"
                  value={jobData.salary}
                  onChange={changeHandler}
                  placeholder="500000"
                  className="rounded-2xl h-12 w-full"
                />
              </div>

              {/* POSITION */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  Open Positions
                </label>

                <Input
                  name="position"
                  value={jobData.position}
                  onChange={changeHandler}
                  placeholder="5"
                  className="rounded-2xl h-12 w-full"
                />
              </div>

              {/* EXPERIENCE */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  Experience
                </label>

                <Input
                  name="experience"
                  value={jobData.experience}
                  onChange={changeHandler}
                  placeholder="2"
                  className="rounded-2xl h-12 w-full"
                />
              </div>

              {/* JOB TYPE */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <BriefcaseBusiness className="w-4 h-4 text-green-600" />
                  Job Type
                </label>

                <Input
                  name="jobType"
                  value={jobData.jobType}
                  onChange={changeHandler}
                  placeholder="Full Time"
                  className="rounded-2xl h-12 w-full"
                />
              </div>

              {/* REQUIREMENTS */}

              <div className="md:col-span-2 space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-green-600" />
                  Requirements
                </label>

                <Input
                  name="requirements"
                  value={jobData.requirements}
                  onChange={changeHandler}
                  placeholder="React, Node, MongoDB"
                  className="rounded-2xl h-12 w-full"
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-8 space-y-3">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Job Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={jobData.description}
                onChange={changeHandler}
                placeholder="Write job description..."
                className="w-full rounded-3xl border border-gray-200 p-4 sm:p-5 resize-none outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 mt-6 sm:mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto rounded-2xl px-4 py-3"
              >
                Cancel
              </Button>

              {loading ? (
                <Button
                  disabled
                  className="w-full sm:w-auto rounded-2xl px-6 py-3"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 rounded-2xl px-6 py-3"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Job
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSetUp;
