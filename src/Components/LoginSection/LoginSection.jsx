import { TextField } from "@mui/material";
import "./LoginSection.css";

function LoginSection() {
  return (
    <section className="login-section">
        <LoginCard />
    </section>
  )
}

function LoginCard() {
    return(
        <form className="login-form">
            <div className="login-title-cont">
                <p className="login-main-title">Sign in</p>
                <p className="login-subtitle">No account? <a href="">Create one!</a></p>
            </div>
            <TextField variant="standard" label="Username or Email" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
            <TextField variant="standard" type="password" label="Password" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
            <button>Sign in</button>
        </form>
    )
}


export default LoginSection
