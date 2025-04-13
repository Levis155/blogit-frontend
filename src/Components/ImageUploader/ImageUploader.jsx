import { Button } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";

function ImageUploader() {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="image-upload">
        <Button 
          className="image-upload-btn"
          component="span"
          endIcon={<IoMdCloudUpload />}
          sx={{
            color: "chocolate",
            backgroundColor: "transparent",
            borderRadius: "none",
            border: "1px solid chocolate",
            marginBottom: "1.5rem",
          }}
        >
          Upload blog Image
        </Button>
      </label>
    </>
  );
}

export default ImageUploader;