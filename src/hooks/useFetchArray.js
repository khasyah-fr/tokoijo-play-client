import { useState, useEffect } from "react";

function useFetchArray(url, req) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(true);

  function update() {
    setUpdated(true);
  }

  const getData = () => {
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
  };

  useEffect(() => {
    if (updated) {
      getData();
      setUpdated(false);
    }
  }, [updated]);

  return { data, loading, error, update };
}

export default useFetchArray;
