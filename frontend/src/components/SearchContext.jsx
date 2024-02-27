import React from "react";
import { createContext, useState } from "react";
export const SearchContext = createContext({});
export function SearchContextProvider({ children }) {
  const [destination, setDestination] = useState("");
  return (
    <SearchContext.Provider
      value={{
        destination,
        setDestination,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
