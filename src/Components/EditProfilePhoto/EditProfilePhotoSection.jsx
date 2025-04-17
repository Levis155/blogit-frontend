import { FiUpload } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";
import "./EditProfilePhotoSection.css";

function EditProfilePhotoSection() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [uploadError, setUploadError] = useState(null);
  const [uploadingImg, setUploadingImg] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      const response = await axios.patch(
        `${apiUrl}/profile/update-profile-photo`,
        { profilePhotoUrl },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Updated profile photo successfully.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => navigate("/my-profile"), 3000);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response.data.message;
        setUploadError(serverMessage);
      } else {
        setUploadError("Something went wrong.");
      }
    },
  });

  function handleSave(e) {
    e.preventDefault();
    setUploadError(null);
    if (!profilePhotoUrl) {
      setUploadError("No photo was found.");
      return;
    }
    mutate();
  }

  return (
    <section className="edit-profile-photo-section">
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
      <div className="edit-profile-photo-container">
        <div className="icon-cont">
          <FiUpload />
        </div>
        {uploadError && (
          <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
            {uploadError}
          </Alert>
        )}
        <p className="upload-title">Upload a photo of yourself.</p>
        <div className="input">
          <p>{uploadingImg}</p>
          <input
            type="file"
            className="image-uploader"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setUploadingImg("uploading image please wait...");

              const data = new FormData();
              data.append("file", file);
              data.append("upload_preset", "upload_blogit_images");
              data.append("cloud_name", "dhktfy1xm");

              const response = await fetch(
                "https://api.cloudinary.com/v1_1/dhktfy1xm/image/upload",
                {
                  method: "POST",
                  body: data,
                }
              );

              const uploadedImageURL = await response.json();
              setProfilePhotoUrl(uploadedImageURL.url);
              setUploadingImg("");
            }}
          />
        </div>
        <button
          className="save-profile-pic-btn"
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? "updating profile photo" : "save"}
        </button>
      </div>
    </section>
  );
}

export default EditProfilePhotoSection;
