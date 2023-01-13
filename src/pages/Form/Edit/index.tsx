import { Fragment, useState, useRef } from "react";
import {
  FormDetail,
  FormDragValue,
  HandleDragOver,
  HandleDrop,
  HandleDragLeave,
  HandleDragEnter,
  HandleDragStart,
  FormContext as FormContextType,
} from "types/Form";
import Section from "./Section";
import Field from "./Field";
import { useForm } from "hooks/useForm";
import { FormContext } from "context/form";
import { formData } from "json";

import styles from "./Form.module.scss";

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

const EditForm = () => {
  const [formDetail, setFormDetail] = useState(formData);

  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [dragId, setDragId] = useState<string | null>(null);

  let dragRef = useRef<FormDragValue>(initialDragRef);

  let form = useForm(formData);

  let {
    formValues: { sections = [] },
  } = form;

  const handleDragStart: HandleDragStart = (droppableId, draggableId) => {
    let dragElement = document.querySelector(
      `[data-draggable-id='${draggableId}'][data-droppable-id='${droppableId}']`
    ) as HTMLElement;

    dragRef.current = {
      ...dragRef.current,
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
    dragRef.current = {
      ...dragRef.current,
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
    let { dragElement } = dragRef.current;

    if (dragElement) {
      dragElement.style.visibility = "visible";
    }
    setDragId(null);
    setTimeout(() => {
      dragRef.current = initialDragRef;
    }, 0);
  };

  const handleDrop: HandleDrop = () => {
    let { source, destination } = dragRef.current;

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

  return (
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
      </div>
    </FormContext.Provider>
  );
};

export default EditForm;
