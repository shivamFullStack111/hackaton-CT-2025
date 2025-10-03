
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { useState } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { DB_URL } from "./utils";
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'
import { setUser } from "../store/userSlice";


const Login = () => {
  const [data, setdata] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!data?.email?.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!data.email.includes("@") || !data.email.includes(".")) {
      toast.error("Enter a valid email");
      return;
    }

    if (!data?.password?.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      const res = await axios.post(`${DB_URL}/user/login`, {
        email: data.email,
        password: data.password,
      });

      console.log(res.data)

      if (!res?.data?.success) {
        return toast.error(res?.data?.message)
      }
      Cookies.set("authToken", res?.data?.token, { expires: 7 });

      localStorage.setItem("user", JSON.stringify(res.data?.user));
      dispatch(setUser(res.data?.user))


      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div className="min-h-screen relative w-full flex justify-center items-center">
        <Particles
          className={"h-screen fixed top-0 right-0 w-full "}
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          alphaParticles={false}
          disableRotation={false}
        />

        {/* Login Card */}
        <div className="w-[60vw] p-6 max-w-[600px]  h-[90vh]  max-h-[600px] flex flex-col justify-center items-center">
          <p className="text-white font-semibold text-3xl">Sign In</p>

          {/* Email Field */}
          <div className="w-[80%] mt-6">
            <TextField
              id="outlined-email"
              onChange={(e) => {
                setdata(p => ({ ...p, email: e.target.value }))
              }}
              value={data?.email}
              label="Email"
              type="email"
              variant="outlined"

              className="w-full"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#fff',
                  transition: 'all 0.3s ease',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#25D9C6',
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#fff' },
                  '&:hover fieldset': { borderColor: '#25D9C6' },
                  '&.Mui-focused fieldset': { borderColor: '#25D9C6' },
                },
              }}

            />
          </div>

          <div className="w-[80%] mt-6">
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              onChange={(e) => {
                setdata(p => ({ ...p, password: e.target.value }))
              }}
              value={data?.password}
              autoComplete="current-password"
              variant="outlined"
              className="w-full"
              sx={{
                '& .MuiInputLabel-root': {
                  color: '#fff',
                  transition: 'all 0.3s ease',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#25D9C6', // Focus hone pe teal ho jaye
                },
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#fff' },
                  '&:hover fieldset': { borderColor: '#25D9C6' },
                  '&.Mui-focused fieldset': { borderColor: '#25D9C6' },
                },
              }}

            />
          </div>

          <div className="w-[80%] mt-8">
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              style={{
                backgroundColor: "#25D9C6",
                color: "#000",
                fontWeight: "bold",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Sign In
            </Button>
          </div>

          <p className="text-white z-20 mt-8">
            Not have an account?{" "}
            <Link to="/register" className="text-[#25D9C6] cursor-pointer underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;