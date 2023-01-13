import { Fragment, useState, useRef } from "react";
import {
  FormDragValue,
  HandleDragOver,
  HandleDrop,
  HandleDragLeave,
  HandleDragEnter,
  HandleDragStart,
} from "types/Form";
import Section from "./Section";
import Field from "./Field";
import { useForm } from "hooks/useForm";
import { FormContext } from "context/form";
import Themes from "./Themes";

import { formData } from "json";

import styles from "./EditForm.module.scss";

let initialDragRef = {
  source: {
    droppableId: null,
    draggableId: null,
  },
  destination: {
    droppableId: null,
    draggableId: null,
  },
  dragElement: null,
};

const googleFormIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <rect x="-4" y="-4" fill="none" width="48" height="48"></rect>
    <g>
      <polygon
        fill="#56368A"
        points="24.5,10 30,11 34.5,10 24.5,0 23.2,4.7"
      ></polygon>
      <path
        fill="#7248B9"
        d="M24.5,10V0H8.2C6.7,0,5.5,1.2,5.5,2.7v34.5c0,1.5,1.2,2.7,2.7,2.7h23.6c1.5,0,2.7-1.2,2.7-2.7V10H24.5z"
      ></path>
      <path
        fill="#FFFFFF"
        d="M13.2,28.9c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4 C14.5,28.2,13.9,28.9,13.2,28.9z M13.2,23.4c-0.8,0-1.4-0.6-1.4-1.4s0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4S13.9,23.4,13.2,23.4z M13.2,17.9c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4C14.5,17.3,13.9,17.9,13.2,17.9z M28.2,28.6H16.8 v-2.3h11.4V28.6z M28.2,23.2H16.8v-2.3h11.4V23.2z M28.2,17.7H16.8v-2.3h11.4V17.7z"
      ></path>
    </g>
  </svg>
);

const EditForm = () => {
  const [formDetail, setFormDetail] = useState(formData);

  let [activeTab, setActiveTab] = useState(0);

  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [dragId, setDragId] = useState<string | null>(null);

  let { current: dragRef } = useRef<FormDragValue>(initialDragRef);

  let form = useForm(formDetail);

  let {
    formValues: { sections = [], colorCode, bgCode },
  } = form;

  const handleDragStart: HandleDragStart = (droppableId, draggableId) => {
    let dragElement = document.querySelector(
      `[data-draggable-id='${draggableId}'][data-droppable-id='${droppableId}']`
    ) as HTMLElement;

    dragRef = {
      ...dragRef,
      source: { droppableId, draggableId },
      dragElement,
    };
    setTimeout(() => {
      if (!dragElement) return;
      dragElement.style.visibility = "hidden";
    }, 0);
  };

  const handleDragEnter: HandleDragEnter = (
    event,
    droppableId,
    draggableId
  ) => {
    event.stopPropagation();
    let element = document.querySelector(
      `[data-draggable-id='${draggableId}'][data-droppable-id='${droppableId}']`
    ) as HTMLElement;
    dragRef = {
      ...dragRef,
      destination: { droppableId, draggableId },
    };
  };

  const handleDragLeave: HandleDragLeave = (
    event,
    droppableId,
    draggableId
  ) => {
    event.stopPropagation();
  };

  const handleDragEnd = () => {
    let { dragElement } = dragRef;

    if (dragElement) {
      dragElement.style.visibility = "visible";
    }
    setDragId(null);
    setTimeout(() => {
      dragRef = initialDragRef;
    }, 0);
  };

  const handleDrop: HandleDrop = () => {
    let { source, destination } = dragRef;

    if (
      typeof source.draggableId !== "number" ||
      typeof source.droppableId !== "number" ||
      typeof destination.draggableId !== "number" ||
      typeof destination.droppableId !== "number"
    )
      return;

    let form = { ...formDetail };

    form.sections[destination.droppableId].fields.splice(
      destination.draggableId,
      0,
      form.sections[source.droppableId].fields.splice(source.draggableId, 1)[0]
    );

    setFormDetail(form);
  };

  const handleDragOver: HandleDragOver = (e) => {
    // By default, data/elements cannot be dropped in other elements.
    // To allow a drop, we must prevent the default handling of the element
    e.preventDefault();
  };

  const handleTheme = (name: "colorCode" | "bgCode", code: string) => {
    setFormDetail({ ...formDetail, [name]: code });
  };

  const tabs = ["Questions", "Responses"];

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.header_top}>
          <div className={styles.form_title}>
            {googleFormIcon}
            <input name="title" defaultValue="Google Form" />
          </div>
          <div className={styles.header_icon}>
            <Themes
              colorCode={colorCode}
              bgCode={bgCode}
              onChange={handleTheme}
            />
            <i className="bx-show"></i>
            <div className={styles.avatar}>
              <span>AK</span>
            </div>
          </div>
        </div>
        <ul className={styles.header_bottom}>
          {tabs.map((label, index) => {
            let isActive = activeTab === index;
            return (
              <li
                key={index}
                className={`${styles.tab} ${
                  isActive ? styles.active : ""
                }`.trim()}
                onClick={() => setActiveTab(index)}
              >
                {label}
                {isActive && <div className={styles.indicator}></div>}
              </li>
            );
          })}
        </ul>
      </div>
      <FormContext.Provider value={form}>
        <div className={styles.container}>
          {sections.map(({ id, title, description, fields }, sectionIndex) => {
            let sectionHeader =
              sections.length > 1
                ? `Section ${sectionIndex + 1} of ${sections.length}`
                : undefined;

            return (
              <Fragment key={sectionIndex}>
                <Section
                  id={id}
                  title={title}
                  selectedId={selectedId}
                  description={description}
                  sectionIndex={sectionIndex}
                  sectionHeader={sectionHeader}
                  onClick={() => setSelectedId(id)}
                />
                <div
                  className={styles.wrapper}
                  data-droppable-id={sectionIndex}
                  onDragEnter={(e) => handleDragEnter(e, sectionIndex, 0)}
                  onDragLeave={(e) => handleDragLeave(e, sectionIndex, 0)}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {fields.map((field, fieldIndex) => {
                    return (
                      <Field
                        key={field.id}
                        field={field}
                        tabIndex={-1}
                        sectionIndex={sectionIndex}
                        fieldIndex={fieldIndex}
                        selectedId={selectedId}
                        data-draggable-id={fieldIndex}
                        data-droppable-id={sectionIndex}
                        draggable={dragId === field.id}
                        setDragId={setDragId}
                        onClick={() => setSelectedId(field.id)}
                        onDragStart={() =>
                          handleDragStart(sectionIndex, fieldIndex)
                        }
                        onDragLeave={(e) =>
                          handleDragLeave(e, sectionIndex, fieldIndex)
                        }
                        onDragEnter={(e) =>
                          handleDragEnter(e, sectionIndex, fieldIndex)
                        }
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              </Fragment>
            );
          })}
          <div className={styles.footer}>
            <span>Google Form</span>
          </div>
        </div>
      </FormContext.Provider>
    </Fragment>
  );
};

export default EditForm;
