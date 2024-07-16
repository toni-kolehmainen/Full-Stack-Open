import { createContext, useEffect, useState } from "react";

const StoreContext = createContext();

function StoreProvider(props) {
  const [storeId, setStoreId] = useState(localStorage.getItem("storeid") || '726025995')


  const handleChange = (newId) => {
    setStoreId(newId)
    window.localStorage.setItem('storeid', newId)
  } 
  return (
    <>
    <StoreContext.Provider value={{storeId, handleChange}}>
      {props.children}
    </StoreContext.Provider>
    </>
  )
}

export {StoreContext, StoreProvider}