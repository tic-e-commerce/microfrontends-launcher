import React, { useEffect, useState } from "react";
import { Product } from "@/models";
import ProductCard from "../product-card/product-card.component";
import styles from "./paginated-products-list.module.css";
import {
  getProducts,
  getAllAttributes,
  getAttributesByProductId,
} from "@/services/products.service";

interface PaginatedProductsListProps {
  title?: string;
}

const PaginatedProductsList = ({ title }: PaginatedProductsListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Atributos
  const [attributes, setAttributes] = useState<
    { attribute_id: number; attribute_name: string }[]
  >([]);
  const [selectedAttribute, setSelectedAttribute] = useState<string>("all");

  const PRODUCTS_PER_PAGE = 10; // Productos por página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts); // Inicialmente sin filtros
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAttributes = async () => {
      try {
        const attributesList = await getAllAttributes();
        setAttributes(attributesList);
      } catch (error) {
        console.error("Error fetching attributes:", error);
      }
    };

    fetchProducts();
    fetchAttributes();
  }, []);

  // Lógica de filtrado y ordenamiento
  useEffect(() => {
    const filterProducts = async () => {
      let filtered = [...products];

      // Filtrar por rango de precios
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      // Filtrar por búsqueda
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filtrar por atributo seleccionado
      if (selectedAttribute !== "all") {
        const filteredByAttribute = await Promise.all(
          filtered.map(async (product) => {
            const productAttributes = await getAttributesByProductId(
              product.product_id
            );
            return productAttributes.some(
              (attr: { attribute_id: number }) =>
                attr.attribute_id === Number(selectedAttribute)
            )
              ? product
              : null;
          })
        );

        filtered = filteredByAttribute.filter(
          (product) => product !== null
        ) as Product[];
      }

      // Ordenar por precio
      if (sortOrder === "asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered);
      setCurrentPage(1); // Reinicia la página al cambiar filtros u ordenamiento
    };

    filterProducts();
  }, [products, priceRange, searchQuery, sortOrder, selectedAttribute]);

  // Calcular los productos de la página actual
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.paginatedProductsContainer}>
      <h3 className="fw-bold mb-3">{title}</h3>

      {/* Controles de filtrado */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">Buscar</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Rango de precio</label>
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control me-2"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
            />
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
        </div>
        {/* Filtrar por atributos */}
        <div className="col-md-4">
          <label className="form-label">Filtrar por atributo</label>
          <select
            className="form-select pb-3 pt-2"
            value={selectedAttribute}
            onChange={(e) => setSelectedAttribute(e.target.value)}
          >
            <option key="all" value="all">
            </option>
            {attributes.map((attr) => (
              <option key={attr.attribute_id} value={attr.attribute_id}>
                {attr.attribute_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="row g-4">
        {currentProducts.map((product) => (
          <div key={product.product_id} className="col-lg-3 col-md-4 col-sm-6">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginatedProductsList;
