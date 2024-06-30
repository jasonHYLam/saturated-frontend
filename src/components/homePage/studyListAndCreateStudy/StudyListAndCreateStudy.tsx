import { fetchWithoutQueryOrImage } from "../../../helpers/fetchData";
import { CreateStudy } from "../createStudy/CreateStudy";
import { StudyList } from "../studyList/StudyList";
import { useNavigate } from "react-router-dom";

export function StudyListAndCreateStudy() {
  const navigate = useNavigate();

  async function submitLogout() {
    const response = await fetchWithoutQueryOrImage("logout", "POST");
    if (response.ok || response instanceof Error) {
      navigate("/error");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <CreateStudy />
      <StudyList />
    </>
  );
}
