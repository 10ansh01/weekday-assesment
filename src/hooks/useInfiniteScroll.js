import { useState, useEffect } from "react";

const useInfiniteScroll = (action) => {
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const body = document.body;
    const html = document.documentElement;

    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= body.scrollHeight && !loading) {
      setLoading(true);
      action().then(() => {
        setLoading(false); 
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return loading;
};

export default useInfiniteScroll;
