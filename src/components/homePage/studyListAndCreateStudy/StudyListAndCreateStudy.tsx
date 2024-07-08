import { useState } from "react";
import { fetchWithoutQueryOrImage } from "../../../helpers/fetchData";
import { CreateStudy } from "../createStudy/CreateStudy";
import { StudyList } from "../studyList/StudyList";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useGetAllStudies } from "../../../helpers/hooks";
import { Loading } from "../../loading/Loading";
import styles from "./studyListAndCreateStudy.module.css";
import GithubIcon from "../../../assets/github.svg";
import { Icon } from "../../icons/Icon";
import { GITHUB_LINK } from "../../../helpers/constants";

export function StudyListAndCreateStudy() {
  const navigate = useNavigate();
  const [showCreateStudy, setShowCreateStudy] = useState(false);
  const { allStudies, loading } = useGetAllStudies();
  const { isGuest } = useOutletContext<{ isGuest: boolean }>();

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
      <main className={styles.page}>
        <header className={styles.header}>
          {isGuest && <p>Using guest account</p>}
          <button onClick={submitLogout}>Logout</button>
          <a href={GITHUB_LINK}>
            <Icon iconPath={GithubIcon} />
          </a>
        </header>

        {loading ? (
          <Loading />
        ) : (
          <>
            {!showCreateStudy ? (
              <>
                <button
                  className={styles.toggleShowCreateStudy}
                  onClick={() => setShowCreateStudy(true)}
                >
                  Create a study
                </button>
                <StudyList allStudies={allStudies} />
              </>
            ) : (
              <>
                <button
                  className={styles.toggleShowCreateStudy}
                  onClick={() => setShowCreateStudy(false)}
                >
                  Cancel
                </button>
                <CreateStudy />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
