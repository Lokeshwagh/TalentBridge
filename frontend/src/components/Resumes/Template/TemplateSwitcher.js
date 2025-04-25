import React from "react";
import styles from "./TemplateSwitcher.module.css";

const templates = [
  { id: "default", name: "Default" },
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
];

const TemplateSwitcher = ({ activeTemplate, onChange }) => {
  return (
    <div className={styles.container}>
      <h3>Template:</h3>
      <div className={styles.templateList}>
        {templates.map((template) => (
          <button
            key={template.id}
            className={`${styles.templateButton} ${
              activeTemplate === template.id ? styles.active : ""
            }`}
            onClick={() => onChange(template.id)}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSwitcher;
