import { useState } from "react";

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
    console.log("json.url", json.url);
    setUrl(json.url);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label htmlFor="file">
        {" "}
        select file
      </label>
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />
      {file && <p>{file.name}</p>}
      {/* <code>
        {Object.keys(res).map(
          (key) =>
            key && (
              <p key={key}>
                <span>{key}:</span>
                <span>
                  {typeof res[key] === "object" ? "object" : res[key]}
                </span>
              </p>
            )
        )}
      </code> */}
      {file && (
        <>
          <button onClick={uploadFile}>
            {loading ? "uploading..." : "upload the image"}
          </button>
        </>
      )}
    </div>
  );
}
