import { useState, useEffect } from "react";

const useApiData = (endpoint, queryParams = "") => {
  const apiKey = "6e58a735-ded2-493a-82ba-38052969edb3";
  const apiUrl = `https://api.harvardartmuseums.org/${endpoint}?apikey=${apiKey}${queryParams}`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setData(responseData.records);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, isLoading };
};

export default useApiData;
