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
import styles from "./DefaultTemplate.module.css";

const DefaultTemplate = forwardRef((props, ref) => {
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
        <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title && <p className={styles.title}>{item.title}</p>}
              {item.companyName && (
                <p className={styles.subTitle}>{item.companyName}</p>
              )}
              {item.certificationLink && (
                <a className={styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              )}
              {item.startDate && item.endDate && (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -{" "}
                  {getFormattedDate(item.endDate)}
                </div>
              )}
              {item.location ? (
                <p className={styles.date}>
                  <MapPin /> {item.location}
                </p>
              ) : (
                <p className={styles.date}>
                  <MapPin /> Remote
                </p>
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
        <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title && <p className={styles.title}>{item.title}</p>}
              {item.link && (
                <a className={styles.link} href={item.link}>
                  <Paperclip />
                  {item.link}
                </a>
              )}
              {item.github && (
                <a className={styles.link} href={item.github}>
                  <GitHub />
                  {item.github}
                </a>
              )}
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
        <div className={styles.sectionTitle}>{info.education.sectionTitle}</div>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title && <p className={styles.title}>{item.title}</p>}
              {item.college && (
                <p className={styles.subTitle}>{item.college}</p>
              )}
              {item.startDate && item.endDate && (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -{" "}
                  {getFormattedDate(item.endDate)}
                </div>
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
        <div className={styles.sectionTitle}>
          {info.achievement.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.achievement?.points?.length > 0 && (
            <ul className={styles.numbered}>
              {info.achievement.points.map((elem, index) => (
                <li className={styles.point} key={`${elem}-${index}`}>
                  {elem}
                </li>
              ))}
            </ul>
          )}
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
        <div className={styles.sectionTitle}>{info.summary.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info.summary?.detail}</p>
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
        <div className={styles.sectionTitle}>{info.other.sectionTitle}</div>
        <div className={styles.content}>
          <p className={styles.overview}>{info.other?.detail}</p>
        </div>
      </div>
    ),
  };

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
    }
  }, [props.activeColor]);

  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>{info.basicInfo?.detail?.name}</h1>
          <p className={styles.subHeading}>{info.basicInfo?.detail?.title}</p>
          <div className={styles.links}>
            {info.basicInfo?.detail?.email && (
              <a
                href={`mailto:${info.basicInfo.detail.email}`}
                className={styles.link}
              >
                <AtSign /> {info.basicInfo.detail.email}
              </a>
            )}
            {info.basicInfo?.detail?.phone && (
              <a
                href={`tel:${info.basicInfo.detail.phone}`}
                className={styles.link}
              >
                <Phone /> {info.basicInfo.detail.phone}
              </a>
            )}
            {info.basicInfo?.detail?.linkedin && (
              <a href={info.basicInfo.detail.linkedin} className={styles.link}>
                <Linkedin /> {info.basicInfo.detail.linkedin}
              </a>
            )}
            {info.basicInfo?.detail?.github && (
              <a href={info.basicInfo.detail.github} className={styles.link}>
                <GitHub /> {info.basicInfo.detail.github}
              </a>
            )}
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.col1}>
            {columns[0].map((item) => sectionDiv[item])}
          </div>
          <div className={styles.col2}>
            {columns[1].map((item) => sectionDiv[item])}
          </div>
        </div>
      </div>
    </div>
  );
});

export default DefaultTemplate;
