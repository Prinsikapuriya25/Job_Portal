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

const ApplicantsTable = ({ applications, loading, onStatusChange }) => {
  const statusHandler = async (status, applicationId) => {
    try {
      const lowerStatus = status?.toLowerCase();
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        { status: lowerStatus },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(
          lowerStatus === "accepted"
            ? "✅ Applicant Accepted Successfully"
            : "❌ Applicant Rejected Successfully",
        );
        onStatusChange?.();
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
      <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl border border-gray-100 p-10 sm:p-16 md:p-20 text-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-gray-500 font-medium text-sm sm:text-base">
          Loading Applicants...
        </p>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl border border-gray-100 p-10 sm:p-16 md:p-20 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-6 text-gray-900">
          No Applicants Yet
        </h2>
        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
          Share this job and attract more candidates.
        </p>
      </div>
    );
  }

  const StatusBadge = ({ status }) => {
    const normalizedStatus = status?.toLowerCase();
    return (
      <span
        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
          ${
            normalizedStatus === "accepted"
              ? "bg-green-100 text-green-700"
              : normalizedStatus === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
      >
        {normalizedStatus?.toUpperCase() || "PENDING"}
      </span>
    );
  };

  const ActionPopover = ({ applicationId }) => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 rounded-xl hover:bg-gray-100 transition">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 sm:w-56 p-2 rounded-2xl">
        <button
          type="button"
          onClick={() => statusHandler("Accepted", applicationId)}
          className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-green-50 transition-all"
        >
          <div className="p-2 rounded-lg bg-green-100 flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-green-600 text-sm">
              Accept Applicant
            </p>
            <p className="text-xs text-gray-500">Move to next round</p>
          </div>
        </button>
        <div className="my-2 border-t border-gray-100" />
        <button
          type="button"
          onClick={() => statusHandler("Rejected", applicationId)}
          className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-all"
        >
          <div className="p-2 rounded-lg bg-red-100 flex-shrink-0">
            <XCircle className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <p className="font-medium text-red-600 text-sm">Reject Applicant</p>
            <p className="text-xs text-gray-500">Mark as rejected</p>
          </div>
        </button>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
      {/* ── Desktop Table (md+) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <tr>
              {[
                "Candidate",
                "Email",
                "Phone",
                "Applied Date",
                "Resume",
                "Status",
                "Actions",
              ].map((col, i) => (
                <th
                  key={col}
                  className={`px-6 py-5 font-semibold text-gray-700 text-sm ${
                    i === 6 ? "text-center" : "text-left"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-b hover:bg-green-50 transition-all duration-300"
              >
                {/* Candidate */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg flex-shrink-0">
                      {application?.applicant?.fullname?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {application?.applicant?.fullname}
                      </h3>
                      <p className="text-xs text-gray-500">Job Applicant</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="truncate max-w-[160px]">
                      {application?.applicant?.email}
                    </span>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                    {application?.applicant?.phoneNumber}
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <CalendarDays className="w-4 h-4 text-green-600 flex-shrink-0" />
                    {application?.createdAt
                      ? new Date(application.createdAt).toLocaleDateString()
                      : "-"}
                  </div>
                </td>

                {/* Resume */}
                <td className="px-6 py-5">
                  {application?.applicant?.profile?.resume ? (
                    <a
                      href={application?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-all text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No Resume</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <StatusBadge status={application?.status} />
                </td>

                {/* Actions */}
                <td className="px-6 py-5 text-center">
                  <ActionPopover applicationId={application._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile / Tablet Card Layout (< md) ── */}
      <div className="md:hidden divide-y divide-gray-100">
        {applications.map((application) => (
          <div
            key={application._id}
            className="p-4 sm:p-5 hover:bg-green-50 transition-all duration-200"
          >
            {/* Top row: avatar + name + actions */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-base sm:text-lg flex-shrink-0">
                  {application?.applicant?.fullname?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {application?.applicant?.fullname}
                  </h3>
                  <p className="text-xs text-gray-500">Job Applicant</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusBadge status={application?.status} />
                <ActionPopover applicationId={application._id} />
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                <Mail className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span className="truncate">
                  {application?.applicant?.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                <Phone className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>{application?.applicant?.phoneNumber || "—"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                <CalendarDays className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                <span>
                  {application?.createdAt
                    ? new Date(application.createdAt).toLocaleDateString()
                    : "—"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                {application?.applicant?.profile?.resume ? (
                  <a
                    href={application?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Resume
                  </a>
                ) : (
                  <span className="text-gray-400">No Resume</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsTable;
