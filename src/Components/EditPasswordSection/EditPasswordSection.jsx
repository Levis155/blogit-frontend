import { TextField, Alert } from "@mui/material";
import "./EditPasswordSection.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import apiUrl from "../../utils/apiUrl";

function EditPasswordSection() {
    return (
      <section className="edit-password-section">
          <EditPasswordCard />
      </section>
    )
  }
  
  function EditPasswordCard() {

    const user = useUserStore((state) => state.user)
    console.log(user)

    const [oldPassword, setOldPassword] = useState();
    const [updatedPassword, setUpdatedPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();

    const {isPending, mutate} = useMutation({
        mutationKey: ["update-password"],
        mutationFn: async () => {
          const response = await axios.patch(`${apiUrl}/profile/update-password`,{updatedPassword}, {withCredentials: true});
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
        mutate();
    }
  
      return(
          <form className="edit-password-form" onSubmit={handleSave}>
              <div className="edit-password-title-cont">
                  <p className="edit-password-main-title">change your password</p>
              </div>

              <TextField value={oldPassword} onChange={e => setOldPassword(e.target.value)} variant="standard" type="password" label="old password" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
              <TextField value={updatedPassword} onChange={e => setUpdatedPassword(e.target.value)} variant="standard" type="password" label="new password" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
              <TextField value={confirmedPassword} onChange={e => setConfirmedPassword(e.target.value)} variant="standard" type="password" label="confirm new password" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
              <button>save</button>
          </form>
      )
  }

export default EditPasswordSection
