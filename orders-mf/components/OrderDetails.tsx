import React from "react";
import { OrderItem } from "@/interfaces/order-item.interface"; 
import OrderItemComponent from "./OrderItem"; 

interface OrderDetailsProps {
  orderItems: OrderItem[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderItems }) => (
  <ul className="list-group mb-4">
    {orderItems.map((item) => (
      <OrderItemComponent key={item.order_item_id} item={item} />
    ))}
  </ul>
);

export default OrderDetails;
