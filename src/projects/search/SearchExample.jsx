import { useState } from "react";

const SearchExample = () => {
  // Some example data
  const items = ["Apple", "Banana", "Orange", "Grapes", "Mango", "Watermelon"];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on the search term
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Fruit Search</h2>

      {/* Input to change the searchTerm */}
      <input
        type="text"
        placeholder="Search fruits..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          width: "200px",
          marginBottom: "15px"
        }}
      />

      {/* Display filtered results */}
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchExample;