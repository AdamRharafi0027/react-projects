import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const DropDownFilter = ({
  products,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
 const categories = [
    "All",...Array.from(new Set(products.map((p) => p.category.name))),
  ];
  return (
    <div className="relative inline-block text-left mb-20">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-gray-200 px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Filter className="w-5 h-5 text-gray-700" />
        <span className="font-medium text-gray-800">{selectedCategory}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-700" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-700" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white/20 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl z-50">
          <ul className="py-2">
            {categories.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelectedCategory(option);
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownFilter;
{
  /* <li
                  key={index}
                  className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-indigo-600 cursor-pointer rounded-lg mx-1 transition"
                >
                  {item}
                </li> */
}
