// Module declaration for remote modules

// ***AUTH MODULE***
declare module "auth/LoginForm" {
  interface LoginFormProps {
    onShowModal: () => void;
  }

  const LoginForm: React.ComponentType<LoginFormProps>;
  export default LoginForm;
}

declare module "auth/RegisterForm" {
  const RegisterForm: React.ComponentType;
  export default RegisterForm;
}

declare module "auth/ForgotPasswordEmailForm" {
  interface ForgotPasswordEmailFormProps {
    onCloseModal: () => void;
  }
  const ForgotPasswordEmailForm: React.ComponentType<ForgotPasswordEmailFormProps>;
  export default ForgotPasswordEmailForm;
}

declare module "auth/ForgotPasswordForm" {
  const ForgotPasswordForm: React.ComponentType;
  export default ForgotPasswordForm;
}

// ***PROFILE MODULE***
declare module "profile/UpdateProfileForm" {
  const UpdateProfileForm: React.ComponentType;
  export default UpdateProfileForm;
}

declare module "profile/ChangePasswordForm" {
  const ChangePasswordForm: React.ComponentType;
  export default ChangePasswordForm;
}

// ***USER PREFERENCES MODULE***
declare module "userPreferences/FavoritesProducts" {
  const FavoritesProducts: React.ComponentType;
  export default FavoritesProducts;
}

// ***CART MODULE***

declare module "cart/Cart" {
  const Cart: React.ComponentType;
  export default Cart;
}

// ***ORDERS MODULE***
declare module "orders/Orders" {
  const Orders: React.ComponentType;
  export default Orders;
}

// ***PAYMENTS MODULE***

declare module "payments/Payments" {
  const Payments: React.ComponentType;
  export default Payments;
}

// ***PRODUCTS MODULE***

declare module "products/ProductsList" {
  interface ProductsListProps {
    title: string;
    products?: any[];
  }
  const ProductsList: React.ComponentType<ProductsListProps>;
  export default ProductsList;
}

declare module "products/ProductDetail" {
  const ProductDetail: React.ComponentType;
  export default ProductDetail;
}

// ***ATTRIBUTES MODULE***

declare module "attributes/AttributesList" {
  const AttributesList: React.ComponentType;
  export default AttributesList;
}



// ***REVIEWS MODULE***

declare module "reviews/ReviewsList" {
  const ReviewsList: React.ComponentType;
  export default ReviewsList;
}