import { useEffect, useState } from "react";

export const useGeneratedMessage = (endpoint, body) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGeneratedMessage = async () => {
      try {
        const result = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        setData(await result.json());
        setLoading(false);
      } catch (e) {
        setError(error);
        setLoading(false);
      }
    };

    if (!data) {
      // need this check, otherwise it keeps re-fetching
      getGeneratedMessage();
    }
  }, [body, data, endpoint, error]);

  return { data, loading, error };
};
