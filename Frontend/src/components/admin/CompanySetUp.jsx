import React, { useEffect, useState } from "react";
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
  Save,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetUp = () => {
  const navigate = useNavigate();

  const params = useParams();

  const companyId = params.id;
  useGetCompanyById(companyId);

  const [loading, setLoading] = useState(false);

  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    location: "",
    description: "",
    file: null,
    logo: "",
  });

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          setCompanyData({
            name: res.data.company.name || "",

            website: res.data.company.website || "",

            location: res.data.company.location || "",

            description: res.data.company.description || "",

            logo: res.data.company.logo || "",

            file: null,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId]);

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
      file: e.target.files?.[0],
    });
  };

  // UPDATE COMPANY

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", companyData.name);

    formData.append("website", companyData.website);

    formData.append("location", companyData.location);

    formData.append("description", companyData.description);

    if (companyData.file) {
      formData.append("file", companyData.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
        {/* BACK BUTTON */}

        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="rounded-2xl mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* MAIN CARD */}

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          {/* TOP SECTION */}

          <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 px-6 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* LOGO */}

              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-white shadow-2xl overflow-hidden border-4 border-white flex items-center justify-center">
                {companyData.file ? (
                  <img
                    src={URL.createObjectURL(companyData.file)}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                ) : companyData.logo ? (
                  <img
                    src={companyData.logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-10 h-10 text-green-600" />
                )}
              </div>

              {/* TEXT */}

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Company Setup
                </h1>

                <p className="text-green-100 mt-2 text-sm sm:text-lg">
                  Update your company information professionally
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form onSubmit={submitHandler} className="p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                  className="rounded-2xl h-12 w-full"
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
                  className="rounded-2xl h-12 w-full"
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
                  className="rounded-2xl h-12 w-full"
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
                  className="rounded-2xl h-12 cursor-pointer w-full"
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
                rows={5}
                name="description"
                value={companyData.description}
                onChange={changeHandler}
                placeholder="Write something about your company..."
                className="w-full rounded-3xl border border-gray-200 p-4 sm:p-5 resize-none outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-3 mt-6 sm:mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto rounded-2xl px-4 py-3"
              >
                Cancel
              </Button>

              {loading ? (
                <Button
                  disabled
                  className="w-full sm:w-auto bg-green-600 rounded-2xl px-6 py-3"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 rounded-2xl px-6 py-3 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanySetUp;
