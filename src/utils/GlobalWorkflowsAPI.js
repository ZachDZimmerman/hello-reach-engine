import request from "superagent-bluebird-promise";

module.exports = {
		getGlobalWorkflows(name) {
			var workflowUrl = 'reachengine/api/workflows?fetchLimit=100&includeCommon=true&includeGlobal=true&userCanExecuteOnly=true'

		request
		.get(`${workflowUrl}`)
		.type('application/json')
		.promise()
		.then(res => {
				return res.body;
		});
	}
}
