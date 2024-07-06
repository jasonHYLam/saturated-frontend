import { useState } from "react";
import { fetchWithoutQueryOrImage } from "../../../helpers/fetchData";
import { CreateStudy } from "../createStudy/CreateStudy";
import { StudyList } from "../studyList/StudyList";
import { useNavigate } from "react-router-dom";
import { useGetAllStudies } from "../../../helpers/hooks";
import { Loading } from "../../loading/Loading";

export function StudyListAndCreateStudy() {
  const navigate = useNavigate();
  const [showCreateStudy, setShowCreateStudy] = useState(false);
  const { allStudies, loading } = useGetAllStudies();

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
        <header>
          <button onClick={submitLogout}>Logout</button>
        </header>

        {loading ? (
          <Loading />
        ) : (
          <>
            {!showCreateStudy ? (
              <>
                <button onClick={() => setShowCreateStudy(true)}>
                  Create a study
                </button>
                <StudyList allStudies={allStudies} />
              </>
            ) : (
              <>
                <button
                  onClick={(e) => {
                    setShowCreateStudy(false);
                    e.preventDefault();
                  }}
                >
                  Cancel
                </button>
                <p>aa</p>
                <CreateStudy />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
