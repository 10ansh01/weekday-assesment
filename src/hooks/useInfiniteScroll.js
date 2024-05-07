//This hook triggers an API request(by calling fetch data function)
//Whenever anby user scrolls to the bottom of screen
import { useState, useEffect } from "react";

const useInfiniteScroll = (action, offset) => {
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
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
  }, [loading, offset]);

  return loading;
};

export default useInfiniteScroll;
