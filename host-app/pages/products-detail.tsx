import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import React from "react";

const ProductsList = dynamic(() => import("products/ProductsList"), {
  ssr: false,
});

const ProductDetail = dynamic(() => import("products/ProductDetail"), {
  ssr: false,
});

const AttributesList = dynamic(() => import("attributes/AttributesList"), {
  ssr: false,
});

const ProductsDetailPage = () => {
  const sampleProducts = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 40,
      rating: 4.5,
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 960,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 35,
      rating: 4.0,
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: 370,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 30,
      rating: 4.8,
    },
    {
      id: 4,
      name: "S-Series Comfort Chair",
      price: 375,
      imageUrl: "https://via.placeholder.com/200x150",
      discount: 25,
      rating: 4.5,
    },
  ];

  return (
    <div>
      <Header />
      <ProductDetail />
      <ProductsList title="Related Products" products={sampleProducts} />
      <AttributesList />
      <Footer />
    </div>
  );
};

export default ProductsDetailPage;
