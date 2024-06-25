import { useGetAllStudies } from "../../../helpers/hooks";
import { StudyPreview } from "./studyPreview/StudyPreview";

export function StudyList() {
  const { allStudies, loading } = useGetAllStudies();

  return (
    <>
      <p>study list</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section>
          {allStudies.map((study) => (
            <>
              <StudyPreview study={study} />
            </>
          ))}
        </section>
      )}
    </>
  );
}
