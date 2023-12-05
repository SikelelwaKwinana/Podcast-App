
// import React, { createContext, useContext, useState, useCallback } from 'react';

// const FavouriteContext = createContext();

// export const FavouriteProvider = ({ children }) => {
//   const [favourites, setFavourites] = useState([]);

//   const addToFavourites = useCallback((episode) => {
//     setFavourites((prevFavourites) => [...prevFavourites, episode]);
//   }, []);

//   const removeFromFavourites = useCallback((episodeId) => {
//     setFavourites((preFavourites) => preFavourites.filter((episode) => episode.id !== episodeId));
//   }, []);

//   return (
//     <FavouriteContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
//       {children}
//     </FavouriteContext.Provider>
//   );
// };

// export const useFavouriteContext = () => {
//   const context = useContext(FavouriteContext);
//   if (!context) {
//     throw new Error('useFavouriteContext must be used within a FavouriteProvider');
//   }
//   return context;
// };
