import React, {Component} from "react";
import request from "superagent-bluebird-promise";
import Dropdown from "react-dropdown";

let test = ['Convert List to Collection', 'Enable Collection Watch Folder', 'Generate Timeline Proxies', 'Ingest Asset', 'Ingest Asset to Collection', 'Ingest To Folder Collection', 'Export Collection to NLE', 'Create Collection Repository', 'Post A Clip to Youtube', 'Upgrade Timeline']

class Workflow extends Component {

  constructor(props, context) {
    super(props, context);

    var headers = [
      "id",
      "subtype",
      "name"
    ]
    // initial search state.
    this.state = {
				selected: test[0],
        workflowData: [],
        workflowHeaders: headers
    }
  }
  componentDidMount() {
		this.findWorkflows()
  }

  findWorkflows() {
    // building get for workflow API, then call the server for data.
    var workflowUrl = 'reachengine/api/workflows?fetchLimit=100&includeCommon=true&includeGlobal=true&userCanExecuteOnly=true'

		request
		.get(`${workflowUrl}`)
		.type('application/json')
		.promise()

	}
	render() {
    return (
        <div>
            <strong>
                Select a Global Worflow
            </strong>
            <Dropdown options={test}/>
        </div>
    );
  }
}
export default Workflow
