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
