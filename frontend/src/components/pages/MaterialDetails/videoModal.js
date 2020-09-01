import React from "react";

class Videomodal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        videoInfo: this.props.video
    };
  }

 
  
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.props.video !== nextProps.video){
        this.setState({
            videoInfo: nextProps.video
        })
    }
 }

  render() {
    return (
      <div key={this.props.videokey} className="modal fade" id="modal-default">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.video.videoTitle}</h4>
            </div>
            <div className="modal-body">
              <video
                id="videoPlayer"
                controls
                style={{ position: "relative", width: "100%", height: "50%" }}
              >
                <source
                  src={
                    process.env.REACT_APP_API_URL +
                    "/materials/video/" +
                    this.props.video.videoLink
                  }
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default pull-left"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Videomodal;
