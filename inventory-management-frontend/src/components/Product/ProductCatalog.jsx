import { useState } from "react";
import ProductList from "./ProductList";
import { useInventory } from "../../context/InventoryContext";

export default function ProductCatalog() {
  const inventory = useInventory();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = inventory.filter(
    (item) =>
      item.stock > 0 &&
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-sky-200 text-gray-900 font-sans">
      {/* Heading */}
      <h1 className="uppercase font-extrabold text-4xl text-black tracking-wide mb-6 text-center">
        📋 Product Catalog
      </h1>

      {/* Search Bar */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <div className="w-full">
          <ProductList products={filteredProducts} />
        </div>
      ) : (
        <p className="text-gray-700 text-center">No products found.</p>
      )}
    </div>
  );
}
