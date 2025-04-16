import { TextField, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { ToastContainer, toast } from "react-toastify";
import apiUrl from "../../utils/apiUrl";
import "./EditProfileInfoSection.css";

function EditProfileInfoSection() {
  return (
    <section className="edit-profile-section">
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
      <EditProfileCard />
    </section>
  );
}

function EditProfileCard() {
  const user = useUserStore((state) => state.user);

  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [occupation, setOccupation] = useState(user.occupation);
  const [bio, setBio] = useState(user.bio);
  const [secondaryEmail, setSecondaryEmail] = useState(user.secondaryEmail);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-profile-info"],
    mutationFn: async () => {
      const response = await axios.patch(
        `${apiUrl}/profile/update-profile-info`,
        { phoneNumber, occupation, bio, secondaryEmail },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success(
        "Your profile details were updated successfully. Redirecting to profile page.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setTimeout(() => navigate("/my-profile"), 3000);
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
    mutate();
  }

  return (
    <form onSubmit={handleSave} className="edit-profile-form">
      <div className="edit-profile-title-cont">
        <p className="edit-profile-main-title">Edit your profile information</p>
      </div>

      {formError && (
        <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
          {formError}
        </Alert>
      )}

      <TextField
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        variant="standard"
        label="phone number"
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        variant="standard"
        label="occupation"
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        variant="standard"
        label="bio"
        sx={{
          mb: "2rem",
          "& .MuiInputBase-input": { fontSize: "1.8rem" },
          "& .MuiInputLabel-root": { fontSize: "1.8rem" },
        }}
      />
      <TextField
        value={secondaryEmail}
        onChange={(e) => setSecondaryEmail(e.target.value)}
        variant="standard"
        label="secondary email"
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

export default EditProfileInfoSection;
