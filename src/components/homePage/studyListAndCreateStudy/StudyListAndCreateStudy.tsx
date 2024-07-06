import { fetchWithoutQueryOrImage } from "../../../helpers/fetchData";
import { CreateStudy } from "../createStudy/CreateStudy";
import { StudyList } from "../studyList/StudyList";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../loading/Loading";

export function StudyListAndCreateStudy() {
  const navigate = useNavigate();

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
        <CreateStudy />
        <StudyList />
      </main>
    </>
  );
}
