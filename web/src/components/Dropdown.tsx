// components/Dropdown.js
import { useState } from "react";

const TestDropdown = ({ options, onSelectGroupId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {options.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full border rounded bg-white">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className="p-2 hover:bg-gray-200 cursor-pointer text-black"
              onClick={() => onSelectGroupId(option.id)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestDropdown;
