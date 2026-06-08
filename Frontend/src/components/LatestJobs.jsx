import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";
import { setAllJobs } from "../redux/jobSlice";
import LatestJobCards from "./LatestJobCards";

const LatestJobs = () => {
  const dispatch = useDispatch();

  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6">
      {/* HEADING */}

      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900">
          Latest & <span className="text-green-600">Top Jobs</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-500 mt-4 text-base sm:text-lg leading-relaxed">
          Explore trending jobs from top companies
        </p>
      </div>

      {/* JOBS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {allJobs?.length <= 0 ? (
          <div className="col-span-full py-20 text-center">
            <span className="text-xl sm:text-2xl font-semibold text-gray-500">
              No Jobs Available
            </span>
          </div>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
