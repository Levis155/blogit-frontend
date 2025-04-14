import "./EditBlogSection.css"
import ImageUploader from "../ImageUploader/ImageUploader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import apiUrl from "../../utils/apiUrl";

function EditBlogSection() {

    const{ blogId } = useParams();
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();

    const {isLoading, data, isError, error} = useQuery({
        queryKey: ["get-blog-for-update"],
        queryFn: async () => {
          const response = await axios.get(`http://localhost:3000/blogs/${blogId}`, {withCredentials: true})
          console.log(response.data);
          return response.data;
        }
      })


      const {isPending, mutate} = useMutation({
        mutationKey: ["update-blog"],
        mutationFn: async () => {
          const response = await axios.patch(`http://localhost:3000/blogs/${blogId}`,{title, excerpt}, {withCredentials: true});
          console.log(response)
        },
        onSuccess: () => {
          navigate(`/blogs/${blogId}`)
        },
        onError: (error) => {
          if(axios.isAxiosError(error)) {
            const serverMessage = error.response.data.message;
            setFormError(serverMessage);
          } else {
            setFormError("Something went wrong.")
          }
        }
      })

      useEffect(() => {
        if(data) {
            setTitle(data.title);
            setExcerpt(data.excerpt);
        }
      }, [data])

      function handleSave (e) {
        e.preventDefault();
        setFormError(null);
        if(!title || !excerpt) {
          setFormError("All fields are required.");
          return;
        }
        mutate();
      }


  return (
    <section className="edit-blog-section">
      <form action="" className="edit-form" onSubmit={handleSave}>
        <p className="edit-form-title">edit blog</p>
        {formError && <Alert severity="error" sx={{mb:"1rem", fontSize:"1.4rem"}}>{formError}</Alert>}
        <ImageUploader />
        <TitleInput value={title} onChange={e => setTitle(e.target.value)} label="new blog title" inputType="text" id="titleInput" placeHolder="Provide a title to your blog. Try and make it relatively short and catchy."/>
        <ExcerptInput value={excerpt} onChange={e => setExcerpt(e.target.value)} label="new blog excerpt" id="excerpt-input" placeHolder="Provide a brief excerpt to the blog. Give a comprehensive but brief preview to your blog." />

        <button className="save-btn" disabled={isPending}>{isPending ? "please wait..." : "save"}</button>
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

export default EditBlogSection
