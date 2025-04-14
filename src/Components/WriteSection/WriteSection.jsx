import "./WriteSection.css"
import ImageUploader from "../ImageUploader/ImageUploader";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";

function WriteSection() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate();

  const {isPending, mutate} = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      const response = await axios.post(`http://localhost:3000/blogs`, {title, excerpt}, {withCredentials: true})
      return response.data;
    },
    onSuccess: (data) => {
      navigate(`/blogs/${data.newBlog.id}`)
    },
    onError: (err) => {
      if(axios.isAxiosError(err)){
        const serverMessage = err.response.data.message;
        setFormError(serverMessage);
      } else {
        setFormError("Something went wrong.")
      }
    },
  })

  function handlePublish(e) {
    e.preventDefault();
    setFormError(null);
    if(!title || !excerpt) {
      setFormError("All fields are required.");
      return;
    }
    mutate();
  }
  
  return (
    <section className="write-section">
      <form action="" className="write-form" onSubmit={handlePublish}>
        <p className="write-form-title">write your thoughts!</p>
        {formError && <Alert severity="error" sx={{mb:"1rem", fontSize:"1.4rem"}}>{formError}</Alert>}
        <ImageUploader />
        <TitleInput value={title} onChange={e => setTitle(e.target.value)} label="blog title" inputType="text" id="titleInput" placeHolder="Provide a title to your blog. Try and make it relatively short and catchy."/>
        <ExcerptInput value={excerpt} onChange={e => setExcerpt(e.target.value)} label="blog excerpt" id="excerpt-input" placeHolder="Provide a brief excerpt to the blog. Give a comprehensive but brief preview to your blog." />

        <button disabled={isPending} className="publish-btn">{isPending ? "please wait" : "publish"}</button>
      </form>
    </section>
  )
}

function TitleInput({
    label,
    inputType,
    id,
    value,
    onChange,
    placeHolder,}) {
    return (
      <div className="title-input">
        <label>{label}</label>
        <input type={inputType} id={id} placeholder={placeHolder} value={value} onChange={onChange} />
      </div>
    );
  }

  function ExcerptInput({
    label,
    value,
    onChange,
    id,
    placeHolder,}) {
    return (
      <div className="excerpt-input">
        <label>{label}</label>
        <textarea value={value} onChange={onChange} id={id} placeholder={placeHolder} />
      </div>
    );
  }

export default WriteSection
