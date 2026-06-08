import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

import { Button } from "./ui/button";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { setSearchedQuery } from "../redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Product Manager",
  "UI/UX Designer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "Cloud Computing",
  "Blockchain Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));

    navigate("/browse");
  };

  return (
    <div className="py-8 sm:py-10">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="flex justify-center px-2 sm:px-0">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full max-w-xl rounded-full px-4 py-4 sm:px-6 sm:py-5 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 shadow-sm sm:shadow-md hover:shadow-xl text-sm sm:text-base text-center whitespace-normal leading-6"
                >
                  <span className="block truncate">{cat}</span>
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-4 sm:px-0">
          <CarouselPrevious className="w-full sm:w-auto" />
          <CarouselNext className="w-full sm:w-auto" />
        </div>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
