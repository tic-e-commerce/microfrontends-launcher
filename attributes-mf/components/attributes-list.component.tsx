import React from "react";

const AttributesList = () => {
  const attributes = [
    { attribute_id: 1, attribute_name: "Material", value: "Leather" },
    { attribute_id: 2, attribute_name: "Color", value: "Black" },
    { attribute_id: 3, attribute_name: "Size", value: "Medium" },
    { attribute_id: 4, attribute_name: "Weight", value: "1.2kg" },
  ];

  return (
    <div className="attributes-list">
      <h5 className="fw-bold mb-3">Attributes</h5>
      <div className="d-flex flex-wrap gap-2">
        {attributes.map((attribute) => (
          <span
            key={attribute.attribute_id}
            className="badge bg-primary text-white"
            style={{
              fontSize: "0.85rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "12px",
            }}
          >
            <strong>{attribute.attribute_name}:</strong> {attribute.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AttributesList;
