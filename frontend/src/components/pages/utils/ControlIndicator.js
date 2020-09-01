
import React from "react";


class ControlIndicator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let adminValue = true;
        return (
            <div class="form-group">
            <label class="custom-control custom-checkbox">
            { this.props.pIsAdmin == adminValue ? <input type="checkbox" name="pIsAdmin" onChange={this.props.handleChange} style={{display:"none"}} class="custom-control-input" checked/>
            : <input type="checkbox" style={{display:"none"}} onChange={this.props.handleChange} name="pIsAdmin" class="custom-control-input" />}

                <span onClick={adminValue = false } class="custom-control-indicator"></span>{this.props.title}
            </label>
            </div>
        );
    }
}

export default ControlIndicator;