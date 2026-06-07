import React from "react";
import {
  Users,
  Mail,
  Phone,
  CalendarDays,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  FileText,
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const ApplicantsTable = ({ applications, loading }) => {
  const statusHandler = async (status, applicationId) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(
          status === "Accepted"
            ? "✅ Applicant Accepted Successfully"
            : "❌ Applicant Rejected Successfully",
        );

        window.location.reload();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to update applicant status",
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-20 text-center">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>

        <p className="mt-4 text-gray-500 font-medium">Loading Applicants...</p>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-20 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <Users className="w-12 h-12 text-green-600" />
        </div>

        <h2 className="text-3xl font-bold mt-6 text-gray-900">
          No Applicants Yet
        </h2>

        <p className="text-gray-500 mt-3">
          Share this job and attract more candidates.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <tr>
            <th className="px-6 py-5 text-left font-semibold text-gray-700">
              Candidate
            </th>

            <th className="px-6 py-5 text-left font-semibold text-gray-700">
              Email
            </th>

            <th className="px-6 py-5 text-left font-semibold text-gray-700">
              Phone
            </th>

            <th className="px-6 py-5 text-left font-semibold text-gray-700">
              Applied Date
            </th>

            <th className="px-6 py-5 text-left font-semibold text-gray-700">
              Resume
            </th>

            <th className="px-6 py-5 text-left font-semibold text-gray-700">
              Status
            </th>

            <th className="px-6 py-5 text-center font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr
              key={application._id}
              className="
                border-b
                hover:bg-green-50
                transition-all
                duration-300
              "
            >
              {/* Candidate */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                    {application?.applicant?.fullname?.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {application?.applicant?.fullname}
                    </h3>

                    <p className="text-xs text-gray-500">Job Applicant</p>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-green-600" />
                  {application?.applicant?.email}
                </div>
              </td>

              {/* Phone */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-green-600" />
                  {application?.applicant?.phoneNumber}
                </div>
              </td>

              {/* Date */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-gray-700">
                  <CalendarDays className="w-4 h-4 text-green-600" />

                  {application?.createdAt
                    ? new Date(application.createdAt).toLocaleDateString()
                    : "-"}
                </div>
              </td>

              {/* Resume */}
              <td className="px-6 py-5">
                {application?.applicant?.profile?.resume ? (
                  <a
                    href={application.applicant.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-xl
                      bg-green-100
                      text-green-700
                      font-semibold
                      hover:bg-green-200
                      transition-all
                    "
                  >
                    <FileText className="w-4 h-4" />
                    Resume
                  </a>
                ) : (
                  <span className="text-gray-400">No Resume</span>
                )}
              </td>

              {/* Status */}
              <td className="px-6 py-5">
                <span
                  className={`
    px-4 py-2 rounded-full text-sm font-semibold
    ${
      application?.status === "accepted"
        ? "bg-green-100 text-green-700"
        : application?.status === "rejected"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
    }
  `}
                >
                  {application?.status?.toUpperCase() || "PENDING"}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-5 text-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 rounded-xl hover:bg-gray-100 transition">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent align="end" className="w-56 p-2 rounded-2xl">
                    {/* Accept */}
                    <div
                      onClick={() => statusHandler("Accepted", application._id)}
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
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>

                      <div>
                        <p className="font-medium text-green-600">
                          Accept Applicant
                        </p>

                        <p className="text-xs text-gray-500">
                          Move to next round
                        </p>
                      </div>
                    </div>

                    <div className="my-2 border-t border-gray-100" />

                    {/* Reject */}
                    <div
                      onClick={() => statusHandler("Rejected", application._id)}
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
                        <XCircle className="w-4 h-4 text-red-600" />
                      </div>

                      <div>
                        <p className="font-medium text-red-600">
                          Reject Applicant
                        </p>

                        <p className="text-xs text-gray-500">
                          Mark as rejected
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
