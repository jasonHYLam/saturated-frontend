import { useEffect, useState } from "react";
import { getDataFromFetch } from "./fetchData";
import { useNavigate } from "react-router-dom";

export function useGetAllStudies() {
  const [allStudies, setAllStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllStudies() {
      try {
        const allStudiesResponse = await getDataFromFetch("Study/allStudies");

        if (!allStudiesResponse.ok || allStudiesResponse instanceof Error) {
          navigate("/error");
        }

        console.log("checking allStudiesResponse");
        console.log(allStudiesResponse);

        const allStudies = await allStudiesResponse.json();
        console.log(allStudies);

        setLoading(false);
        setAllStudies(allStudies);
      } catch (err) {
        navigate("/error");
      }
    }
    fetchAllStudies();
  }, []);

  return { allStudies, loading };
}