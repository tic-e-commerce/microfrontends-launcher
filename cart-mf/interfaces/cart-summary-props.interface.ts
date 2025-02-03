export interface CartSummaryProps {
    subtotal: number;
    shippingMethod: string | null;
    shippingCost: number;
    total: number;
    onShippingMethodChange: (method: string) => void;
    onCheckout: () => void;
  }
  