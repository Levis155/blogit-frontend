import { useState } from "react";
import "./WriteSection.css";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";

function WriteSection() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [blogImageUrl, setBlogImageUrl] = useState("");
  const [formError, setFormError] = useState(null);
  const [uploadingImg, setUploadingImg] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      const response = await axios.post(
        `${apiUrl}/blogs`,
        { title, excerpt, blogImageUrl },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(
        "Published blog successfully! Redirecting to My blogs page.",
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
      setTimeout(() => navigate("/my-blogs"), 3000);
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

  function handlePublish(e) {
    e.preventDefault();
    setFormError(null);
    if (!title || !excerpt || !blogImageUrl) {
      setFormError("All fields are required.");
      return;
    }
    mutate();
  }

  return (
    <section className="write-section">
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
      <form action="" className="write-form" onSubmit={handlePublish}>
        <p className="write-form-title">write your thoughts!</p>
        {formError && (
          <Alert severity="error" sx={{ mb: "1rem", fontSize: "1.4rem" }}>
            {formError}
          </Alert>
        )}
        <div className="img-input-cont">
          <label>Upload blog image</label>
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
                setBlogImageUrl(uploadedImageURL.url);
                setUploadingImg("");
              }}
            />
          </div>
        </div>
        <TitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="blog title"
          inputType="text"
          id="titleInput"
          placeHolder="Provide a title to your blog. Try and make it relatively short and catchy."
        />
        <ExcerptInput
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          label="blog excerpt"
          id="excerpt-input"
          placeHolder="Provide a brief excerpt to the blog. Give a comprehensive but brief preview to your blog."
        />

        <button disabled={isPending} className="publish-btn">
          {isPending ? "please wait" : "publish"}
        </button>
      </form>
    </section>
  );
}

function TitleInput({ label, inputType, id, value, onChange, placeHolder }) {
  return (
    <div className="title-input">
      <label>{label}</label>
      <input
        type={inputType}
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function ExcerptInput({ label, value, onChange, id, placeHolder }) {
  return (
    <div className="excerpt-input">
      <label>{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeHolder}
      />
    </div>
  );
}

export default WriteSection;
