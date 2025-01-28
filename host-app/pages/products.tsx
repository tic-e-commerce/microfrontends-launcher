import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaginatedProductsList = dynamic(() => import("products/PaginatedProductsList"), {
  ssr: false,
});

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <PaginatedProductsList title="Bienvenidos a nuestro e-commerce" />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
