import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  Users,
  Building2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { setSingleJob } from "@/redux/jobSlice";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // CHECK USER APPLIED OR NOT

  // CHECK USER APPLIED OR NOT

  const isIntiallyApplied =
    singleJob?.applicants?.some(
      (application) =>
        application?.applicant?.toString() === user?._id?.toString(),
    ) || false;

  const [isApplied, setIsApplied] = React.useState(false);

  useEffect(() => {
    if (!singleJob || !user) return;

    const applied =
      singleJob?.applicants?.some(
        (application) =>
          application?.applicant?._id?.toString() === user?._id?.toString(),
      ) || false;

    setIsApplied(applied);
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    try {
      console.log("Apply Clicked");
      console.log("JobId =", jobId);

      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        },
      );

      console.log("Apply Response =", res.data);

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applicants: [
            ...(singleJob?.applicants || []),
            {
              applicant: {
                _id: user?._id,
              },
            },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        setIsApplied(true);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("FULL ERROR =", error);
      console.log("ERROR RESPONSE =", error.response?.data);
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        console.log("JOB RESPONSE =", res.data);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          setIsApplied(
            res.data.job?.applicants?.some(
              (application) =>
                application?.applicant?.toString() === user?._id?.toString(),
            ) || false,
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* MAIN CARD */}

        <div className="bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] overflow-hidden">
          {/* TOP BANNER */}

          <div className="h-56 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* CONTENT */}

          <div className="px-10 pb-10 relative">
            {/* COMPANY + JOB */}

            <div className="relative -mt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              {/* LEFT */}

              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6">
                {/* COMPANY LOGO */}

                <div className="w-32 h-32 rounded-3xl bg-white shadow-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                  {singleJob?.company?.logo ? (
                    <img
                      src={singleJob.company.logo}
                      alt="company-logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-16 h-16 text-green-600" />
                  )}
                </div>

                {/* INFO */}

                <div className="text-center lg:text-left">
                  <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
                    {singleJob?.title}
                  </h1>

                  <p className="text-xl font-semibold text-green-600 mt-2">
                    {singleJob?.company?.name}
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      {singleJob?.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 className="w-4 h-4 text-green-600" />
                      {singleJob?.jobType}
                    </div>
                  </div>
                </div>
              </div>

              {/* APPLY BUTTON */}

              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-2xl px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>

            {/* ABOUT JOB */}

            <div className="mt-14">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Job Description
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                {singleJob?.description}
              </p>
            </div>

            {/* JOB DETAILS */}

            <div className="grid md:grid-cols-2 gap-6 mt-14">
              {/* EXPERIENCE */}

              <div className="bg-green-50 border border-green-100 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center">
                    <BriefcaseBusiness className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Experience Required</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      {singleJob?.experienceLevel} Years
                    </h1>
                  </div>
                </div>
              </div>

              {/* SALARY */}

              <div className="bg-green-50 border border-green-100 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center">
                    <IndianRupee className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Salary Package</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      ₹{(Number(singleJob?.salary) / 100000).toFixed(1)} LPA
                    </h1>
                  </div>
                </div>
              </div>

              {/* APPLICANTS */}

              <div className="bg-green-50 border border-green-100 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center">
                    <Users className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total Applicants</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      {singleJob?.applicants?.length || 0} Applicants
                    </h1>
                  </div>
                </div>
              </div>

              {/* POSTED DATE */}

              <div className="bg-green-50 border border-green-100 rounded-3xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center">
                    <Clock3 className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Job Posted</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      {singleJob?.createdAt?.split("T")[0]}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
