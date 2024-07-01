import { useState } from "react";
import { fetchWithoutQueryOrImage } from "../../../../helpers/fetchData";
import { useNavigate, useOutletContext } from "react-router-dom";

interface StudyInformationProps {
  studyTitle: string;
  studyOriginalLink: string;
  studyId: number;
}
export function StudyInformation({
  studyTitle,
  studyOriginalLink,
  studyId,
}: StudyInformationProps) {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { isGuest } = useOutletContext();

  const deleteSection = isGuest ? (
    <>
      <p>Cannot delete study on guest account</p>
    </>
  ) : (
    <>
      <p>Are you sure you want to delete this study?</p>
      <button onClick={submitDelete}>Yes</button>
      <button onClick={() => setStatus("")}>No</button>
    </>
  );
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
          deleteSection
        ) : (
          <button onClick={() => setStatus("delete")}>Delete study</button>
        )}
      </section>
    </>
  );
}
