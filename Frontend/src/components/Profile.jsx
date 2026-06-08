import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  Pencil,
  Download,
  CalendarDays,
} from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { USER_API_END_POINT } from "../utils/constant";

const Profile = () => {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* MAIN CARD */}

        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">
          {/* COVER */}

          <div className="h-56 sm:h-64 md:h-72 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>

            {/* EDIT BUTTON */}

            <Button
              onClick={() => setOpen(true)}
              size="icon"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-white text-green-600 hover:bg-green-100 shadow-xl"
            >
              <Pencil className="w-5 h-5" />
            </Button>
          </div>

          {/* CONTENT */}

          <div className="px-5 sm:px-8 lg:px-10 pb-10 relative">
            {/* TOP SECTION */}

            <div className="relative -mt-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              {/* LEFT */}

              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6">
                {/* PROFILE IMAGE */}

                <div className="relative shrink-0">
                  <div className="rounded-full p-2 bg-white shadow-2xl">
                    <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                  </div>

                  {/* ONLINE STATUS */}

                  <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                {/* USER INFO */}

                <div className="text-center lg:text-left pb-2 min-w-0">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight truncate">
                    {user?.fullname}
                  </h1>

                  <p className="text-base sm:text-lg font-semibold text-gray-600 mt-3">
                    {user?.profile?.bio || "MERN Stack Developer"}
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mt-5 text-gray-500 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="truncate">
                        {user?.profile?.location || "India"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-green-600" />
                      <span>
                        Joined{" "}
                        {new Date(user?.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT BUTTONS */}

              <div className="flex flex-col sm:flex-row items-stretch justify-center lg:justify-end gap-4">
                <Button
                  onClick={() => setOpen(true)}
                  className="w-full sm:w-auto rounded-2xl bg-green-600 hover:bg-green-700 px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Edit Profile
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:w-auto rounded-2xl border-gray-200 hover:border-green-600 hover:text-green-600 px-6 py-4"
                >
                  Share Profile
                </Button>
              </div>
            </div>

            {/* ABOUT */}

            <div className="mt-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                About
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
                {user?.profile?.bio || "No bio added yet."}
              </p>
            </div>

            {/* DETAILS */}

            <div className="grid grid-cols-1 gap-6 mt-14 md:grid-cols-2">
              {/* EMAIL */}

              <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Mail className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      {user?.email}
                    </h1>
                  </div>
                </div>
              </div>

              {/* PHONE */}

              <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <Phone className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      +91 {user?.phoneNumber}
                    </h1>
                  </div>
                </div>
              </div>

              {/* LOCATION */}

              <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <MapPin className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      {user?.profile?.location || "India"}
                    </h1>
                  </div>
                </div>
              </div>

              {/* EXPERIENCE */}

              <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <BriefcaseBusiness className="text-green-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Experience</p>

                    <h1 className="font-bold text-lg text-gray-900">
                      {user?.profile?.experience || "Fresher"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* SKILLS */}

            <div className="mt-14">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-green-600 w-7 h-7" />

                <h1 className="text-3xl font-bold text-gray-900">
                  Skills & Technologies
                </h1>
              </div>

              <div className="flex flex-wrap gap-3">
                {user?.profile?.skills?.length > 0 ? (
                  user?.profile?.skills?.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-green-100 text-green-700 hover:bg-green-200 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
              </div>
            </div>

            {/* RESUME */}

            <div className="mt-14">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Resume</h1>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-3xl p-6 sm:p-7 flex flex-col gap-6 shadow-lg md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {user?.profile?.resumeOriginalName || "Resume.pdf"}
                  </h1>

                  <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Updated recently • PDF Format
                  </p>
                </div>

                {user?.profile?.resume && (
                  <Button
                    className="w-full md:w-auto rounded-2xl bg-green-600 hover:bg-green-700 px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open(user?.profile?.resume, "_blank")}
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download Resume
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* APPLIED JOBS */}

          <div className="mt-16 px-5 sm:px-8 lg:px-10 pb-10">
            <AppliedJobTable />
          </div>

          {/* UPDATE DIALOG */}

          <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
