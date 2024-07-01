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

    const studyTitle = !data.title ? "Untitled" : data.title;
    const studyOriginalLink = !data.originalLink ? "" : data.originalLink;
    createStudyInput.append("Title", studyTitle);
    createStudyInput.append("OriginalLink", studyOriginalLink);
    createStudyInput.append("ImageFile", uploadedImage);

    const response = await postDataOnFetchWithImage(
      "Study",
      "POST",
      createStudyInput
    );

    if (!response.ok || response instanceof Error) {
      navigate("/error");
    }

    const { id } = await response.json();

    navigate(`/study/${id}`);
  }

  return (
    <>
      <button onClick={toggleCreateStudy}>Create a study</button>
      {showCreateStudy && (
        <div>
          {uploadedImage && (
            <div>
              <img src={URL.createObjectURL(uploadedImage)} alt="" />
            </div>
          )}
          <p>Creating a study</p>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(submitCreateStudyInput)}
          >
            <input type="text" placeholder="Title" {...register("title")} />

            <p>
              If you are studying from an existing artwork, be a good digital
              citizen and provide a link to the original artist/artwork.
            </p>
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
