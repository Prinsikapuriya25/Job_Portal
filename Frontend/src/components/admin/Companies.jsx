import React, { useEffect, useState } from "react";

import Navbar from "../shared/Navbar";

import { Plus, Search, Loader2 } from "lucide-react";

import { Button } from "../ui/button";

import CompaniesCard from "./CompaniesCard";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { COMPANY_API_END_POINT } from "@/utils/constant";

import { toast } from "sonner";

const Companies = () => {
  const [searchCompany, setSearchCompany] = useState("");

  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FETCH COMPANIES

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message || "Failed to fetch companies",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // SEARCH FILTER

  const filteredCompanies = companies.filter((company) =>
    company.name?.toLowerCase().includes(searchCompany.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HEADER */}

        <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* LEFT */}

            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                Companies
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Manage and monitor all registered companies
              </p>
            </div>

            {/* RIGHT */}

            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="bg-green-600 hover:bg-green-700 rounded-2xl px-8 py-7 text-base shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="mr-2 w-5 h-5" />
              Add New Company
            </Button>
          </div>

          {/* SEARCH */}

          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-green-600" />

            <input
              type="text"
              placeholder="Search companies..."
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        {/* LOADER */}

        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
          </div>
        ) : filteredCompanies.length <= 0 ? (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-400">
                No Companies Found
              </h1>

              <p className="text-gray-500 mt-3">
                Try searching with another keyword
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCompanies.map((company) => (
              <CompaniesCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
