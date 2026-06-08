import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js";
import { useEffect } from "react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  // INPUT CHANGE

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // FILE CHANGE

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  // SUBMIT

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-emerald-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-8 sm:py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-2xl bg-white border border-green-100 shadow-2xl rounded-3xl p-6 sm:p-8"
        >
          {/* HEADING */}

          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Join JobPortal and start your career journey 🚀
            </p>
          </div>

          {/* FULL NAME */}

          <div className="mb-5">
            <Label className="text-gray-700 font-medium">Full Name</Label>

            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Prinsi Kapuriya"
              className="mt-2 rounded-2xl h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-green-500"
            />
          </div>

          {/* EMAIL */}

          <div className="mb-5">
            <Label className="text-gray-700 font-medium">Email</Label>

            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="prinsi@gmail.com"
              className="mt-2 rounded-2xl h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-green-500"
            />
          </div>

          {/* PHONE */}

          <div className="mb-5">
            <Label className="text-gray-700 font-medium">Phone Number</Label>

            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="8200572152"
              className="mt-2 rounded-2xl h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-green-500"
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-5">
            <Label className="text-gray-700 font-medium">Password</Label>

            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-2 rounded-2xl h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-green-500"
            />
          </div>

          {/* ROLE */}

          <div className="mb-6">
            <Label className="text-gray-700 font-medium">Register As</Label>

            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
              {/* STUDENT */}

              <div className="flex items-center justify-between sm:justify-start gap-2 bg-green-50 px-4 py-3 rounded-2xl border border-green-200 hover:border-green-500 transition-all duration-300 w-full sm:w-auto">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4"
                />

                <Label className="cursor-pointer">Student</Label>
              </div>

              {/* RECRUITER */}

              <div className="flex items-center justify-between sm:justify-start gap-2 bg-green-50 px-4 py-3 rounded-2xl border border-green-200 hover:border-green-500 transition-all duration-300 w-full sm:w-auto">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4"
                />

                <Label className="cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* FILE */}

          <div className="mb-6">
            <Label className="text-gray-700 font-medium">Profile Photo</Label>

            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="mt-2 rounded-2xl h-12 border-gray-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-green-500 w-full"
            />
          </div>

          {/* BUTTON */}

          {loading ? (
            <Button className="w-full rounded-2xl h-12 bg-green-600 hover:bg-green-700 shadow-lg">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-2xl h-12 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Signup
            </Button>
          )}

          {/* LOGIN */}

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
