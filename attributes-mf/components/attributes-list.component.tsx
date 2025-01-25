import React from "react";
import styles from "@/styles/attributes.module.css";
const AttributesList = () => {
  const attributes = [
    { attribute_id: 1, attribute_name: "Material", value: "Leather" },
    { attribute_id: 2, attribute_name: "Color", value: "Black" },
    { attribute_id: 3, attribute_name: "Size", value: "Medium" },
    { attribute_id: 4, attribute_name: "Weight", value: "1.2kg" },
  ];

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
