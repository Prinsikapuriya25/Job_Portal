import React from "react";

import { Badge } from "./ui/badge";

import { useNavigate } from "react-router-dom";

import { MapPin, BriefcaseBusiness } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group p-5 sm:p-6 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
    >
      {/* TOP */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-bold text-xl sm:text-2xl text-gray-900 truncate">
            {job?.company?.name}
          </h1>

          <p className="text-sm text-gray-600 mt-2 flex flex-wrap items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{job?.location}</span>
          </p>
        </div>
      </div>

      {/* JOB INFO */}

      <div className="mt-6">
        <h1 className="font-bold text-xl sm:text-2xl text-gray-900 group-hover:text-green-600 transition-all duration-300">
          {job?.title}
        </h1>

        <p className="text-sm sm:text-base text-gray-600 mt-3 line-clamp-4 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* BADGES */}

      <div className="flex flex-wrap items-center gap-2 mt-6">
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-full px-3 py-1 text-sm font-medium">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-3 py-1 text-sm font-medium">
          <BriefcaseBusiness className="w-4 h-4 mr-1" />
          {job?.jobType}
        </Badge>

        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      {/* BUTTON */}

      <button className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-medium shadow-md hover:shadow-xl transition-all duration-300">
        Apply Now
      </button>
    </div>
  );
};

export default LatestJobCards;
