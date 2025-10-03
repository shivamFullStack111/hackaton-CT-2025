
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Particles from "../components/Particles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Register = () => {
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

                    <div className="w-[80%] mt-6">
                        <TextField
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
                            }} id="demo-simple-select-label">Type of Institution</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Type of Institution"
                            // onChange={handleChange}
                            >
                                <MenuItem value={"college"}>College</MenuItem>
                                <MenuItem value={"school"}>School</MenuItem>
                            </Select>
                        </FormControl>

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
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="Type of Institution"
                            // onChange={handleChange}
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