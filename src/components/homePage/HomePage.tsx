import { useNavigate } from "react-router-dom";
import { fetchWithoutQueryOrImage } from "../../helpers/fetchData";
import { CreateStudy } from "./createStudy/CreateStudy";
import { StudyList } from "./studyList/StudyList";

export function HomePage() {
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
      <p>Home page</p>
      {/* <button onClick={submitLogout}>Logout</button> */}
      <CreateStudy />
      <StudyList />
    </>
  );
}
