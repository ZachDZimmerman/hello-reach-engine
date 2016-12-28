import React, {Component, PropTypes} from "react";
import request from "superagent-bluebird-promise";

class Dropdown extends Component {

    constructor(props, context) {
        super(props, context);

			this.state = {
				options: []
			};
		}

		componentDidMount() {
			// setStateEvent(e)
			// 	e.preventDefault();
				// var test = this.state.work;

			// var component = this;
			return request
					.get(`10.0.1.85:8080/reachengine/api/workflows?fetchLimit=100&includeArchived=false&includeCommon=true&includeDisabled=false&includeGlobal=true&userCanExecuteOnly=true`)
					.type('application/json')
					.promise()
					.then(data => {
							this.setState({
								options: data
							});
					})
		}
		handleClick(e) {
				console.log("SELECTED", this.state.option);
				this.setState({
				options: e.target.value
			})
		}
		render() {
			var i = 0;

			var options = this.state.options.map(function (option) {
				return React.createElement(
					'option',
					{ value: options, key: i++ },
					option
				)
			});
		return React.createElement(
			'select',
			{ onChange: this.handleClick },
			options
		);
	}
}

export default Dropdown
