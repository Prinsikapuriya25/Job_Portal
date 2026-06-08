import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { JOB_API_END_POINT } from "@/utils/constant";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
  CalendarDays,
  MapPin,
  Building2,
  Users,
} from "lucide-react";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const deleteJobHandler = async () => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${job._id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <tr className="hidden md:table-row border-b border-gray-200 hover:bg-green-50/60 transition-all duration-300">
        {/* JOB */}
        <td className="px-6 py-5">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">{job?.title}</h2>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4" />
              {new Date(job?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </td>

        {/* COMPANY */}
        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border bg-white shadow-sm">
              {job?.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt="company"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {job?.company?.name || "No Company"}
              </h3>

              <p className="text-xs text-gray-500">Company</p>
            </div>
          </div>
        </td>

        {/* LOCATION */}
        <td className="px-6 py-5">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-green-600" />
            {job?.location}
          </div>
        </td>

        {/* SALARY */}
        <td className="px-6 py-5">
          <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            ₹ {job?.salary}
          </span>
        </td>

        {/* JOB TYPE */}
        <td className="px-6 py-5">
          <span className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            {job?.jobType}
          </span>
        </td>

        {/* EXPERIENCE */}
        <td className="px-6 py-5">
          <span className="px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
            {job?.experienceLevel} Years
          </span>
        </td>

        {/* ACTION */}
        <td className="px-6 py-5 text-center">
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="
                h-10 w-10
                rounded-xl
                border
                border-gray-200
                bg-white
                flex
                items-center
                justify-center
                hover:bg-gray-50
                hover:border-green-500
                transition-all
              "
              >
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={10}
              className="
    w-56
    p-2
    bg-white
    border
    border-gray-200
    rounded-2xl
    shadow-xl
    z-[9999]
  "
            >
              {/* EDIT */}

              <div
                onClick={() => navigate(`/admin/jobs/${job._id}`)}
                className="
      flex items-center gap-3
      px-3 py-3
      rounded-xl
      cursor-pointer
      hover:bg-blue-50
      transition-all
    "
              >
                <div className="p-2 rounded-lg bg-blue-100">
                  <Pencil className="w-4 h-4 text-blue-600" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">Edit Job</p>
                  <p className="text-xs text-gray-500">Update job details</p>
                </div>
              </div>

              {/* APPLICANTS */}

              <div
                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                className="
              flex items-center gap-3   
              px-3 py-3
              rounded-xl
              cursor-pointer
            hover:bg-green-50
              transition-all
    "
              >
                <div className="p-2 rounded-lg bg-green-100">
                  <Users className="w-4 h-4 text-green-600" />
                </div>

                <div>
                  <p className="font-medium text-green-600">View Applicants</p>

                  <p className="text-xs text-gray-500">
                    Check applied candidates
                  </p>
                </div>
              </div>

              <div className="my-2 border-t border-gray-100" />

              {/* DELETE */}

              <div
                onClick={deleteJobHandler}
                className="
      flex items-center gap-3
      px-3 py-3
      rounded-xl
      cursor-pointer
      hover:bg-red-50
      transition-all
    "
              >
                <div className="p-2 rounded-lg bg-red-100">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>

                <div>
                  <p className="font-medium text-red-600">Delete Job</p>

                  <p className="text-xs text-gray-500">Permanently remove</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </td>
      </tr>

      {/* Mobile card layout as a single table row with colspan to keep table valid */}
      <tr className="md:hidden border-b border-gray-200 hover:bg-green-50/60 transition-all duration-300">
        <td colSpan={7} className="px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden border bg-white shadow-sm flex-shrink-0">
                {job?.company?.logo ? (
                  <img
                    src={job.company.logo}
                    alt="company"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {job?.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>{new Date(job?.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="mt-2 text-xs text-gray-600 truncate">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-green-600" />
                    <span className="truncate">{job?.location || "—"}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:flex-col sm:items-end">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  ₹ {job?.salary}
                </span>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  {job?.jobType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  {job?.experienceLevel}y
                </span>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="h-8 w-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:border-green-500 transition-all">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    sideOffset={10}
                    className="w-56 p-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-[9999]"
                  >
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-blue-50 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Edit Job</p>
                        <p className="text-xs text-gray-500">
                          Update job details
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-green-50 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-green-100">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-600">
                          View Applicants
                        </p>
                        <p className="text-xs text-gray-500">
                          Check applied candidates
                        </p>
                      </div>
                    </div>

                    <div className="my-2 border-t border-gray-100" />

                    <div
                      onClick={deleteJobHandler}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-red-50 transition-all"
                    >
                      <div className="p-2 rounded-lg bg-red-100">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-600">Delete Job</p>
                        <p className="text-xs text-gray-500">
                          Permanently remove
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default JobCard;
