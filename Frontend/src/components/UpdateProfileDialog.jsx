import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  User,
  Mail,
  Phone,
  FileText,
  Code2,
  UploadCloud,
  Loader2,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        toast.success(res.data.message);

        setOpen(false);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-[800px] w-[95vw] sm:w-[85vw] border-0 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-10 overflow-hidden">
          {/* HEADER */}

          <div className="text-center bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 px-6 py-4 sm:px-12 sm:py-5 rounded-[20px]">
            <DialogHeader>
              <DialogTitle className="text-4xl font-bold text-white">
                Update Profile
              </DialogTitle>
            </DialogHeader>

            <p className="text-green-100 mt-2 text-lg">
              Keep your profile updated and professional.
            </p>
          </div>

          {/* FORM */}

          <form className="px-4 py-3" onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-6 mt-5 py-3 sm:grid-cols-2">
              {/* LEFT */}

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullname"
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    <User className="w-4 h-4 text-green-600" />
                    Full Name
                  </Label>

                  <Input
                    id="fullname"
                    name="fullname"
                    value={input.fullname}
                    placeholder="Enter full name"
                    onChange={changeEventHandler}
                    className="h-11 rounded-2xl border-gray-200 text-base px-5 focus-visible:ring-2 focus-visible:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    <Mail className="w-4 h-4 text-green-600" />
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="Enter email"
                    className="h-11 rounded-2xl border-gray-200 text-base px-5 focus-visible:ring-2 focus-visible:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    <Phone className="w-4 h-4 text-green-600" />
                    Phone Number
                  </Label>

                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    placeholder="Enter phone number"
                    className="h-11 rounded-2xl border-gray-200 text-base px-5 focus-visible:ring-2 focus-visible:ring-green-500"
                  />
                </div>
              </div>

              {/* RIGHT */}

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    <FileText className="w-4 h-4 text-green-600" />
                    Professional Bio
                  </Label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    rows={3}
                    placeholder="Write something about yourself..."
                    className="w-full rounded-2xl border border-gray-200 p-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="skills"
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    <Code2 className="w-4 h-4 text-green-600" />
                    Skills & Technologies
                  </Label>

                  <Input
                    id="skills"
                    placeholder="React.js, Node.js"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    className="h-11 rounded-2xl border-gray-200 text-base px-5 focus-visible:ring-2 focus-visible:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="file"
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    <UploadCloud className="w-4 h-4 text-green-600" />
                    Upload Resume
                  </Label>

                  <Input
                    id="file"
                    name="file"
                    type="file"
                    onChange={fileChangeHandler}
                    accept="application/pdf"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* FOOTER */}

            <DialogFooter>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 mt-8 w-full">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="outline"
                  className="w-full sm:w-auto h-11 px-8 rounded-2xl border-gray-300 hover:border-red-400 hover:text-red-500"
                >
                  Cancel
                </Button>

                {loading ? (
                  <Button
                    disabled
                    className="w-full sm:w-auto h-11 px-8 rounded-2xl bg-green-600 hover:bg-green-700"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full sm:w-auto h-11 px-8 rounded-2xl bg-green-600 hover:bg-green-700 shadow-lg"
                  >
                    Save Changes
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
