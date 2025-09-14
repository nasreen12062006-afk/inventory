import { useSales } from "../../context/SalesContext";
import SaleRecord from "./SaleRecord";

const Sales = () => {
  const sales = useSales();

  return (
    <div className="m-4 bg-sky-200 min-h-screen p-6 font-sans">
      {/* Heading with emoji, uppercase, underline in sky blue */}
      <h1 className="text-3xl font-extrabold uppercase text-black mb-6 border-b-4 border-sky-500 pb-2 flex items-center gap-2">
        📊 Sales Record
      </h1>

      {sales.length > 0 ? (
        <div className="grid gap-4">
          {sales.map((sale, index) => (
            <SaleRecord key={index} sale={sale} saleId={index} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center">No sales recorded yet.</p>
      )}
    </div>
  );
};

export default Sales;
