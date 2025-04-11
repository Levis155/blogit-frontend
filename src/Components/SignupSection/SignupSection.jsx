import { TextField } from "@mui/material";
import "./SignupSection.css";

function SignupSection() {
  return (
    <section className="signup-section">
        <SignupCard />
    </section>
  )
}

function SignupCard() {
    return(
        <form className="signup-form">
            <div className="signup-title-cont">
                <p className="signup-main-title">Sign up</p>
                <p className="signup-subtitle">Already have an account? <a href="">Log in!</a></p>
            </div>
            <TextField variant="standard" label="First Name" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
            <TextField variant="standard" label="Last Name" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
            <TextField variant="standard" label="Email" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
            <TextField variant="standard" label="Username" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
            <TextField variant="standard" type="password" label="Password" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
            <TextField variant="standard" type="password" label="Confirm Password" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
            <button>Create Account</button>
        </form>
    )
}


export default SignupSection
