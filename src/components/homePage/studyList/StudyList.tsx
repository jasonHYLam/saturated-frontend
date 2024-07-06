import { useGetAllStudies } from "../../../helpers/hooks";
import { StudyPreview } from "./studyPreview/StudyPreview";

export function StudyList({ allStudies }) {
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
