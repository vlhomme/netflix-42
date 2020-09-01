import React from "react";

class ProgressBar extends React.Component {

    render() {

        return (
            <div className="form-group col-md-8" id="progressBar">
                <label>Uploading {this.props.percentage === 100 ? "finished successfully" : "... " + this.props.percentage + "%"}</label>
                <div className="progress">
                    <div className="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: this.props.percentage + "%" }}>
                        <span className="sr-only">40% Complete (success)</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;