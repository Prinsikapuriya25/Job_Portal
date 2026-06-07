import React from "react";
import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Badge } from "./ui/badge";

import { CalendarDays, Briefcase, Building2, FileSearch } from "lucide-react";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
      {/* HEADER */}

      <div className="px-8 py-6 border-b bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Applied Jobs</h2>

          <p className="text-gray-500 mt-1">Track all your job applications</p>
        </div>

        <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
          {allAppliedJobs?.length || 0} Applications
        </div>
      </div>

      {!allAppliedJobs || allAppliedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <FileSearch className="w-12 h-12 text-green-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mt-6">
            No Applications Found
          </h3>

          <p className="text-gray-500 mt-2">
            You haven't applied for any jobs yet.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                Date
              </TableHead>

              <TableHead className="font-semibold text-gray-700">
                Job Role
              </TableHead>

              <TableHead className="font-semibold text-gray-700">
                Company
              </TableHead>

              <TableHead className="text-right font-semibold text-gray-700">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAppliedJobs?.map((appliedJob) => (
              <TableRow
                key={appliedJob._id}
                className="hover:bg-green-50 transition-all duration-300"
              >
                <TableCell>
                  <div className="flex items-center gap-2 text-gray-700">
                    <CalendarDays className="w-4 h-4 text-green-600" />
                    {appliedJob?.createdAt?.split("T")[0]}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-gray-900">
                      {appliedJob?.job?.title}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">
                      {appliedJob?.job?.company?.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={`
                px-4 py-2 rounded-full text-white font-medium
                ${
                  appliedJob?.status === "rejected"
                    ? "bg-red-500"
                    : appliedJob?.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }
              `}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AppliedJobTable;
