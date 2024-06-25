import { Link } from "react-router-dom";
export function StudyPreview({ study }) {
  return (
    <>
      <Link to={`/study/${study.id}`}>
        <p>Studyccc:</p>
        <img src={study.thumbnailLink} alt="" />
        <p>{study.title}</p>
      </Link>
    </>
  );
}
