import { useState } from "react";
import { fetchWithoutQueryOrImage } from "../../../helpers/fetchData";
import { CreateStudy } from "../createStudy/CreateStudy";
import { StudyList } from "../studyList/StudyList";
import { useNavigate } from "react-router-dom";

export function StudyListAndCreateStudy() {
  const navigate = useNavigate();
  const [showCreateStudy, setShowCreateStudy] = useState(false);

  async function submitLogout() {
    const response = await fetchWithoutQueryOrImage("User/logout", "POST");
    if (response instanceof Error) {
      return navigate("/error");
    } else if (!response.ok) {
      navigate("/error");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <main>
        <button onClick={submitLogout}>Logout</button>
        {!showCreateStudy ? (
          <>
            <button onClick={() => setShowCreateStudy(true)}>
              Create a study
            </button>
            <StudyList />
          </>
        ) : (
          <>
            <button onClick={() => setShowCreateStudy(false)}>Cancel</button>
            <CreateStudy />
          </>
        )}
      </main>
    </>
  );
}
