import React, { useEffect, useState } from "react";
import styles from "@/styles/attributes.module.css";
import { getAttributesByProductId } from "@/services/attributes.service";

interface Attribute {
  attribute_id: number;
  attribute_name: string;
  value: string;
}

interface AttributesListProps {
  productId: number;
}

const AttributesList: React.FC<AttributesListProps> = ({ productId }) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        setLoading(true);
        setError(null); // Reinicia el error en cada solicitud

        const data = await getAttributesByProductId(productId);
        setAttributes(data);
      } catch (error) {
        console.error("Error al obtener los atributos:", error);
        setError("Hubo un problema al cargar los atributos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttributes();
  }, [productId]);

  if (loading) {
    return <p>Cargando atributos...</p>;
  }

  if (error) {
    return <p className={styles["error-message"]}>{error}</p>;
  }

  if (attributes.length === 0) {
    return <p>No hay atributos disponibles para este producto.</p>;
  }

  return (
    <div className={styles["attributes-list"]}>
      <div className="d-flex flex-wrap gap-2">
        {attributes.map((attribute) => (
          <span key={attribute.attribute_id} className={styles["attributes-badge"]}>
            <strong>{attribute.attribute_name}:</strong> {attribute.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AttributesList;
