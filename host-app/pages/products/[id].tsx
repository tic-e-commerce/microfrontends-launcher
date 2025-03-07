import Footer from "@/components/Footer";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
import React from "react";
import { useRouter } from "next/router";

const ProductDetail = dynamic(() => import("products/ProductDetail"), {
  ssr: false,
  loading: () => <p>Loading component product detail...</p>,
});
const AttributesList = dynamic(() => import("attributes/AttributesList"), {
  ssr: false,
  loading: () => <p>Loading component attributes list ...</p>,
});
const ReviewsList = dynamic(() => import("reviews/ReviewsList"), {
  ssr: false,
  loading: () => <p>Loading component reviews list...</p>,
});
const ProductsList = dynamic(() => import("products/ProductsList"), {
  ssr: false,
  loading: () => <p>Loading component products list...</p>,
});

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID del producto de la URL

  // Si el ID aún no está disponible, mostrar un mensaje de carga
  if (!id) {
    return <p>Cargando...</p>;
  }

  const productId = parseInt(id as string, 10); // Convertir el ID a número

  return (
    <div>
      <Header />
      {/* Pasar el ID como prop a cada componente */}
      <ProductDetail productId={productId} />
      <AttributesList productId={productId} />
      <ReviewsList productId={productId} />
      <ProductsList title="Productos Relacionados" />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
