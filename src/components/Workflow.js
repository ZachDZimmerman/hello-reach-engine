import React, {Component} from "react";
import request from "superagent-bluebird-promise";
import Dropdown from 'react-dropdown';

let test = ['Convert List to Collection', 'Enable Collection Watch Folder', 'Generate Timeline Proxies', 'Ingest Asset', 'Ingest Asset to Collection', 'Ingest To Folder Collection', 'Export Collection to NLE', 'Create Collection Repository', 'Post A Clip to Youtube', 'Upgrade Timeline']

class Workflow extends Component {

  constructor(props) {
    super(props);

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
    this.onSelect = this._onSelect.bind(this)
  }

  componentDidMount() {
    this.findWorkflows();
  }

  findWorkflows() {
    // building get for workflow API, then call the server for data.
    var searchUrl = `reachengine/api/workflows?fetchLimit=100&includeCommon=true&includeGlobal=true&userCanExecuteOnly=true`

    request
      .get(`${this.searchUrl}`)
      .type('application/json')
      .promise()
      .then(res => {
        this.setState({
					workflowData: this.state.results
				});


      })
  }

  _onSelect(option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
  }
  render() {
    const defaultOption = this.state.selected
    const placeHolderValue = typeof this.state.selected === 'string'
        ? this.state.selected
        : this.state.selected.label

    return (
        <div onSubmit={this.handleSubmit}>
            <strong>
                Select a Global Worflow
            </strong>
            <Dropdown options={test}/>
        </div>
    );
  }
}
export default Workflow
