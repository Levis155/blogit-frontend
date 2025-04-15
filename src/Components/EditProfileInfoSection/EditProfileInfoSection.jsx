import { TextField, Alert } from "@mui/material";
import "./EditProfileInfoSection.css"

function EditProfileInfoSection() {
    return (
      <section className="edit-profile-section">
          <EditProfileCard />
      </section>
    )
  }
  
  function EditProfileCard() {
  
      return(
          <form className="edit-profile-form">
              <div className="edit-profile-title-cont">
                  <p className="edit-profile-main-title">Edit your profile information</p>
              </div>

              <TextField variant="standard" label="phone number" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
              <TextField variant="standard" label="occupation" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />
              <TextField variant="standard" label="bio" required sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}}  />
              <TextField variant="standard" label="secondary email" sx={{mb:"2rem","& .MuiInputBase-input": { fontSize: "1.8rem" },"& .MuiInputLabel-root": { fontSize: "1.8rem" },}} />

              <button>save</button>
          </form>
      )
  }

export default EditProfileInfoSection
