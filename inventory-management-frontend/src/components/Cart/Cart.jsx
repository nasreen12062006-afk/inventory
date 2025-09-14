import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import { useCartDispatch } from "../../context/CartContext";
import { useInventoryDispatch } from "../../context/InventoryContext";
import { useSalesDispatch } from "../../context/SalesContext";

export default function Cart() {
  const inventoryDispatch = useInventoryDispatch();
  const cartItemsFromContext = useCart();
  const cartDispatch = useCartDispatch();
  const saleDispatch = useSalesDispatch();

  let count = 0;
  let cartValue = 0;

  if (cartItemsFromContext.length > 0) {
    cartItemsFromContext.forEach((item) => {
      cartValue += item.price * item.quantity;
      count += item.quantity;
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-sky-200 p-6 font-sans">
      {/* Heading with emoji and uppercase */}
      <h1 className="text-3xl font-extrabold uppercase text-black mb-4 flex items-center gap-2">
        🛒 Your Cart
      </h1>

      {count === 0 ? (
        <p className="text-lg text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-3xl">
          <p className="mb-4 text-lg">
            No. of products in cart: <b>{count}</b> | Total Cart Value:{" "}
            <b>{cartValue.toFixed(2)}</b>
          </p>

          <div className="mb-4 flex gap-2 flex-wrap">
            <button
              onClick={() => {
                cartItemsFromContext.forEach((cartItem) => {
                  inventoryDispatch({
                    type: "STOCK_SOLD",
                    productName: cartItem.productName,
                    stock: cartItem.quantity,
                  });
                });
                saleDispatch({
                  type: "NEW_SALE",
                  saleValue: cartValue,
                  products: cartItemsFromContext,
                });
                cartDispatch({
                  type: "EMPTY_CART",
                });
                alert(
                  "Checkout successful! Inventory has been updated."
                );
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded p-2 transition"
            >
              Checkout Cart
            </button>

            <button
              onClick={() => {
                cartDispatch({
                  type: "EMPTY_CART",
                });
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold rounded p-2 transition"
            >
              Clear Cart
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {cartItemsFromContext.map((product) => (
              <CartItem key={product.productName} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
