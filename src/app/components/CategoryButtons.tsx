import React from 'react';

interface CategoryButtonsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,

}) => {
    return (
        <div className="flex flex-auto justify-evenly mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`text-2xl font-bold ${selectedCategory === category ? 'text-blue-500' : 'text-white'}`}>
              {category} Gems
            </button>
          ))}
        </div>
      );
    };

export default CategoryButtons;