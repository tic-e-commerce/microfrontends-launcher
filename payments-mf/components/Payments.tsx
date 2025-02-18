// import React, { useEffect, useState } from "react";
// import { createPaymentSession } from "@/services/payments.service"; 
// import { useRouter } from "next/router";
// import BillingForm from "./BillingForm";
// import PaymentCard from "./PaymentCard";

// const Payments: React.FC = () => {
//   const [order_id, setOrderId] = useState<string | null>(null);
//   const [user_id, setUserId] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     phoneNumber: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     firstName: false,
//     address: false,
//     city: false,
//     phoneNumber: false,
//   });

//   const [isTouched, setIsTouched] = useState({
//     firstName: false,
//     lastName: false,
//     address: false,
//     city: false,
//     phoneNumber: false,
//   });

//   const [isFormValid, setIsFormValid] = useState<boolean>(false);

//   const router = useRouter();

//   useEffect(() => {
//     validateForm();
//   }, [formData]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const storedUserId = localStorage.getItem("user_id");

//     if (!token) {
//       setError("Authorization token not found.");
//       router.push("/login");
//       return;
//     }

//     if (!storedUserId) {
//       setError("User ID not found.");
//       router.push("/login");
//       return;
//     }

//     setUserId(storedUserId);

//     const interval = setInterval(() => {
//       const storedOrderId = localStorage.getItem("order_id");
//       if (storedOrderId && storedOrderId !== order_id) {
//         setOrderId(storedOrderId);
//         clearInterval(interval);
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, [router, order_id]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });

//     if (id !== "lastName" && isTouched[id as keyof typeof isTouched]) {
//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         [id]: value.trim() === "",
//       }));
//     }
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setIsTouched((prevTouched) => ({ ...prevTouched, [id]: true }));

//     if (id !== "lastName") {
//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         [id]: value.trim() === "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const errors = {
//       firstName: formData.firstName.trim() === "",
//       address: formData.address.trim() === "",
//       city: formData.city.trim() === "",
//       phoneNumber: formData.phoneNumber.trim() === "",
//     };
//     setFormErrors(errors);
//     setIsFormValid(!Object.values(errors).includes(true));
//   };

//   /** ✅ Se vuelve a incluir la lógica de `createPaymentSession` **/
//   // const handleRedirectToStripe = async () => {
//   //   if (!isFormValid) {
//   //     setError("Please fill in all required fields.");
//   //     return;
//   //   }
  
//   //   const token = localStorage.getItem("token");
//   //   if (!token) {
//   //     setError("Authorization token not found.");
//   //     return;
//   //   }
  
//   //   const currentOrderId = localStorage.getItem("order_id");
  
//   //   if (!currentOrderId) {
//   //     setError("No active order found.");
//   //     return;
//   //   }
  
//   //   try {
//   //     setError(null);
//   //     setLoading(true);
  
//   //     const billingDetails = {
//   //       first_name: formData.firstName,
//   //       last_name: formData.lastName,
//   //       address: formData.address,
//   //       city: formData.city,
//   //       phone_number: formData.phoneNumber,
//   //     };
  
//   //     const paymentData = {
//   //       user_id: user_id as string,
//   //       order_id: currentOrderId,
//   //       currency: "usd",
//   //       billing_details: billingDetails,
//   //       success_url: `${window.location.origin}/payment-success`,  
//   //       cancel_url: `${window.location.origin}/payment-cancel`,  
//   //     };
  
//   //     console.log("Sending payment request:", paymentData);
//   //     const response = await createPaymentSession(paymentData, token);
  
//   //     if (response.data.url) {
//   //       window.location.href = response.data.url;
//   //     } else {
//   //       setError("Failed to retrieve payment URL.");
//   //     }
//   //   } catch (err: any) {
//   //     setError("Failed to create payment session.");
//   //     console.error("Payment Error:", err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  
//   const handleRedirectToStripe = async () => {
//     if (!isFormValid) {
//       setError("Please fill in all required fields.");
//       return;
//     }
  
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Authorization token not found.");
//       return;
//     }
  
//     const currentOrderId = localStorage.getItem("order_id");
  
//     if (!currentOrderId) {
//       setError("No active order found.");
//       return;
//     }
  
//     try {
//       setError(null);
//       setLoading(true);
  
//       // 🔥 Obtener dinámicamente la URL del frontend
//       const DYNAMIC_FRONTEND_URL = window.location.origin;
  
//       const billingDetails = {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         address: formData.address,
//         city: formData.city,
//         phone_number: formData.phoneNumber,
//       };
  
//       const paymentData = {
//         user_id: user_id as string,
//         order_id: currentOrderId,
//         currency: "usd",
//         billing_details: billingDetails,
//         success_url: `${DYNAMIC_FRONTEND_URL}/payment-success`,  
//         cancel_url: `${DYNAMIC_FRONTEND_URL}/payment-cancel`,
//       };
  
//       console.log("Sending payment request:", paymentData);
//       const response = await createPaymentSession(paymentData, token);
  
//       if (response.data.url) {
//         // 🔥 Si la URL devuelta por el backend es `localhost`, la sobrescribimos
//         const fixedUrl = response.data.url.includes("localhost")
//           ? response.data.url.replace("http://localhost", DYNAMIC_FRONTEND_URL)
//           : response.data.url;
  
//         console.log("Redirecting to:", fixedUrl);
//         window.location.href = fixedUrl;
//       } else {
//         setError("Failed to retrieve payment URL.");
//       }
//     } catch (err: any) {
//       setError("Failed to create payment session.");
//       console.error("Payment Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Billing Details</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {loading && <div className="alert alert-info">Processing payment...</div>}

//       {!order_id ? (
//         <div className="skeleton-loader"></div>
//       ) : (
//         <div className="row">
//           <div className="col-md-6 mx-auto">
//             <BillingForm
//               formData={formData}
//               formErrors={formErrors}
//               isTouched={isTouched}
//               handleInputChange={handleInputChange}
//               handleBlur={handleBlur}
//             />
//             <hr />
//             <PaymentCard
//               handleRedirectToStripe={handleRedirectToStripe}
//               isFormValid={isFormValid}
//               loading={loading}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payments;


import React, { useEffect, useState } from "react";
import { createPaymentSession, getPaymentSuccess, getPaymentCancel } from "@/services/payments.service"; 
import { useRouter } from "next/router";
import BillingForm from "./BillingForm";
import PaymentCard from "./PaymentCard";

const Payments: React.FC = () => {
  const [order_id, setOrderId] = useState<string | null>(null);
  const [user_id, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    address: false,
    city: false,
    phoneNumber: false,
  });

  const [isTouched, setIsTouched] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    phoneNumber: false,
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user_id");

    if (!token) {
      setError("Authorization token not found.");
      router.push("/login");
      return;
    }

    if (!storedUserId) {
      setError("User ID not found.");
      router.push("/login");
      return;
    }

    setUserId(storedUserId);

    const interval = setInterval(() => {
      const storedOrderId = localStorage.getItem("order_id");
      if (storedOrderId && storedOrderId !== order_id) {
        setOrderId(storedOrderId);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [router, order_id]);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (window.location.pathname === "/payment-success") {
        try {
          console.log("Verificando pago exitoso...");
          const response = await getPaymentSuccess();
          console.log("Respuesta de pago exitoso:", response.data);
          setError(null);
        } catch (error) {
          console.error("Error al verificar pago exitoso:", error);
          setError("Error al verificar el estado del pago.");
        }
      } else if (window.location.pathname === "/payment-cancel") {
        try {
          console.log("Verificando cancelación de pago...");
          const response = await getPaymentCancel();
          console.log("Respuesta de cancelación de pago:", response.data);
          setError("El pago ha sido cancelado.");
        } catch (error) {
          console.error("Error al verificar cancelación de pago:", error);
          setError("Error al verificar la cancelación del pago.");
        }
      }
    };

    checkPaymentStatus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id !== "lastName" && isTouched[id as keyof typeof isTouched]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === "",
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setIsTouched((prevTouched) => ({ ...prevTouched, [id]: true }));

    if (id !== "lastName") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: value.trim() === "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      firstName: formData.firstName.trim() === "",
      address: formData.address.trim() === "",
      city: formData.city.trim() === "",
      phoneNumber: formData.phoneNumber.trim() === "",
    };
    setFormErrors(errors);
    setIsFormValid(!Object.values(errors).includes(true));
  };

  const handleRedirectToStripe = async () => {
    if (!isFormValid) {
      setError("Please fill in all required fields.");
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found.");
      return;
    }
  
    const currentOrderId = localStorage.getItem("order_id");
  
    if (!currentOrderId) {
      setError("No active order found.");
      return;
    }
  
    try {
      setError(null);
      setLoading(true);
  
      const DYNAMIC_FRONTEND_URL = window.location.origin;
  
      const billingDetails = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        phone_number: formData.phoneNumber,
      };
  
      const paymentData = {
        user_id: user_id as string,
        order_id: currentOrderId,
        currency: "usd",
        billing_details: billingDetails,
        success_url: `${DYNAMIC_FRONTEND_URL}/payment-success`,  
        cancel_url: `${DYNAMIC_FRONTEND_URL}/payment-cancel`,
      };
  
      console.log("Sending payment request:", paymentData);
      const response = await createPaymentSession(paymentData, token);
  
      if (response.data.url) {
        const fixedUrl = response.data.url.includes("localhost")
          ? response.data.url.replace("http://localhost", DYNAMIC_FRONTEND_URL)
          : response.data.url;
  
        console.log("Redirecting to:", fixedUrl);
        window.location.href = fixedUrl;
      } else {
        setError("Failed to retrieve payment URL.");
      }
    } catch (err: any) {
      setError("Failed to create payment session.");
      console.error("Payment Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Billing Details</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Processing payment...</div>}

      {!order_id ? (
        <div className="skeleton-loader"></div>
      ) : (
        <div className="row">
          <div className="col-md-6 mx-auto">
            <BillingForm
              formData={formData}
              formErrors={formErrors}
              isTouched={isTouched}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
            />
            <hr />
            <PaymentCard
              handleRedirectToStripe={handleRedirectToStripe}
              isFormValid={isFormValid}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
