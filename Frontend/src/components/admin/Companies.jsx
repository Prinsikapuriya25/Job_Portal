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

  const filteredCompanies = companies.filter((company) =>
    (company.name || "").toLowerCase().includes(searchCompany.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* HEADER */}
        <div className="bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-lg border border-gray-100 mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            {/* LEFT */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Companies
              </h1>
              <p className="text-gray-500 mt-1 sm:mt-2 md:mt-3 text-sm sm:text-base md:text-lg">
                Manage and monitor all registered companies
              </p>
            </div>

            {/* RIGHT */}
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 rounded-xl sm:rounded-2xl px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Plus className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Add New Company
            </Button>
          </div>

          {/* SEARCH */}
          <div className="mt-4 sm:mt-6 md:mt-8 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* LOADER */}
        {loading ? (
          <div className="flex items-center justify-center h-[40vh] sm:h-[50vh]">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600 animate-spin" />
          </div>
        ) : filteredCompanies.length <= 0 ? (
          <div className="flex items-center justify-center h-[40vh] sm:h-[50vh]">
            <div className="text-center px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
                No Companies Found
              </h1>
              <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">
                Try searching with another keyword
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
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
