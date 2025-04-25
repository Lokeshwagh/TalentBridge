import React, { useRef, useState, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ArrowDown } from "react-feather";
import Editor from "../Editor/Editor";
import TemplateSwitcher from "../Template/TemplateSwitcher";
import DefaultTemplate from "../Template/DefaultTemplate";
import ModernTemplate from "../Template/ModernTemplate";
import ClassicTemplate from "../Template/ClassicTemplate";
import styles from "./Body.module.css";

function Body() {
  const colors = ["#239ce2","#0bc5ea", "#a0aec0","#000000"];
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };

  const resumeRef = useRef();
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [activeTemplate, setActiveTemplate] = useState("default");
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  const templates = {
    default: forwardRef((props, ref) => (
      <DefaultTemplate ref={ref} {...props} />
    )),
    modern: forwardRef((props, ref) => <ModernTemplate ref={ref} {...props} />),
    classic: forwardRef((props, ref) => (
      <ClassicTemplate ref={ref} {...props} />
    )),
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Resume Builder</h1>

      <div className={styles.toolbar}>
        <TemplateSwitcher
          activeTemplate={activeTemplate}
          onChange={setActiveTemplate}
        />

        <div className={styles.colors}>
          {colors.map((color) => (
            <span
              key={color}
              style={{ backgroundColor: color }}
              className={`${styles.color} ${
                activeColor === color ? styles.active : ""
              }`}
              onClick={() => setActiveColor(color)}
            />
          ))}
        </div>

        <button onClick={handlePrint}>
          Download PDF <ArrowDown size={18} />
        </button>
      </div>

      <div className={styles.main}>
        <div className={styles.editorContainer}>
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
          />
        </div>

        <div className={styles.resumePreview}>
          {React.createElement(templates[activeTemplate], {
            ref: resumeRef,
            sections,
            information: resumeInformation,
            activeColor,
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;
