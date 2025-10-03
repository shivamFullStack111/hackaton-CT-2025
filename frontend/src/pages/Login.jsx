
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Particles from "../components/Particles";

const Login = () => {



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