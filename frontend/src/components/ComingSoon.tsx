import { Modal } from "react-bootstrap";

interface CardModalProps {
  show: boolean;
  onHide: () => void;
}
const ComingSoonModal = (props: CardModalProps) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Coming Soon</h3>
      </div>
    </Modal>
  );
};

export default ComingSoonModal;
