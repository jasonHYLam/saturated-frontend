import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { postDataOnFetchWithImage } from "../../../helpers/fetchData";
import { useNavigate } from "react-router-dom";
import styles from "./createStudy.module.css";

export function CreateStudy() {
  type FormInput = {
    title: string;
    originalLink: string;
    imageFile: File;
  };

  console.log(styles);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const [showCreateStudy, setShowCreateStudy] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<Blob | null>(null);

  function toggleCreateStudy() {
    setShowCreateStudy(!showCreateStudy);
  }

  function selectImageToUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setUploadedImage(e.target.files[0]);
  }

  const submitCreateStudyInput: SubmitHandler<FormInput> = async (data) => {
    if (!uploadedImage) return;
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

    if (response instanceof Error) {
      navigate("/error");
      return;
    }

    if (!response.ok) {
      navigate("/error");
      return;
    }

    const { id } = await response.json();

    navigate(`/study/${id}`);
  };

  return (
    <>
      {!showCreateStudy ? (
        <button onClick={toggleCreateStudy}>Create a study</button>
      ) : (
        <div>
          <button onClick={toggleCreateStudy}>Cancel</button>
          <p>Creating a study</p>
          <article className={styles.uploadedImageContainer}>
            {uploadedImage ? (
              <img
                className={styles.uploadedImage}
                src={URL.createObjectURL(uploadedImage)}
                alt=""
              />
            ) : (
              <div className={styles.placeholderImage} />
            )}
          </article>
          <form
            className={styles.form}
            encType="multipart/form-data"
            onSubmit={handleSubmit(submitCreateStudyInput)}
          >
            <section>
              {!uploadedImage ? (
                <label
                  htmlFor="imageUploadInput"
                  className={styles.labelAsImageUploadInput}
                >
                  Upload image
                </label>
              ) : (
                <label
                  htmlFor="imageUploadInput"
                  className={styles.labelAsImageUploadInput}
                >
                  Change image
                </label>
              )}
              <input
                className={styles.imageUploadInput}
                id="imageUploadInput"
                type="file"
                {...(register("imageFile"), { required: true })}
                onChange={selectImageToUpload}
                hidden
              />
            </section>
            <input type="text" placeholder="Title" {...register("title")} />

            <p>
              Please provide a link to the original artist/artwork if possible.
            </p>
            <input
              type="text"
              placeholder="Original link"
              {...register("originalLink")}
            />
            {errors.imageFile && <p>Please upload an image</p>}
            <input type="submit" value="Create study" />
          </form>
        </div>
      )}
    </>
  );
}
