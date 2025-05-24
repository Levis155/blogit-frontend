import { TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "./SignupSection.css";
import apiUrl from "../../utils/apiUrl";

function SignupSection() {
  return (
    <section className="signup-section">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <SignupCard />
    </section>
  );
}

function SignupCard() {
  const [formData, setFormData] = useState({firstName: "", lastName: "", emailAddress:"", userName:"", password:"", confirmedPassword:""})
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async () => {
      const response = await axios.post(`${apiUrl}/auth/register`, formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful! Redirecting to signin page...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => navigate("/signin"), 3000);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong.");
      }
    },
  });

  function handleOnchange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleRegister(e) {
    e.preventDefault();
    setFormError(null);
    if (formData.password !== formData.confirmedPassword) {
      setFormError("Password and confirmed password don't match!");
      return;
    }

    mutate();
  }

  return (
    <form className="signup-form" onSubmit={handleRegister}>
      <div className="signup-title-cont">
        <p className="signup-main-title">create account</p>
        <p className="signup-subtitle">
          Already have an account? <Link to="/signin">sign in!</Link>
        </p>
      </div>
      {formError && (
        <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
          {formError}
        </Alert>
      )}
      <TextField
        variant="standard"
        label="First Name"
        required
        value={formData.firstName}
        name="firstName"
        onChange={handleOnchange}
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        variant="standard"
        label="Last Name"
        required
        value={formData.lastName}
        name="lastName"
        onChange={handleOnchange}
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        variant="standard"
        label="Email"
        required
        value={formData.emailAddress}
        name="emailAddress"
        onChange={handleOnchange}
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        variant="standard"
        label="Username"
        required
        value={formData.userName}
        name="userName"
        onChange={handleOnchange}
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        variant="standard"
        type="password"
        label="Password"
        required
        value={formData.password}
        name="password"
        onChange={handleOnchange}
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        variant="standard"
        type="password"
        label="Confirm Password"
        required
        value={formData.confirmedPassword}
        name="confirmedPassword"
        onChange={handleOnchange}
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <button disabled={isPending}>
        {isPending ? "please wait..." : "create account"}
      </button>
    </form>
  );
}

export default SignupSection;
