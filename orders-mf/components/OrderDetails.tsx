import React, { useState, useEffect } from "react";
import { OrderItem } from "@/interfaces/order-item.interface";
import OrderItemComponent from "./OrderItem";

interface OrderDetailsProps {
  orderItems: OrderItem[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderItems }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setStartIndex(0);
  }, [orderItems]);

  return (
    <div className="order-details-container">
      {orderItems.length === 0 ? (
        <p>No items in the order.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {orderItems
              .slice(startIndex, startIndex + itemsPerPage)
              .map((item) => (
                <OrderItemComponent key={item.order_item_id} item={item} />
              ))}
          </ul>

          {/* Controles de paginación solo con botones */}
          {orderItems.length > itemsPerPage && (
            <div className="pagination-controls d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setStartIndex(startIndex - itemsPerPage)}
                disabled={startIndex === 0}
              >
                ◀ Anterior
              </button>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setStartIndex(startIndex + itemsPerPage)}
                disabled={startIndex + itemsPerPage >= orderItems.length}
              >
                Siguiente ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
