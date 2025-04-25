import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";
import styles from "./ModernTemplate.module.css";

const ModernTemplate = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    achievement: information[sections.achievement],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    summary: information[sections.summary],
    other: information[sections.other],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    const pad = (num) => num.toString().padStart(2, "0");
    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        onDragOver={() => setTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${styles.section} ${
          info.workExp?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <h3 className={styles.sectionTitle}>{info.workExp.sectionTitle}</h3>
        <div className={styles.content}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              <div className={styles.itemHeader}>
                {item.title && <h4 className={styles.title}>{item.title}</h4>}
                {item.companyName && (
                  <p className={styles.subTitle}>{item.companyName}</p>
                )}
                <div className={styles.meta}>
                  {item.startDate && item.endDate && (
                    <span className={styles.date}>
                      <Calendar size={14} /> {getFormattedDate(item.startDate)}{" "}
                      - {getFormattedDate(item.endDate)}
                    </span>
                  )}
                  {item.location && (
                    <span className={styles.location}>
                      <MapPin size={14} /> {item.location}
                    </span>
                  )}
                </div>
              </div>
              {item.points?.length > 0 && (
                <ul className={styles.points}>
                  {item.points.map((elem, index) => (
                    <li className={styles.point} key={`${elem}-${index}`}>
                      {elem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => setTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`${styles.section} ${
          info.project?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <h3 className={styles.sectionTitle}>{info.project.sectionTitle}</h3>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              <div className={styles.itemHeader}>
                {item.title && <h4 className={styles.title}>{item.title}</h4>}
                <div className={styles.links}>
                  {item.link && (
                    <a href={item.link} className={styles.link}>
                      <Paperclip size={14} /> Live Demo
                    </a>
                  )}
                  {item.github && (
                    <a href={item.github} className={styles.link}>
                      <GitHub size={14} /> Source Code
                    </a>
                  )}
                </div>
              </div>
              {item.overview && (
                <p className={styles.overview}>{item.overview}</p>
              )}
              {item.points?.length > 0 && (
                <ul className={styles.points}>
                  {item.points.map((elem, index) => (
                    <li className={styles.point} key={`${elem}-${index}`}>
                      {elem}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => setTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${styles.section} ${
          info.education?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <h3 className={styles.sectionTitle}>{info.education.sectionTitle}</h3>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title && <h4 className={styles.title}>{item.title}</h4>}
              {item.college && (
                <p className={styles.subTitle}>{item.college}</p>
              )}
              {item.startDate && item.endDate && (
                <p className={styles.date}>
                  <Calendar size={14} /> {getFormattedDate(item.startDate)} -{" "}
                  {getFormattedDate(item.endDate)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        draggable
        onDragOver={() => setTarget(info.achievement?.id)}
        onDragEnd={() => setSource(info.achievement?.id)}
        className={`${styles.section} ${
          info.achievement?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <h3 className={styles.sectionTitle}>{info.achievement.sectionTitle}</h3>
        <div className={styles.content}>
          <ul className={styles.gridList}>
            {info.achievement?.points?.map((elem, index) => (
              <li className={styles.gridItem} key={`${elem}-${index}`}>
                {elem}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => setTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={`${styles.section} ${
          info.summary?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <h3 className={styles.sectionTitle}>{info.summary.sectionTitle}</h3>
        <div className={styles.content}>
          <p className={styles.summaryText}>{info.summary?.detail}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"other"}
        draggable
        onDragOver={() => setTarget(info.other?.id)}
        onDragEnd={() => setSource(info.other?.id)}
        className={`${styles.section} ${
          info.other?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <h3 className={styles.sectionTitle}>{info.other.sectionTitle}</h3>
        <div className={styles.content}>
          <p className={styles.otherText}>{info.other?.detail}</p>
        </div>
      </div>
    ),
  };

  // Same swap logic as DefaultTemplate
  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    const findIndex = (colIndex, id) =>
      tempColumns[colIndex].findIndex((item) => item === id);

    const sourceCol = columns[0].includes(source) ? 0 : 1;
    const targetCol = columns[0].includes(target) ? 0 : 1;

    const sourceIdx = findIndex(sourceCol, source);
    const targetIdx = findIndex(targetCol, target);

    [tempColumns[sourceCol][sourceIdx], tempColumns[targetCol][targetIdx]] = [
      tempColumns[targetCol][targetIdx],
      tempColumns[sourceCol][sourceIdx],
    ];

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.project, sections.education, sections.summary],
      [sections.workExp, sections.achievement, sections.other],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (container && props.activeColor) {
      container.style.setProperty("--color", props.activeColor);
      container.style.setProperty("--accent", `${props.activeColor}20`);
    }
  }, [props.activeColor]);

  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container}>
        <header className={styles.header}>
          <div className={styles.profile}>
            <h1 className={styles.name}>{info.basicInfo?.detail?.name}</h1>
            <p className={styles.title}>{info.basicInfo?.detail?.title}</p>
          </div>
          <div className={styles.contact}>
            {info.basicInfo?.detail?.email && (
              <a
                href={`mailto:${info.basicInfo.detail.email}`}
                className={styles.contactItem}
              >
                <AtSign size={18} /> {info.basicInfo.detail.email}
              </a>
            )}
            {info.basicInfo?.detail?.phone && (
              <a
                href={`tel:${info.basicInfo.detail.phone}`}
                className={styles.contactItem}
              >
                <Phone size={18} /> {info.basicInfo.detail.phone}
              </a>
            )}
            {info.basicInfo?.detail?.linkedin && (
              <a
                href={info.basicInfo.detail.linkedin}
                className={styles.contactItem}
              >
                <Linkedin size={18} /> {info.basicInfo.detail.linkedin}
              </a>
            )}
            {info.basicInfo?.detail?.github && (
              <a
                href={info.basicInfo.detail.github}
                className={styles.contactItem}
              >
                <GitHub size={18} /> {info.basicInfo.detail.github}
              </a>
            )}
          </div>
        </header>

        <main className={styles.main}>
          {columns.flat().map((item) => sectionDiv[item])}
        </main>
      </div>
    </div>
  );
});

export default ModernTemplate;
