import { StudyPreview } from "./studyPreview/StudyPreview";

interface StudyListProps {
  allStudies: StudyPreview[];
}

export function StudyList({ allStudies }: StudyListProps) {
  return (
    <>
      <p>Study list</p>
      <section>
        {allStudies.map((study) => (
          <StudyPreview study={study} key={study.id} />
        ))}
      </section>
    </>
  );
}
