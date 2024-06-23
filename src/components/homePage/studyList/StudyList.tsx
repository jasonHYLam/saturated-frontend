import { useEffect, useState } from "react";
import { getDataFromFetch } from "../../../helpers/fetchData";

export function StudyList() {
  const [allStudies, setAllStudies] = useState([]);

  useEffect(() => {
    async function fetchAllStudies() {
      const allStudiesResponse = await getDataFromFetch("allStudies");

      console.log("checking allStudiesResponse");
      console.log(allStudiesResponse);

      return allStudiesResponse;
    }
    fetchAllStudies();
  }, []);
  return (
    <>
      <p>study list</p>
    </>
  );
}
