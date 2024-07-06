import { StudyPreview } from "./studyPreview/StudyPreview";

interface StudyListProps {
  allStudies: StudyPreview[];
}

export function StudyList({ allStudies }: StudyListProps) {
  return (
    <>
      <h1>Study list</h1>
      <section>
        {allStudies.map((study) => (
          <StudyPreview study={study} key={study.id} />
        ))}
      </section>
    </>
  );
}
