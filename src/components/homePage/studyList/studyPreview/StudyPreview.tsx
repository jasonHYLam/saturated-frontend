import { Link } from "react-router-dom";
import styles from "./studyPreview.module.css";

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
      <Link to={`/study/${study.id}`} className={styles.studyPreview}>
        <img className={styles.image} src={study.thumbnailLink} alt="" />
        <p>{study.title}</p>
      </Link>
    </>
  );
}
