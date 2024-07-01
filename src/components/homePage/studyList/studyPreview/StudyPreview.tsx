import { Link } from "react-router-dom";

interface StudyPreviewProps {
  study: {
    id: number;
    title: string;
    thumbnailLink: string;
  };
}

export function StudyPreview({ study }: StudyPreviewProps) {
  return (
    <>
      <Link to={`/study/${study.id}`}>
        <p>{study.title}</p>
        <img src={study.thumbnailLink} alt="" />
      </Link>
    </>
  );
}
