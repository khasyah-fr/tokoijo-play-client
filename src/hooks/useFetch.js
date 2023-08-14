import { useState, useEffect } from "react";

function useFetch(url, req) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, req)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP status: ${res.status}`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  return { data, loading, error };
}

export default useFetch;
