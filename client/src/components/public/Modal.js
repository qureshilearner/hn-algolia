import React from "react";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { MdClear } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

class ReactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
    };
  }
  // Modal.setAppElement(document.querySelector(".ReactModalPortal"));

  render() {
    let { modalIsOpen } = this.state;
    return (
      <>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          portalClassName="ReactModalPortal"
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <p className="close-modal" onClick={this.closeModal}>
            <MdClear />
          </p>
          {this.props.children}
        </Modal>
      </>
    );
  }

  openModal = (_) => {
    this.setState({ modalIsOpen: true });
  };

  // afterOpenModal = _ => {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = "#f00";
  // }

  closeModal = (_) => {
    this.setState({ modalIsOpen: false }, this.route);
  };

  route = () => {
    let { routeTo } = this.props;
    typeof routeTo !== "undefined" && this.props.history.push(`${routeTo}`);
  };
}

ReactModal.defaultProps = {
  modalIsOpen: true,
};

export default withRouter(ReactModal);
