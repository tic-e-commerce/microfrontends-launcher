const ProductActions = () => {
  return (
    <div className="product-actions">
      <div className="mb-3 d-flex align-items-center gap-3">
        <input
          type="number"
          className="form-control w-25"
          defaultValue={1}
          min={1}
        />
        <button className="btn btn-danger">Comprar ahora</button>
        <button className="btn btn-outline-secondary">Agregar al carrito</button>
      </div>

      <div className="mt-4">
        <p>✅ Envío gratuito</p>
        <p>🔄 Devoluciones garantizadas</p>
      </div>
    </div>
  );
};

export default ProductActions;
