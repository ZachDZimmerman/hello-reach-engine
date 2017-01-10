import React, {Component, PropTypes} from "react";
import request from "superagent-bluebird-promise";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

class WorkflowModal extends Component {
		render(props) {
			return (
				<Modal className="modal" show={this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Title id="contained-modal-title-lg">
				Workflow API: HELLO</Modal.Title>
        <Modal.Body className="modal-body">
					<section>
						<aside className="paddingModal">
						{JSON.stringify(this.props.workflowParams, null, 4)}
						</aside>
					</section>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
	      </Modal>
			)
		}
}

export default WorkflowModal
