import { useGetAllStudies } from "../../../helpers/hooks";

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
              <p>Study title</p>
            </>
          ))}
        </section>
      )}
    </>
  );
}
