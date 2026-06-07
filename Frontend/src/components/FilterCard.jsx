import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { MapPin, Briefcase, X, IndianRupee } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin className="w-4 h-4 text-green-600" />,
    array: ["Ahmedabad", "Bombay", "Gandhinagar", "Surat", "Rajkot"],
  },

  {
    filterType: "Job Role",
    icon: <Briefcase className="w-4 h-4 text-green-600" />,
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "React Developer",
      "Node Developer",
    ],
  },

  {
    filterType: "Salary",
    icon: <IndianRupee className="w-4 h-4 text-green-600" />,
    array: ["0 - 3 LPA", "3 - 5 LPA", "5 - 10 LPA", "10 - 20 LPA", "20+ LPA"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
  };

  useEffect(() => {
    
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-6">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-2xl text-gray-900">Filter Jobs</h1>

        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-red-500 text-sm font-medium hover:text-red-600"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <hr className="mb-6" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {data.icon}

              <h2 className="font-semibold text-lg text-gray-800">
                {data.filterType}
              </h2>
            </div>

            <div className="space-y-3">
              {data.array.map((item, idx) => {
                const itemId = `${index}-${idx}`;

                return (
                  <div
                    key={itemId}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-green-50 px-3 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <RadioGroupItem value={item} id={itemId} />

                    <Label
                      htmlFor={itemId}
                      className="cursor-pointer text-sm font-medium w-full"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
