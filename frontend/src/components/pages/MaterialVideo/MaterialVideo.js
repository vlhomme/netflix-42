
import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';


class MaterialVideo extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <Sidebar />
                <div>
                    <div className="content-wrapper">
                        <section className="content">
                            <div className="content">

                                <section className="content">

                                    <div className="row">



                                        <div className="col-md-12">
                                            <div className="box box-primary">
                                                <div className="box-header with-border">
                                                    <h3 className="box-title">Video title</h3>

                                                    <div className="box-tools pull-right">
                                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                    </div>
                                                </div>
                                                <div className="box-body">
                                                    <div className="row" >
                                                        <h1>test</h1>
                                                        <video id="videoPlayer" controls>
                                                            <source src={process.env.REACT_APP_API_URL + "/video"} type="video/mp4" />
                                                        </video>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default MaterialVideo;