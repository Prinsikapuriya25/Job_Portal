import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ApplicantsTable from "./ApplicantsTable";
import Navbar from "../shared/Navbar";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllApplications } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applications } = useSelector((store) => store.application);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        console.log("API RESPONSE =", res.data);
        dispatch(setAllApplications(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch, reloadFlag]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* HEADER */}
        <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6">
              {/* Left: Back + Title */}
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => navigate(-1)}
                  className="text-white flex items-center gap-2 mb-2 sm:mb-3 text-sm sm:text-base hover:text-green-100 transition-colors"
                >
                  <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Back
                </button>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  Applicants
                </h1>

                <p className="text-green-100 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg truncate">
                  {applications?.title}
                </p>
              </div>

              {/* Right: Total Applicants Badge */}
              <div className="bg-white/20 backdrop-blur-md px-4 sm:px-5 md:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white self-start sm:self-auto flex-shrink-0">
                <p className="text-xs sm:text-sm text-green-100">
                  Total Applicants
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {applications?.applicants?.length || 0}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-4 sm:mt-6 md:mt-8">
          <ApplicantsTable
            applications={applications?.applicants}
            onStatusChange={() => setReloadFlag((value) => !value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
