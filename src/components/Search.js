import React, {Component} from "react";
import request from "superagent-bluebird-promise";
import Griddle from "griddle-react";
import Select from "react-select";
import 'react-select/dist/react-select.css';


var test = [
	{label: 'Convert List to Collection'},
	{label: 'Enable Collection Watch Folder'},
	{label: 'Generate Timeline Proxies'},
	{label: 'Ingest Asset'},
	{label: 'Ingest Asset to Collection'},
	{label: 'Ingest To Folder Collection'},
	{label: 'Export Collection to NLE'},
	{label: 'Create Collection Repository'},
	{label: 'Post A Clip to Youtube'},
	{label: 'Upgrade Timeline'}
]

class Search extends React.Component {

	constructor(props, context) {
		super(props, context);

		var headers = [
			"thumbnail",
			"id",
			"inventoryKey",
			"name",
			"dateCreated",
			"dateUpdated"
		]

		// initial search state.
		this.state = {
			workflow: [],
			searchData: [],
			searchHeaders: headers,
			offset: 0,
			page: 0,
			total: 0,
			limit: 25,
			keywords: ""
		};
	}

	componentDidMount() {
		// initial search when we load.
		this.search();
		// Loading Global Workflows data
		this.getWorkflow();
	}
	getWorkflow() {
			// Get workflow from the Url params
			let {reachEngineUrl, sessionKeyHeader} = this.props.authenticationPayload;
			// Workflow records are retrieved through the workflows api
			request
				.get(`${reachEngineUrl}/reachengine/api/workflows?fetchLimit=100&includeCommon=true&userCanExecuteOnly=true`)
				.set(sessionKeyHeader)
				.type('application/json')
				.promise()
				.then(res => {
						this.setState({workflow: res.body.workflows});
						this.sortGlobalWorkflowNames();
				});
	}
	// Sorting Workflows
	sortGlobalWorkflowNames() {
		var workflowNameData = this.state.workflow;
		// var GlobalWorkflows = [];
		var getTheData = workflowNameData.map(function(GlobalWorkflows) {
			return GlobalWorkflows.name;
		});
		console.log(getTheData);
		//for loop to add value as a key inside of the options object
		// for (var i = 0; i <= namesofGlobalWorkflows.length; i++) {
		// 	var addValueLabel = 'value: ' + namesofGlobalWorkflows[i] + ',' + '' + 'label: ' + namesofGlobalWorkflows[i];
		// }
		this.setState({workflow: getTheData});
		//
		//
		// var namesForWorkflows = this.state.workflow.name.length;
		// for (var i = 0; i < namesForWorkflows; i++) {
		// 	namesForWorkflows[i].push(namesofGlobalWorkflows)
		// }
	}

	//what page is currently viewed
	setPage(index){
		// set the offset and page, then search
		var offset = index * this.state.limit;
		this.setState({offset: offset, page: index}, function() {
			this.search();
		});
	}

	setFilter(filter) {
		// set the state keywords, then call search
		this.setState({keywords:filter}, function() {
			this.search();
		});
	}

	search() {
		// build the search url, then call the server for data.
		var offsetLimit = `OFFSET ${this.state.offset} SIZE ${this.state.limit} ORDER_BY dateUpdated DESC`;
		var assetTypes = `types=video&types=image&types=document&types=other&types=collection&types=audio&types=clip&types=project`;
		var searchUrl = `reachengine/api/inventory/search?${assetTypes}&rql=${offsetLimit}&keywords=${this.state.keywords}`;

		request
			.get(`${this.props.authenticationPayload.reachEngineUrl}/${searchUrl}`)
			.type('application/json')
			.set(this.props.authenticationPayload.sessionKeyHeader)
			.promise()
			.then(res => {
				// total and results returned in the body, set them in our state vars.
				this.setState({total: res.body.total, searchData: res.body.results});
				// go build on the thumbnail urls
				this.getThumbs();
			});
	}

	getThumbs() {
		// build the thumb url for assets, attach them to the result object from search
		var results = [];
		var sessionKeyHeader = "?__sessionKey="+this.props.authenticationPayload.sessionKeyHeader.__sessionkey
		this.state.searchData.forEach(function(asset, index) {

			if (asset.inventoryKey === 'collection'
				|| asset.inventoryKey === 'audio'
				|| asset.inventoryKey === 'project')
				{

				// no thumbs for these.
				asset.thumbnail="";
			} else {
				// standard thumbnail url pattern
				var thubmnailUrl = `/reachengine/api/inventory/${asset.inventoryKey}s/${asset.id}/thumbnail/raw`;

				if (asset.inventoryKey === 'clip'){
					// clip thumbnail url pattern, from the videos api
					thubmnailUrl = `/reachengine/api/inventory/videos/${asset.inventoryKey}s/${asset.id}/thumbnail/raw`;
				}

				// img tag for embed
				asset.thumbnail=<img src={this.props.authenticationPayload.reachEngineUrl + thubmnailUrl + sessionKeyHeader} height="36"/>;
			}
			results.push(asset);
		}, this);
		this.setState({searchData: results});
	}

	render() {
		// For console logging
		if(!this.state.workflow) {
			return null;
		}

		var LinkComponent = React.createClass({
			render: function() {
				var url ="#/assets/" + this.props.rowData.inventoryKey + "/"+ this.props.rowData.id;
				return <a href={url}>{this.props.data}</a>
			}
		});

		var columnMeta = [
			{
				"columnName": "name",
				"customComponent": LinkComponent
			}
		];
		return (
		<div>
			<Select
			options={this.state.workflow}
			onChange={this.state.logChange}
			placeholder="Select a Global Workflow"
			searchable={false}
			clearable={false}
		/>
			<Griddle
			useExternal={true}
			externalSetFilter={::this.setFilter}
			externalSetPage={::this.setPage}
			externalCurrentPage={this.state.page}
			externalPageSize={this.state.limit}
			externalMaxPage={Math.round(this.state.total/this.state.limit)}
			results={this.state.searchData}
			columns={this.state.searchHeaders}
			columnMetadata={columnMeta}
			showFilter={true}/>;
		</div>
		)
	}
}

export default Search
