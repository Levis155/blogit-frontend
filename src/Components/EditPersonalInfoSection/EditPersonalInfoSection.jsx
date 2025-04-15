import { TextField, Alert } from "@mui/material";
import "./EditPersonalInfoSection.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import apiUrl from "../../utils/apiUrl";

function EditPersonalInfoSection() {
    return (
      <section className="edit-personal-section">
          <EditPersonalCard />
      </section>
    )
  }
  
  function EditPersonalCard() {
    const user = useUserStore((state) => state.user)
    console.log(user)

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [emailAddress, setEmailAddress] = useState(user.emailAddress);
    const [userName, setUserName] = useState(user.username);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();

    const {isPending, mutate} = useMutation({
        mutationKey: ["update-personal-info"],
        mutationFn: async () => {
          
            const response = await axios.patch(`${apiUrl}/profile/update-personal-info`,{firstName, lastName, emailAddress, userName}, {withCredentials: true});
          console.log(response)
        },
        onSuccess: () => {
          navigate(`/my-profile`);
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



    function handleSave(e) {
        e.preventDefault()
        setFormError(null);
        if(!firstName || !lastName || !emailAddress ||!userName) {
          setFormError("All fields are required.");
          return;
        }
        mutate();
    }
  
      return(
          <form className="edit-personal-form" onSubmit={handleSave}>
              <div className="edit-personal-title-cont">
                  <p className="edit-personal-main-title">Edit your personal information</p>
              </div>

              <TextField value={firstName} onChange={e => setFirstName(e.target.value)} variant="standard" label="First Name" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
              <TextField value={lastName} onChange={e => setLastName(e.target.value)} variant="standard" label="Last Name" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
              <TextField value={emailAddress} onChange={e => setEmailAddress(e.target.value)} variant="standard" label="Email" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
              <TextField value={userName} onChange={e => setUserName(e.target.value)} variant="standard" label="Username" sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />

              <button disabled={isPending}>{isPending ? "please wait" : "save"}</button>
          </form>
      )
  }

export default EditPersonalInfoSection
