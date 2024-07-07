import { StudyPreview } from "./studyPreview/StudyPreview";
import styles from "./studyList.module.css";

interface StudyListProps {
  allStudies: StudyPreview[];
}

export function StudyList({ allStudies }: StudyListProps) {
  return (
    <>
      <h1>Study list</h1>
      <section className={styles.studyList}>
        {allStudies.map((study) => (
          <StudyPreview study={study} key={study.id} />
        ))}
      </section>
    </>
  );
}
