// components/Dropdown.js
import { useState } from "react";

const TestDropdown = ({ options, onSelectGroup }: any) => {
  console.log("Options: ", options);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOptions = options.filter((option: any) =>
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
        <ul className="overflow-y-scroll h-[400px] absolute z-10 mt-2 w-full border rounded bg-zinc-800 ">
          {filteredOptions.map((option: any) => (
            <li
              key={option.id}
              className="p-2 flex justify-between hover:bg-zinc-700 hover:text-white hover:shadow hover:shadow-indigo-600 cursor-pointer text-zinc-300"
              onClick={() => onSelectGroup(option)}
            >
              <span>{option.name}</span>
              <span>{option.description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestDropdown;
