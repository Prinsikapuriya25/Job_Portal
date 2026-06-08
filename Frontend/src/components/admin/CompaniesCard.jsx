import React from "react";
import {
  Building2,
  MapPin,
  Globe,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";

const CompaniesCard = ({ company }) => {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  // DELETE COMPANY
  const deleteCompanyHandler = async () => {
    try {
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${company._id}`,
        {
          withCredentials: true,
        },
      );

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
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* TOP */}
      <div className="h-24 sm:h-28 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 relative">
        <div className="absolute -bottom-8 sm:-bottom-10 left-4 sm:left-6 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center p-3 sm:p-4 border-4 border-white overflow-hidden">
          {/* LOGO */}
          {company?.logo ? (
            <img
              src={company.logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <Building2 className="w-10 h-10 text-gray-400" />
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              {company?.name}
            </h1>

            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>{company?.location || "Location not available"}</span>
            </div>
          </div>

          <Building2 className="text-green-600 w-6 h-6" />
        </div>

        {/* WEBSITE */}
        <div className="mt-5 flex items-center gap-2 text-sm text-gray-600 break-words max-w-full">
          <Globe className="w-4 h-4 text-green-600" />

          {company?.website ? (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-600 truncate block max-w-[160px] sm:max-w-[220px] md:max-w-[300px]"
            >
              {company.website}
            </a>
          ) : (
            "Website not available"
          )}
        </div>

        {/* DATE */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <CalendarDays className="w-4 h-4 text-green-600" />
          Added on{" "}
          {company?.createdAt
            ? new Date(company.createdAt).toLocaleDateString()
            : "N/A"}
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
          {/* EDIT BUTTON */}
          <Button
            variant="outline"
            className="w-full sm:flex-1 sm:w-auto rounded-2xl border-gray-300 hover:border-green-600 hover:text-green-600"
            onClick={() => navigate(`/admin/companies/${company._id}`)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>

          {/* DELETE BUTTON */}
          <Button
            variant="outline"
            onClick={deleteCompanyHandler}
            className="w-full sm:w-auto rounded-2xl border-red-200 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCard;
