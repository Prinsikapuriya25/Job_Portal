import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link , useNavigate} from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice.js"; 
import { setUser } from "../../redux/authSlice.js";
import { useEffect } from "react";

const Login = () => {
  
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  

  const [input, setInput] = React.useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if(user){
      navigate("/")
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-emerald-200">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-green-100 shadow-2xl rounded-3xl p-8"
        >
          {/* HEADING */}

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              Login to continue your job journey 🚀
            </p>
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
            <Label className="text-gray-700 font-medium">Login As</Label>

            <RadioGroup className="flex items-center gap-4 mt-3">
              {/* STUDENT */}

              <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-2xl border border-green-200 hover:border-green-500 transition-all duration-300">
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

              <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-2xl border border-green-200 hover:border-green-500 transition-all duration-300">
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
              Login
            </Button>
          )}

          {/* SIGNUP */}

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
