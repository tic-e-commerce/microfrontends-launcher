import React from "react";
import { OrderItem as OrderItemType } from "@/interfaces/order-item.interface"; 

interface OrderItemProps {
  item: OrderItemType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => (
  <li className="list-group-item">
    <img src={item.image_url} alt={item.product_name} />
    <div className="flex-grow-1">
      <p className="mb-1">{item.product_name}</p>
      <small>Quantity: {item.quantity}</small>
    </div>
    <div className="text-end">
      <p className="mb-0">
        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
      </p>
    </div>
  </li>
);

export default OrderItem;
