import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductsList = dynamic(() => import("products/ProductsList"), {
  ssr: false,
});

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <ProductsList title="Our Products" />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
