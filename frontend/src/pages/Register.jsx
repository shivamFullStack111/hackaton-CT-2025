import React, { useState } from "react";
import Particles from "../components/Particles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom"; // if you're using react-router
import toast from "react-hot-toast";
import Cookies from 'js-cookie'
import { DB_URL } from "../utils";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../store/userSlice";


const Register = () => {
    const [data, setdata] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSubmit = async () => {
        try {
            if (!data?.name?.trim()) {
                toast.error("Name is required");
                return;
            }

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

            if (data.password.length < 6) {
                toast.error("Password must be at least 6 characters");
                return;
            }

            const res = await axios.post(`${DB_URL}/user/register`, data)

            if (!res?.data?.success) {
                return toast.error(res?.data?.message)
            }

            Cookies.set("authToken", res?.data?.token, { expires: 7 });

            localStorage.setItem("user", JSON.stringify(res.data?.user));
            dispatch(setUser(res.data?.user))//  setting user to global state 
            toast.success("Registration Successful");
            navigate("/");
        } catch (error) {
            toast.error(error.message);

        }
    };

    return (
        <div className="min-h-screen relative w-full flex justify-center items-center">
            {/* Background Particles */}
            <Particles
                className={"h-screen fixed top-0 right-0 w-full "}
                particleColors={["#25D9C6", "#fff"]}
                particleCount={300}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                alphaParticles={false}
                disableRotation={false}
            />

            {/* Register Card */}
            <div className="w-[60vw] p-6 max-w-[600px]  h-[90vh]  max-h-[600px] flex flex-col justify-center items-center">
                <p className="text-white font-semibold text-3xl">Sign Up</p>

                {/* Email Field */}
                <div className="w-[80%] mt-6">
                    <TextField
                        onChange={(e) => { setdata(p => ({ ...p, name: e.target.value })) }}
                        value={data?.name}
                        id="outlined-email"
                        label="Name"
                        type="text"
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
                                '& fieldset': { borderColor: '#fff' }, // default white
                                '&:hover fieldset': { borderColor: '#25D9C6' }, // hover teal
                                '&.Mui-focused fieldset': { borderColor: '#25D9C6' }, // focus teal
                            },
                        }}

                    />
                </div>

                {/* Email Field */}
                <div className="w-[80%] mt-6">
                    <TextField
                        onChange={(e) => { setdata(p => ({ ...p, email: e.target.value })) }}
                        value={data?.email}
                        id="outlined-email"
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
                                color: '#25D9C6', // Focus hone pe teal ho jaye
                            },
                            '& .MuiInputBase-input': { color: '#fff' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fff' }, // default white
                                '&:hover fieldset': { borderColor: '#25D9C6' }, // hover teal
                                '&.Mui-focused fieldset': { borderColor: '#25D9C6' }, // focus teal
                            },
                        }}

                    />
                </div>

                {/* Password Field */}
                <div className="w-[80%] mt-6">
                    <TextField
                        onChange={(e) => { setdata(p => ({ ...p, password: e.target.value })) }}
                        value={data?.password}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
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
                                '& fieldset': { borderColor: '#fff' }, // default white
                                '&:hover fieldset': { borderColor: '#25D9C6' }, // hover teal
                                '&.Mui-focused fieldset': { borderColor: '#25D9C6' }, // focus teal
                            },
                        }}

                    />
                </div>

                {/* Submit Button */}
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
                        Sign Up
                    </Button>
                </div>

                {/* Signup Link */}
                <p className="text-white z-20 mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#25D9C6] cursor-pointer underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;