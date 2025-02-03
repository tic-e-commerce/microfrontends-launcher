import React from "react";
import { CartSummaryProps } from "@/interfaces/cart-summary-props.interface";

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shippingMethod,
  shippingCost,
  total,
  onShippingMethodChange,
  onCheckout,
}) => {
  return (
    <div className="row mt-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Select Shipping Method</h5>
            <select
              className="form-select"
              aria-label="Select shipping method"
              value={shippingMethod || ""}
              onChange={(e) => onShippingMethodChange(e.target.value)}
            >
              <option value="STANDARD">Standard</option>
              <option value="EXPRESS">Express</option>
              <option value="STORE">Store</option>
            </select>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Cart Total</h5>
            <table className="summary-table">
              <tbody>
                <tr>
                  <td>Subtotal:</td>
                  <td>${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping:</td>
                  <td>
                    {shippingMethod
                      ? `${shippingMethod.replace("_", " ").toUpperCase()} ($${shippingCost.toFixed(
                          2
                        )})`
                      : "Not selected"}
                  </td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>${total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-danger w-100 mt-3" onClick={onCheckout}>
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
