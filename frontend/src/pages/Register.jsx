
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Particles from "../components/Particles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { } from 'react-hot-toast'
import axios from 'axios'
import { DB_URL } from "./utils";
import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'
import { setUser } from "../store/userSlice";

const Register = () => {
    const [data, setdata] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()




    const handleSubmit = async () => {
        if (!data?.email?.trim()) {
            toast.error("Email is required");
            return;
        }
        if (!data?.institutionType) {
            toast.error("Institution type is required");
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
            const res = await axios.post(`${DB_URL}/user/register`, {
                email: data?.email,
                password: data?.password,
                role: data?.role,
                institutionType: data?.institutionType
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

                <div className="w-[60vw] p-6 max-w-[600px]  h-[90vh]  max-h-[600px] flex flex-col justify-center items-center">
                    <p className="text-white font-semibold text-3xl">Sign Up</p>

                    <div className="w-[80%] ">
                        <div className=" gap-12  w-[60] grid grid-cols-2  mt-6">
                            <div className="bg-purple-500 border-6 text-center text-white rounded-lg px-3 py-3">College</div>
                            <div className="bg-purple-500 text-center text-white rounded-lg px-3 py-3">School</div>
                        </div>


                    </div>

                    <div className="w-[80%] mt-6">
                        <TextField
                            id="outlined-email"

                            label="Name"
                            type="text"
                            variant="outlined"
                            onChange={(e) => {
                                setdata(p => ({ ...p, name: e.target.value }))
                            }}
                            value={data?.name}
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





                    <div className="w-[80%]  mt-6">

                        <FormControl sx={{
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
                        }} fullWidth>
                            <InputLabel sx={{
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
                            }} id="demo-simple-select-label">User Role</InputLabel>
                            <Select
                                disabled={data?.institutionType == "college"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="User Role"
                                onChange={(e) => {
                                    setdata(p => ({ ...p, role: e.target.value }))
                                }}
                                value={data?.role}
                            >
                                <MenuItem value={"student"}>Student</MenuItem>
                                <MenuItem value={"teacher"}>Teacher</MenuItem>
                            </Select>
                        </FormControl>

                    </div>

                    <div className="w-[80%] mt-6">
                        <TextField
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
                            Sign Up
                        </Button>
                    </div>

                    <p className="text-white z-20 mt-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#25D9C6] cursor-pointer underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;