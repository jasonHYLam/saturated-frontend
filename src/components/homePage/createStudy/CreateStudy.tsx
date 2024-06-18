import { useState } from "react";

export function CreateStudy() {
  const [showCreateStudy, setShowCreateStudy] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  function toggleCreateStudy() {
    setShowCreateStudy(!showCreateStudy);
  }

  function selectImageToUpload(e) {
    setUploadedImage(e.target.files[0]);
  }

  return (
    <>
      {uploadedImage && (
        <div>
          <img src={URL.createObjectURL(uploadedImage)} alt="" />
        </div>
      )}
      <button onClick={toggleCreateStudy}>Create a study</button>
      {showCreateStudy && (
        <div>
          <p>Creating a study</p>
          <form>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Original link" />
            <input type="file" onChange={selectImageToUpload} />
            <input type="submit" value="Create study" />
          </form>
        </div>
      )}
    </>
  );
}
