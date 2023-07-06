import { useState } from "react";
import { StyledButton } from "../StyledButton/StyledButton.styled";
import { StyledDiv } from "../StyledForm/StyledForm.styled";

export default function ImageUpload({setUrl}) {

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleSelectFile = (e) => setFile(e.target.files[0]);

  async function uploadFile(e){
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    console.log(file);
    data.set("sample_file", file);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
    });
    const json= await response.json();
    // console.log("json.url", json.url);
    setUrl(json.url);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDiv>
      <label htmlFor="file">
        {" "}
        Select an image:
      </label>
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      {file && <p>{file.name}</p>}
      {file && (
        <>
          <StyledButton style={{"width": "150px", "margin": 0, "backgroundColor": "#4F709C"}} onClick={uploadFile}>
            {loading ? "uploading..." : "upload the image"}
          </StyledButton>
        </>
      )}
    </StyledDiv>
  );
}
