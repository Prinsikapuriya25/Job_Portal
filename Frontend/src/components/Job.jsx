import React from "react";
import { Button } from "./ui/button";
import { Bookmark, MapPin, Clock3 } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);

    const currentTime = new Date();

    const timeDifference = currentTime - createdAt;

    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
      {/* TOP */}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Clock3 className="w-4 h-4" />

          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-gray-200 hover:border-green-600 hover:text-green-600 transition-all duration-300"
        >
          <Bookmark className="w-5 h-5" />
        </Button>
      </div>

      {/* COMPANY */}

      <div className="flex items-center gap-4 mt-6">
        <div className="p-1 rounded-2xl border border-gray-100 shadow-sm">
          <Avatar className="w-14 h-14">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>

        <div>
          <h1 className="font-bold text-lg text-gray-900">
            {job?.company?.name}
          </h1>

          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="w-4 h-4" />

            <span>{job?.location}</span>
          </div>
        </div>
      </div>

      {/* JOB INFO */}

      <div className="mt-6">
        <h1 className="font-bold text-2xl text-gray-900 group-hover:text-green-600 transition-all duration-300">
          {job?.title}
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* BADGES */}

      <div className="flex flex-wrap items-center gap-3 mt-6">
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-full px-4 py-1 font-medium">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 rounded-full px-4 py-1 font-medium">
          {job?.jobType}
        </Badge>

        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 rounded-full px-4 py-1 font-medium">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      {/* BUTTONS */}

      <div className="flex items-center gap-3 mt-8">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 rounded-2xl border-green-200 hover:border-green-600 hover:text-green-600 transition-all duration-300"
        >
          Details
        </Button>

        <Button className="flex-1 rounded-2xl bg-green-600 hover:bg-green-700 shadow-md hover:shadow-xl transition-all duration-300">
          Save Job
        </Button>
      </div>
    </div>
  );
};

export default Job;
