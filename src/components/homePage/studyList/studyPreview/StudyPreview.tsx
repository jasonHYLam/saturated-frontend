import { Link } from "react-router-dom";
export function StudyPreview({ study }) {
  return (
    <>
      <Link to={`/study/${study.id}`}>
        <p>{study.title}</p>
        <img src={study.thumbnailLink} alt="" />
      </Link>
    </>
  );
}
