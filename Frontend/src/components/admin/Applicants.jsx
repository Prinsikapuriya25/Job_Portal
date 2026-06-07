import React, { useEffect } from "react";
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

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          },
        );

        console.log("API RESPONSE =", res.data);

        dispatch(setAllApplications(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}

        <div className="rounded-[2rem] overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-8">
            <div className="flex justify-between items-center">
              <div>
                <button
                  onClick={() => navigate(-1)}
                  className="text-white flex items-center gap-2 mb-3"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                <h1 className="text-5xl font-black text-white">Applicants</h1>

                <p className="text-green-100 mt-2 text-lg">
                  {applications?.title}
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl text-white">
                <p className="text-sm">Total Applicants</p>

                <h2 className="text-3xl font-bold">
                  {applications?.applicants?.length || 0}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div className="mt-8">
          <ApplicantsTable applications={applications?.applicants} />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
