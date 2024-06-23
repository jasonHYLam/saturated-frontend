import { Link } from "react-router-dom";
export function StudyPreview({ study }) {
  return (
    <>
      <Link to={study.Id}>
        <p>{study.Title}</p>
      </Link>
    </>
  );
}
