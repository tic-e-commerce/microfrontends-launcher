import React from "react";
import styles from "@/styles/cart.module.css";
import { CartTableProps } from "@/interfaces/cart-table-props.interface";

const CartTable: React.FC<CartTableProps> = ({ cartItems, onQuantityChange, onRemoveItem }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.product_id}>
            <td className="product-column">
              <img src={item.image_url} alt={item.product_name} className={styles.productImage} />
              <span>{item.product_name}</span>
            </td>
            <td>${item.price}</td>
            <td>
              <div className="quantity-container">
                <button
                  className="quantity-button"
                  onClick={() => onQuantityChange(item.product_id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => onQuantityChange(item.product_id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
              <button
                className={`${styles.removeButton}`}
                onClick={() => onRemoveItem(item.product_id)}
              >
                x
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
