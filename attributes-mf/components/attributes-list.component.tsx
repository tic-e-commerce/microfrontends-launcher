import React, { useEffect, useState } from "react";
import { getAttributesByProductId } from "@/services/attribute.service";
import styles from "@/styles/attributes.module.css";

const AttributesList = ({ productId }: { productId: number }) => {
  const [attributes, setAttributes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const data = await getAttributesByProductId(productId); // Llamada al servicio
        setAttributes(data);
      } catch (error) {
        console.error("Error al obtener los atributos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttributes();
  }, [productId]);

  if (loading) {
    return <p>Cargando atributos...</p>;
  }

  if (!attributes.length) {
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
