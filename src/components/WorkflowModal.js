import React, {Component, PropTypes} from "react";
import request from "superagent-bluebird-promise";
import { Modal, Button } from "react-bootstrap";

class WorkflowModal extends Component {

    constructor(props) {
        super(props);
        // initial modal state.
				// this.state = {
				// 	show: false
				// }
				console.log("Hey", this.props.workflow);
	}

		render() {
			// For console logging
			if(!this.props.workflow) {
				return null;
			}

			return (
				<Modal show={this.props.show} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Workflow Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<section>
						<summary>
								<div>Global Workflow Name: {this.props.workflow.id}</div>
								<div>Last Updated at: {this.props.workflow.lastUpdated}</div>
								<div>Workflow API: reachengine/api/workflows?/{this.props.workflow.id}</div>
						</summary>
						<aside>
							<pre>{JSON.stringify(this.props.workflow, null, 2)}</pre>
						</aside>
					</section>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
				)
		}
}

export default WorkflowModal
