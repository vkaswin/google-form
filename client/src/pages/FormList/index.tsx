import { Fragment, useEffect, useRef, useState } from "react";
import { createForm, getAllForms, deleteFormById } from "services/Form";
import { getAllTemplates } from "services/Template";
import { FormData, PageMeta } from "types/Form";
import DropDown from "components/DropDown";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import { googleFormIcon } from "utils";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Header from "./Header";
import Pagination from "components/Pagination";

import styles from "./FormList.module.scss";

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);

  const [pageMeta, setPageMeta] = useState({} as PageMeta);

  const [templates, setTemplates] = useState<FormData[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  let formRef = useRef<HTMLTableElement>(null);

  const searchParams = new URLSearchParams(location.search);

  let search = searchParams.get("search");
  let page = searchParams.get("page") || 1;

  useEffect(() => {
    getTemplates();
  }, []);

  useEffect(() => {
    getForms();
  }, [search, page]);

  const getTemplates = async () => {
    let { data } = await getAllTemplates();
    setTemplates(data);
  };

  const getForms = async () => {
    try {
      let {
        data: { list, pageMeta },
      } = await getAllForms({ limit: 15, search, page });
      setForms(list);
      setPageMeta(pageMeta);
    } finally {
      if (isLoading) setIsLoading(false);
    }
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
    navigate(`/form/${formId}/edit`);
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

  const handlePageChange = (page: number) => {
    navigate({
      search:
        page !== 0
          ? `?page=${page + 1}${search ? `&search=${search}` : ""}`
          : "",
    });
    if (formRef.current) formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Fragment>
      <Header search={search} user={user} logout={logout} />
      {isLoading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.template}>
            <div className={styles.wrapper}>
              <div className={styles.title}>
                <span>Start a new form</span>
              </div>
              <div className={styles.list}>
                <div className={styles.card} onClick={() => handleCreateFrom()}>
                  <img
                    src={require("assets/images/add-icon.png")}
                    draggable={false}
                  />
                  <span>Blank</span>
                </div>
                {templates.map(({ _id, title }) => {
                  return (
                    <div className={styles.card} key={_id}>
                      <img
                        src={require(`assets/images/templates/${_id}.png`)}
                        onClick={() => handleCreateFrom(_id)}
                        draggable={false}
                      />
                      <span>{title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.form}>
            <table ref={formRef} className={styles.wrapper}>
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
                {forms.length === 0 ? (
                  <tr aria-label="empty">
                    <td colSpan={5} align="center">
                      No Records Found
                    </td>
                  </tr>
                ) : (
                  forms.map(({ title, _id, createdAt, updatedAt }) => {
                    return (
                      <Fragment key={_id}>
                        <tr onClick={() => navigateToForm(_id)}>
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
                  })
                )}
              </tbody>
            </table>
            {pageMeta.totalPages > 1 && (
              <Pagination pageMeta={pageMeta} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FormList;
