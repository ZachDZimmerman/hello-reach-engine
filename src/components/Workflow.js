import React, {Component} from "react";
import Dropdown from 'react-dropdown';

let options = ['Zach', 'two', 'three']

class Workflow extends Component {

    constructor(props) {
        super(props);
        // initial search state.
        this.state = {
            selected: options[0]
        }
        this.onSelect = this._onSelect.bind(this)
    }
    _onSelect (option) {
      console.log('You selected ', option.label)
      this.setState({
        selected: option
      })
    }
      render() {
        const defaultOption = this.state.selected
        const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

      return (
        <section onSubmit={this.handleSubmit}>
          <Dropdown
            options={options}
            onChange={this._onSelect}
            value={defaultOption}
            placeholder="Select an option"
          />
          <div className='result'>
            You selected
            <strong> {placeHolderValue} </strong>
          </div>
        </section>
      );
    }
}
export default Workflow
