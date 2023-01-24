import { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import { createForm, getAllForms, deleteFormById } from "services/Form";
import { getAllTemplates } from "services/Template";
import { FormData } from "types/Form";
import DropDown from "components/DropDown";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { googleFormIcon } from "utils";
import addIcon from "assets/images/add-icon.png";

import styles from "./FormList.module.scss";

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);

  const [templates, setTemplates] = useState<FormData[]>([]);

  useEffect(() => {
    getFormData();
  }, []);

  const getFormData = async () => {
    let [{ data: templates }, { data: forms }] = await Promise.all([
      getAllTemplates(),
      getAllForms(),
    ]);
    setTemplates(templates);
    setForms(forms);
  };

  const handleCreateFrom = async (templateId?: string) => {
    let body = templateId ? { templateId } : undefined;
    let { data } = await createForm(body);
    let form = [...forms];
    form.unshift(data);
    setForms(form);
    navigateToForm(data._id);
  };

  const navigateToForm = (formId: string) => {
    window.open(`#/form/${formId}/edit`);
  };

  const handleDeleteForm = async (formId: string) => {
    if (!window.confirm("Are you sure to delete this form?")) return;

    let {
      data: { message },
    } = await deleteFormById(formId);
    let form = [...forms];
    toast(message, { type: "success" });
    let index = form.findIndex(({ _id }) => _id === formId);
    form.splice(index, 1);
    setForms(form);
  };

  return (
    <Fragment>
      <Header />
      <div className={styles.container}>
        <div className={styles.template}>
          <div className={styles.wrapper}>
            <div className={styles.title}>
              <span>Start a new form</span>
            </div>
            <div className={styles.list}>
              <div className={styles.card} onClick={() => handleCreateFrom()}>
                <img src={addIcon} />
                <span>Blank</span>
              </div>
              {templates.map(({ _id, title }) => {
                return (
                  <div className={styles.card} key={_id}>
                    <img
                      src={`https://firebasestorage.googleapis.com/v0/b/form-b891e.appspot.com/o/template%2F${_id}.png?alt=media`}
                      onClick={() => handleCreateFrom(_id)}
                    />
                    <span>{title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <table className={styles.wrapper}>
            <thead>
              <tr>
                <th></th>
                <th>
                  <span>Title</span>
                </th>
                <th>
                  <span>Created at</span>
                </th>
                <th>
                  <span>Last updated at</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {forms.map(({ title, _id, createdAt, updatedAt }) => {
                return (
                  <Fragment>
                    <tr key={_id}>
                      <td>{googleFormIcon}</td>
                      <td>
                        <span>{title}</span>
                      </td>
                      <td>
                        <span>
                          {moment
                            .tz(createdAt, "Asia/Kolkata")
                            .format("MMM D, YYYY")}
                        </span>
                      </td>
                      <td>
                        <span>
                          {moment.tz(updatedAt, "Asia/Kolkata").fromNow()}
                        </span>
                      </td>
                      <td>
                        <div>
                          <i
                            id={`dropdown-${_id}`}
                            className="bx-dots-vertical-rounded"
                            onClick={(e) => e.stopPropagation()}
                          ></i>
                        </div>
                      </td>
                    </tr>
                    <DropDown
                      selector={`#dropdown-${_id}`}
                      placement="bottom"
                      className={styles.dropdown}
                    >
                      <DropDown.Item onClick={() => handleDeleteForm(_id)}>
                        <i className="bx-trash"></i>
                        <span>Remove</span>
                      </DropDown.Item>
                      <DropDown.Item onClick={() => navigateToForm(_id)}>
                        <i className="bx-link-external"></i>
                        <span>Open in new tab</span>
                      </DropDown.Item>
                    </DropDown>
                  </Fragment>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default FormList;
