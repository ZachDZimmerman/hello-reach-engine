import React, {Component, PropTypes} from "react";
import request from "superagent-bluebird-promise";
import Modal from "react-bootstrap";

class Modal extends Component {

    constructor(props, context) {
        super(props, context);
        // initial modal state.
        this.state = {};
	}


// Array of the Global Workflows
var workflowNames = this.state.workflow.workflows;

// Checking to see if workflowNames is undefined
	if (!workflowNames) {
		return null;
	}
	console.log(workflowNames);



					<section>
						<h2>Workflow Content</h2>
						<summary>
								<div>Global Workflow Name: {this.state.workflow.id}</div>
								<div>Last Updated at: {this.state.workflow.lastUpdated}</div>
								<div>Workflow API: reachengine/api/workflows?/{this.state.workflow.id}</div>
						</summary>
						<aside>
							<pre>{JSON.stringify(this.state.workflow.workflows, null, 2)}</pre>
						</aside>
					</section>
}

export default Modal
