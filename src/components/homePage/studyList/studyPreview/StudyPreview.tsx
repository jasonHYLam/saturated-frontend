import { Link } from "react-router-dom";
export function StudyPreview({ study }) {
  return (
    <>
      <Link to={study.Id}>
        <img src={study.ThumbnailLink} alt="" />
        <p>{study.Title}</p>
      </Link>
    </>
  );
}
