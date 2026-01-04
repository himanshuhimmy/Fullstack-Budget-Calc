import React, { useContext, useEffect, useRef } from "react";
import ContextStore from "../Store/ContextStore";

const ModalBox = ({ children }) => {
  let modal = useRef();
  let { modalStatus } = useContext(ContextStore);

  useEffect(() => {
    if (modalStatus === true) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }
  }, [modalStatus]);

  return (
    <dialog
      className="rounded-3xl p-4 flex flex-col bg-teal-400 items-center justify-center m-auto"
      ref={modal}
    >
      {children}
    </dialog>
  );
};

export default ModalBox;
