import React, { useState } from "react";

import Navbar from "../shared/Navbar";

import { Input } from "../ui/input";

import { Button } from "../ui/button";

import {
  Building2,
  Globe,
  MapPin,
  FileText,
  Upload,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { setSingleCompany } from "@/redux/companySlice";

import { useDispatch } from "react-redux";

import axios from "axios";

import { toast } from "sonner";

import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompanyCreate = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    location: "",
    description: "",
    logo: null,
  });

  // INPUT CHANGE

  const changeHandler = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  // FILE CHANGE

  const fileHandler = (e) => {
    setCompanyData({
      ...companyData,
      logo: e.target.files?.[0],
    });
  };

  // CREATE COMPANY

  const registerNewCompany = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", companyData.name);

    formData.append("website", companyData.website);

    formData.append("location", companyData.location);

    formData.append("description", companyData.description);

    if (companyData.logo) {
      formData.append("file", companyData.logo);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));

        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;

        navigate(`/admin/companies`);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* BACK BUTTON */}

        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="rounded-2xl mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* CARD */}

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* TOP SECTION */}

          <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 px-10 py-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Building2 className="w-10 h-10 text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold text-white">
                  Create Company
                </h1>

                <p className="text-green-100 mt-2 text-lg">
                  Add your company information professionally
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form onSubmit={registerNewCompany} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* COMPANY NAME */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-green-600" />
                  Company Name
                </label>

                <Input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={changeHandler}
                  placeholder="Enter company name"
                  className="rounded-2xl h-12"
                />
              </div>

              {/* WEBSITE */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-green-600" />
                  Website
                </label>

                <Input
                  type="text"
                  name="website"
                  value={companyData.website}
                  onChange={changeHandler}
                  placeholder="www.company.com"
                  className="rounded-2xl h-12"
                />
              </div>

              {/* LOCATION */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  Location
                </label>

                <Input
                  type="text"
                  name="location"
                  value={companyData.location}
                  onChange={changeHandler}
                  placeholder="Enter location"
                  className="rounded-2xl h-12"
                />
              </div>

              {/* LOGO */}

              <div className="space-y-3">
                <label className="font-semibold text-gray-700 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-green-600" />
                  Company Logo
                </label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={fileHandler}
                  className="rounded-2xl h-12 cursor-pointer"
                />
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-8 space-y-3">
              <label className="font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                Company Description
              </label>

              <textarea
                rows={6}
                name="description"
                value={companyData.description}
                onChange={changeHandler}
                placeholder="Write something about your company..."
                className="w-full rounded-3xl border border-gray-200 p-5 resize-none outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* BUTTONS */}

            <div className="flex items-center justify-end gap-4 mt-10">
              <Button
                onClick={() => navigate("/admin/companies")}
                type="button"
                variant="outline"
                className="rounded-2xl px-8"
              >
                Cancel
              </Button>

              {loading ? (
                <Button
                  disabled
                  className="bg-green-600 rounded-2xl px-10 py-6"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 rounded-2xl px-10 py-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Create Company
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
