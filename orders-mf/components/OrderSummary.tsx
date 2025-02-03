import { OrderSummaryProps } from "@/interfaces/order-summary-props.interface";

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shippingCost,
    shippingMethod,
    total,
  }) => (
    <div className="border-top pt-3">
      <div className="d-flex justify-content-between">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Shipping:</span>
        <span>${shippingCost.toFixed(2)}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Shipping Method:</span>
        <span>
          {shippingMethod === "Free"
            ? "Free"
            : shippingMethod === "Express"
            ? "Express"
            : "Standard"}
        </span>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-bold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
  
  export default OrderSummary;