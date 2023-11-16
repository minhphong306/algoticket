import React, { ReactNode } from "react";
import { Modal } from "react-bootstrap";

interface SuccessModalProps {
  show: boolean;
  onHide: () => void;
  onClickBtn: () => void;
  title: string;
  content: ReactNode;
  textButton: string;
}

const SuccessModal = (props: SuccessModalProps) => {
  return (
    <Modal show={props.show}>
      <Modal.Header closeButton onClick={props.onHide}></Modal.Header>
      <div className="modal-body space-y-20 pd-40">
        <h3 className="text-center">{props.title}</h3>
        <p className="text-center">{props.content}</p>
        <button className="btn btn-primary" onClick={props.onClickBtn}>
          {props.textButton}
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
