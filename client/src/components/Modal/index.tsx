import { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen?: boolean;
  toggle?: () => void;
  children?: ReactNode;
  width?: number;
  closeClickOnOutSide?: boolean;
  zIndex?: number;
};

const Modal = ({
  isOpen,
  toggle,
  children,
  width = 550,
  closeClickOnOutSide = true,
  zIndex,
}: ModalProps) => {
  return createPortal(
    <CSSTransition
      in={isOpen}
      unmountOnExit
      timeout={300}
      classNames={{
        enterActive: styles.modal_enter,
        exitActive: styles.modal_exit,
      }}
    >
      <div style={{ "--zIndex": zIndex } as CSSProperties}>
        <div
          className={styles.modal}
          onClick={() => {
            isOpen && closeClickOnOutSide && toggle?.();
          }}
        >
          <div
            className={styles.modal_dialog}
            style={{ "--modal-width": `${width}px` } as CSSProperties}
          >
            <div
              className={styles.modal_content}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </div>
        <div className={styles.modal_overlay}></div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
