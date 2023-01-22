import { Fragment, useState, useRef, useEffect } from "react";
import {
  FormDragRef,
  HandleDragOver,
  HandleDrop,
  HandleDragLeave,
  HandleDragEnter,
  HandleDragStart,
  ColorCodes,
  FormPages,
  FormDetail,
  FormSubmitData,
} from "types/Form";
import Section from "./Section";
import Field from "./Field";
import Header from "./Header";
import Responses from "./Responses";
import useForm from "hooks/useForm";
import Modal from "components/Modal";
import useTitle from "hooks/useTitle";
import useAuth from "hooks/useAuth";
import { FormProvider } from "context/form";
import { useNavigate, useParams } from "react-router-dom";
import {
  getFormById,
  sendResponse,
  updateFormById,
  checkResponseStatus,
} from "services/Form";
import { setFormTheme, focusElement, isEmpty } from "utils";
import { toast } from "react-toastify";

import styles from "./FormBuilder.module.scss";

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

const FormBuilder = (formPage: FormPages) => {
  let [selectedId, setSelectedId] = useState<string | null>(null);

  let [isSubmited, setIsSubmited] = useState(false);

  let [isResponded, setIsResponded] = useState(false);

  let [activeTab, setActiveTab] = useState(0);

  let [activeSection, setActiveSection] = useState<number>(0);

  let [dragId, setDragId] = useState<string | null>(null);

  let dragRef = useRef<FormDragRef>(initialDragRef);

  let focusFieldId = useRef<string | null>(null);

  let { formId } = useParams();

  let navigate = useNavigate();

  let { user, logout } = useAuth();

  let { isEdit, isFill } = formPage;

  const handleFormChange = async (data: FormDetail) => {
    if (!formId) return;

    await updateFormById({ formId, data });
  };

  let form = useForm<FormDetail>({
    ...(isEdit && { onChange: handleFormChange }),
  });

  let { formData, setFormData, reset, handleSubmit } = form;

  let { sections = [], colorCode, bgCode, title } = formData;

  useTitle(title);

  useEffect(() => {
    getFormDetails();
    if (isFill) getResponseStatus();
  }, [formId]);

  useEffect(() => {
    if (!focusFieldId.current) return;
    let element = document.querySelector(
      `[data-field-id='${focusFieldId.current}']`
    );
    if (element) focusElement(element);
    focusFieldId.current = null;
  }, [formData]);

  useEffect(() => {
    if (!colorCode || !bgCode) return;
    setFormTheme({ colorCode, bgCode });
  }, [colorCode, bgCode]);

  const getResponseStatus = async () => {
    if (!formId) return;

    let {
      data: { status },
    } = await checkResponseStatus(formId);
    setIsResponded(status);
  };

  const getFormDetails = async () => {
    if (!formId) return;

    const { data: formDetail } = await getFormById(formId);

    if (isEdit && formDetail.creatorId !== user?._id) {
      toast("Form creator only have the edit access", { type: "error" });
      navigate("/form/list");
    } else {
      setFormData(formDetail);
    }
  };

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

    let { dragElement } = dragRef.current;
    let form = { ...formData };

    if (dragElement) {
      focusFieldId.current = dragElement.getAttribute("data-field-id");
    }

    form.sections[destination.droppableId].fields.splice(
      destination.draggableId,
      0,
      form.sections[source.droppableId].fields.splice(source.draggableId, 1)[0]
    );

    setFormData(form);
  };

  const handleDragOver: HandleDragOver = (e) => {
    e.preventDefault();
  };

  const handleTheme = (theme: { colorCode: ColorCodes; bgCode: string }) => {
    setFormData({ ...formData, ...theme });
  };

  const onSubmit = (data: any, action: "next" | "back" | "submit") => {
    if (action === "next") {
      setActiveSection((section) => section + 1);
    } else if (action === "back") {
      setActiveSection((section) => section - 1);
    } else {
      submitResponse(data);
    }
  };

  const submitResponse = async (data: FormDetail) => {
    if (!formData._id) return;

    let body = {
      responses: getFormResponse(data),
      formId: formData._id,
    };
    await sendResponse(body);
    clearForm();
    setIsSubmited(true);
  };

  const getFormResponse = (data: FormDetail): FormSubmitData[] => {
    let formData = data.sections.reduce((formData, section) => {
      section.fields.forEach(
        ({ response, fieldType, other, otherReason, _id }) => {
          if (!_id) return;
          let data: FormSubmitData = {
            fieldId: _id,
            response: null,
          };
          if (other && otherReason) {
            if (fieldType === "radio" && response === "Other") {
              data.response = `Other : ${otherReason}`;
            } else if (
              fieldType === "checkbox" &&
              Array.isArray(response) &&
              response.includes("Other")
            ) {
              data.response = [
                ...response.filter((val) => val !== "Other"),
                `Other : ${otherReason}`,
              ];
            }
          } else if (response) {
            data.response = response;
          }
          formData.push(data);
        }
      );

      return formData;
    }, [] as FormSubmitData[]);

    return formData;
  };

  const onInvalid = (errors: any, action?: "next" | "back") => {
    if (action === "back") {
      setActiveSection((section) => section - 1);
    } else if (action === "next") {
      if (isEmpty(errors?.sections?.[activeSection])) {
        setActiveSection((section) => section + 1);
      }
    }
  };

  const clearForm = () => {
    reset();
    setActiveSection(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTitle = (title: string) => {
    setFormData({ ...formData, title });
  };

  return (
    <Fragment>
      {isEdit && (
        <Header
          activeTab={activeTab}
          colorCode={colorCode}
          bgCode={bgCode}
          title={title}
          user={user}
          logout={logout}
          handleTitle={handleTitle}
          handleTheme={handleTheme}
          setActiveTab={setActiveTab}
        />
      )}
      {activeTab === 0 && (
        <FormProvider {...form}>
          <div className={styles.bg}>
            <div className={styles.container}>
              {sections.map(
                ({ _id, title, description, fields }, sectionIndex) => {
                  if (isFill && !(sectionIndex === activeSection)) return null;

                  let sectionHeader =
                    sections.length > 1
                      ? `Section ${sectionIndex + 1} of ${sections.length}`
                      : undefined;

                  let isSelected = selectedId === sectionIndex.toString();

                  return (
                    <Fragment key={sectionIndex}>
                      <Section
                        title={title}
                        selectedId={selectedId}
                        description={description}
                        sectionIndex={sectionIndex}
                        sectionHeader={sectionHeader}
                        formPage={formPage}
                        isSelected={isSelected}
                        onClick={() => setSelectedId(sectionIndex.toString())}
                      />
                      <div
                        className={styles.wrapper}
                        {...(isEdit && {
                          "data-droppable-id": sectionIndex,
                          onDragEnter: (e) =>
                            handleDragEnter(e, sectionIndex, 0),
                          onDragLeave: (e) =>
                            handleDragLeave(e, sectionIndex, 0),
                          onDragOver: handleDragOver,
                          onDrop: handleDrop,
                        })}
                      >
                        {fields.map((field, fieldIndex) => {
                          let fieldId = `${sectionIndex}${fieldIndex}`;
                          let isSelected = selectedId === fieldId;
                          return (
                            <Field
                              key={fieldId}
                              field={field}
                              fieldId={fieldId}
                              tabIndex={-1}
                              sectionIndex={sectionIndex}
                              fieldIndex={fieldIndex}
                              formPage={formPage}
                              focusFieldId={focusFieldId}
                              isSelected={isSelected}
                              {...(isEdit && {
                                "data-field-id": fieldId,
                                "data-draggable-id": fieldIndex,
                                "data-droppable-id": sectionIndex,
                                draggable: dragId === fieldId,
                                onClick: () => setSelectedId(fieldId),
                                onDragStart: () =>
                                  handleDragStart(sectionIndex, fieldIndex),
                                onDragLeave: (e) =>
                                  handleDragLeave(e, sectionIndex, fieldIndex),
                                onDragEnter: (e) =>
                                  handleDragEnter(e, sectionIndex, fieldIndex),
                                onDragEnd: handleDragEnd,
                                setDragId: setDragId,
                              })}
                            />
                          );
                        })}
                      </div>
                    </Fragment>
                  );
                }
              )}
              {isFill && (
                <div className={styles.cta}>
                  <div>
                    {activeSection > 0 && (
                      <button
                        className={styles.btn_navigate}
                        onClick={handleSubmit(
                          (data) => onSubmit(data, "back"),
                          (errors) => onInvalid(errors, "back")
                        )}
                      >
                        Back
                      </button>
                    )}
                    {activeSection < sections.length - 1 && (
                      <button
                        className={styles.btn_navigate}
                        onClick={handleSubmit(
                          (data) => onSubmit(data, "next"),
                          (errors) => onInvalid(errors, "next")
                        )}
                      >
                        Next
                      </button>
                    )}
                    {activeSection === sections.length - 1 && (
                      <button
                        className={styles.btn_submit}
                        onClick={handleSubmit(
                          (data) => onSubmit(data, "submit"),
                          onInvalid
                        )}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                  <button className={styles.btn_clear} onClick={clearForm}>
                    Clear Form
                  </button>
                </div>
              )}
              <div className={styles.footer}>
                <span>Google Form</span>
              </div>
            </div>
          </div>
        </FormProvider>
      )}
      {activeTab === 1 && <Responses />}
      <Modal isOpen={isResponded}>
        <div>
          <span>Responded</span>
        </div>
      </Modal>
      <Modal isOpen={isSubmited}>
        <div>
          <span>Submited</span>
        </div>
      </Modal>
    </Fragment>
  );
};

export default FormBuilder;
