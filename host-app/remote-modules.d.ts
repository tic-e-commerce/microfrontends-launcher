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
  }
  const ProductsList: React.ComponentType<ProductsListProps>;
  export default ProductsList;
}

declare module "products/ProductDetail" {
  interface ProductDetailProps {
    productId?: number;
  }
  const ProductDetail: React.ComponentType<ProductDetailProps>;
  export default ProductDetail;
}

declare module "products/PaginatedProductsList" {
  interface PaginatedProductsListProps {
    title?: string;
    productId?: number;
  }
  const PaginatedProductsList: React.ComponentType<PaginatedProductsListProps>;
  export default PaginatedProductsList;
}

// ***ATTRIBUTES MODULE***

declare module "attributes/AttributesList" {
  interface AttributesListProps {
    productId?: number;
  } 
  const AttributesList: React.ComponentType<AttributesListProps>;
  export default AttributesList;
}



// ***REVIEWS MODULE***

declare module "reviews/ReviewsList" {
  interface ReviewsListProps {
    productId?: number;
  }
  const ReviewsList: React.ComponentType<ReviewsListProps>;
  export default ReviewsList;
}