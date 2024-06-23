import { useState } from "react";
import { useForm } from "react-hook-form";
import { postDataOnFetchWithImage } from "../../../helpers/fetchData";
import { useNavigate } from "react-router-dom";

export function CreateStudy() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showCreateStudy, setShowCreateStudy] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  function toggleCreateStudy() {
    setShowCreateStudy(!showCreateStudy);
  }

  function selectImageToUpload(e) {
    setUploadedImage(e.target.files[0]);
  }

  async function submitCreateStudyInput(data) {
    const createStudyInput = new FormData();
    createStudyInput.append("Title", data.title);
    createStudyInput.append("OriginalLink", data.originalLink);
    createStudyInput.append("ImageFile", uploadedImage);

    console.log("attempting fetch");
    const response = await postDataOnFetchWithImage(
      "Study",
      "POST",
      createStudyInput
    );

    if (!response.ok || response instanceof Error) {
      console.log("error eep");
      navigate("/error");
    }

    console.log("a most successful fetch");
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
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(submitCreateStudyInput)}
          >
            <input type="text" placeholder="Title" {...register("title")} />
            <input
              type="text"
              placeholder="Original link"
              {...register("originalLink")}
            />
            <input
              type="file"
              {...(register("imageFile"), { required: true })}
              onChange={selectImageToUpload}
            />
            <input type="submit" value="Create study" />
          </form>
        </div>
      )}
    </>
  );
}
