import { useState } from "react";
import { useInventory } from "../../context/InventoryContext";
import Product from "./Product";

const Inventory = () => {
  const inventory = useInventory();
  const [alertValue, setAlertValue] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyDepleted, setShowOnlyDepleted] = useState(false);

  const lowerCaseSearchQuery = searchQuery.toLowerCase();

  const filteredInventory = inventory.filter((product) => {
    const matchesSearchQuery = product.productName
      .toLowerCase()
      .includes(lowerCaseSearchQuery);
    const isDepleted = product.stock < alertValue;
    return showOnlyDepleted ? matchesSearchQuery && isDepleted : matchesSearchQuery;
  });

  // Check if any product is low stock
  const lowStockWarning = inventory.some((product) => product.stock < alertValue);

  return (
    <div className="min-h-screen p-6 bg-sky-200 text-gray-900 font-sans flex flex-col items-center">
      {/* Heading with emoji */}
      <h1 className="uppercase font-extrabold text-4xl text-black tracking-wide mb-4 text-center flex items-center gap-2">
        📦 Inventory
      </h1>

      {/* Low stock warning */}
      {lowStockWarning && (
        <p className="text-red-600 font-bold mb-4">
          ⚠️ Some products are below the alert stock value!
        </p>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center w-full max-w-md gap-4 mb-6">
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-3 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="alert-value" className="text-black font-semibold">
              Alert Value
            </label>
            <input
              id="alert-value"
              type="number"
              value={alertValue}
              onChange={(e) => setAlertValue(e.target.value)}
              className="w-20 p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="show-only-depleted" className="text-black font-semibold">
              Show Only Depleted
            </label>
            <input
              id="show-only-depleted"
              type="checkbox"
              checked={showOnlyDepleted}
              onChange={() => setShowOnlyDepleted(!showOnlyDepleted)}
              className="w-6 h-6 accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Inventory List */}
      {filteredInventory.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {filteredInventory.map((product) => (
            <div
              key={product.productName}
              className="bg-white w-full md:w-auto"
            >
              <Product product={product} alertValue={alertValue} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-6 text-center">No inventory items found.</p>
      )}
    </div>
  );
};

export default Inventory;
