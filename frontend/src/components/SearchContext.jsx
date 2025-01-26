import React from "react";
import { createContext, useState } from "react";
export const SearchContext = createContext({});
export function SearchContextProvider({ children }) {
  const [searchContext, setSearchContext] = useState({
    destination: "",
    checkInDate: null,
    checkOutDate: null,
    adultCount: null,
    childCount: null,
  });
  return (
    <SearchContext.Provider
      value={{
        searchContext,
        setSearchContext,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
