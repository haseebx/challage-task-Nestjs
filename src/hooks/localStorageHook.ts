import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : null);
      } catch (error) {
        console.error(error);
        setStoredValue(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return storedValue;
};

export default useLocalStorage;
