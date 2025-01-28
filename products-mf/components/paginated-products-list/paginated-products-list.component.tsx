import React, { useEffect, useState } from "react";
import { Product } from "@/models";
import ProductCard from "../product-card/product-card.component";
import styles from "./paginated-products-list.module.css";
import { getProducts } from "@/services/products.service";

interface PaginatedProductsListProps {
  title?: string;
}

const PaginatedProductsList = ({ title }: PaginatedProductsListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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

    fetchProducts();
  }, []);

  // Lógica de filtrado y ordenamiento
  useEffect(() => {
    let filtered = [...products];

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category_id === Number(selectedCategory)
      );
    }

    // Filtrar por rango de precios
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filtrar por búsqueda
    filtered = filtered.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Ordenar por precio
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reinicia la página al cambiar filtros u ordenamiento
  }, [products, selectedCategory, priceRange, searchQuery, sortOrder]);

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
          <label className="form-label">Atributos</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            {/* Agrega más categorías según sea necesario */}
          </select>
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
      </div>

      {/* Controles de ordenamiento */}
      <div className="mb-4">
        <label className="form-label">Ordenar por precio</label>
        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "asc" | "desc" | "none")
          }
        >
          <option value="none">None</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
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
