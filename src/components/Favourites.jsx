
// import React from 'react';
// import { useFavouriteContext } from './FavouriteContext';

// const Favourites = () => {
//   const { favourites } = useFavouriteContext();

//   return (
//     <div>
//       <h2>Favourites</h2>
//       <ul>
//         {favourites.map((favourite) => (
//           <li key={favourite.id}>
//             <strong>{favourite.title}</strong>
//             <p>Season: {favourite.season}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Favorites;






// const fuzzySearch = (query, podcasts) => {
//     const lowerCaseQuery = query.toLowerCase();
//     return podcasts.filter((podcast) => {
//       const lowerCaseTitle = podcast.title.toLowerCase();
//       const lowerCaseGenres = formatGenres(podcast.genres).toLowerCase();

//       return (
//         lowerCaseTitle.includes(lowerCaseQuery) ||
//         lowerCaseGenres.includes(lowerCaseQuery)
//       );
//     });
//   };
// <form
//             className="nav--search"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSearch();
//             }}
//           >
//             <input
//               type="text"
//               placeholder="Search"
//               className="search--input"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </form>