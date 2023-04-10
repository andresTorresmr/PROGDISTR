import { useState } from "react";

const useFetchAndLoad = () => {
  const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 4000));
  const [loading, setLoading] = useState(false);
  let controller = AbortController;

  const callEndpoint = async (axiosCall) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);

    let result = {};
    try {
      result = await axiosCall.call;
    } catch (error) {
      setLoading(false);
      throw error;
    }
    setLoading(false);
    return result;
  };

  return { loading, callEndpoint };
};
export default useFetchAndLoad;
