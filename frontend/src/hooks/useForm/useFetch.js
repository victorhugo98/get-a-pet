import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    try {
      setError(null);
      setData(null);
      setLoading(true);
      const data = await fetch(url, options);
      const json = await data.json();
      setData(json);
      setLoading(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(null);
    }
  }, []);

  return { data, loading, request, error };
};

export default useFetch;
