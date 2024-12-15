// import React from 'react';
// import { SkillGem } from '../_types/ISkillGem';

// interface CardProps {
//   gem: SkillGem;
// }

// const Card: React.FC<CardProps> = ({ gem }) => {
//   return (
//     <div className="relative group w-48 p-4 border border-gray-300  shadow-md bg-green-500 hover:shadow-lg">
//       {/* Icon */}
//       <img
//         src={gem.icon}
//         alt={gem.name}
//         className="w-16 h-16 mx-auto mb-2 rounded"
//       />

//       {/* Name */}
//       <p className="text-center font-medium text-gray-800">{gem.name}</p>

//       {/* Hover Card */}
//       <div className="absolute left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-gray-800 border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
//         <h3 className="text-lg font-semibold">{gem.name}</h3>
//         <p className="text-sm text-gray-600">Category: {gem.category}</p>
//         <ul className="mt-2 text-sm list-disc pl-5">
//           {gem.explicitModifiers.map((mod, index) => (
//             <li key={index}>{mod.text}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Card;