import { TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import useUserStore from "../../stores/userStore";
import "./LoginSection.css";
import apiUrl from "../../utils/apiUrl";

function LoginSection() {
  return (
    <section className="login-section">
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
      <LoginCard />
    </section>
  );
}

function LoginCard() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const setUserInformation = useUserStore((state) => state.setUserInfo);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["user-login"],
    mutationFn: async () => {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        { identifier, password },
        {withCredentials: true}
      );
      return response.data;
    },
    onSuccess: (data) => {
      setUserInformation(data);
      toast.success("Login successful! Redirecting to blogs page.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => navigate("/all-blogs"), 3000);
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

  function handleLogin(e) {
    setFormError(null);
    e.preventDefault();
    mutate();
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <div className="login-title-cont">
        <p className="login-main-title">Sign in</p>
        <p className="login-subtitle">
          No account? <Link to="/signup">Create one!</Link>
        </p>
      </div>
      {formError && (
        <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
          {formError}
        </Alert>
      )}
      <TextField
        variant="standard"
        label="Username or Email"
        required
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <button disabled={isPending}>
        {isPending ? "please wait..." : "sign in"}
      </button>
    </form>
  );
}

export default LoginSection;
