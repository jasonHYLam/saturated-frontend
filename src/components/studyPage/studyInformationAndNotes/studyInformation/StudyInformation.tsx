import { useState } from "react";
import { fetchWithoutQueryOrImage } from "../../../../helpers/fetchData";
import { useNavigate } from "react-router-dom";

export function StudyInformation({ studyTitle, studyOriginalLink, studyId }) {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function submitDelete() {
    const response = await fetchWithoutQueryOrImage(
      `Study/${studyId}`,
      "DELETE"
    );
    if (!response.ok || response instanceof Error) {
      navigate("/error");
    }

    navigate("/");
  }
  return (
    <>
      <section>
        <h1>Study Info</h1>
        <p>{studyTitle}</p>
        <p>{studyOriginalLink}</p>

        {status === "delete" ? (
          <>
            <p>Are you sure you want to delete this study?</p>
            <button onClick={submitDelete}>Yes</button>
            <button onClick={() => setStatus("")}>No</button>
          </>
        ) : (
          <button onClick={() => setStatus("delete")}>Delete study</button>
        )}
      </section>
    </>
  );
}
