import React, {Component, PropTypes} from "react";
import request from "superagent-bluebird-promise";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

class WorkflowModal extends Component {
		render(props) {
			return (
				<Modal className="modal" show={this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <h2><Modal.Title id="contained-modal-title-lg">Global Workflow Content</Modal.Title></h2>
        <Modal.Body className="modal-body">
					<div>
						{JSON.stringify(this.props.workflowParams, null, 1)}
					</div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
	      </Modal>
			)
		}
}

export default WorkflowModal
