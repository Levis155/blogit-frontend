import { TextField, Alert } from "@mui/material";
import "./EditPasswordSection.css";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useUserStore from "../../stores/userStore";
import apiUrl from "../../utils/apiUrl";

function EditPasswordSection() {
  return (
    <section className="edit-password-section">
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
      <EditPasswordCard />
    </section>
  );
}

function EditPasswordCard() {
  const removeUserInfo = useUserStore((state) => state.removeUserInfo);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async () => {
      const response = await axios.patch(
        `${apiUrl}/profile/update-password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success(
        "Your password was updated successfully. New log in is required",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => {
            handleLogout();
            navigate("/");
          },
        }
      );
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong.");
      }
    },
  });

  function handleSave(e) {
    e.preventDefault();
    setFormError(null);
    if (newPassword !== confirmedPassword) {
      setFormError("New password and confirmed password must match");
      return;
    }
    mutate();
  }

  function handleLogout() {
    removeUserInfo();
  }

  return (
    <form className="edit-password-form" onSubmit={handleSave}>
      <div className="edit-password-title-cont">
        <p className="edit-password-main-title">change your password</p>
      </div>

      {formError && (
        <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
          {formError}
        </Alert>
      )}

      <TextField
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        variant="standard"
        type="password"
        label="old password"
        required
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        variant="standard"
        type="password"
        label="new password"
        required
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
        variant="standard"
        type="password"
        label="confirm new password"
        required
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <button disabled={isPending}>{isPending ? "please wait" : "save"}</button>
    </form>
  );
}

export default EditPasswordSection;
