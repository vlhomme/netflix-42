
import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';


class Home extends React.Component {

    render() {
        
        return (
            <div>
                <Header />
                <Sidebar/>
                <Footer />
            </div>
        );
    }
}

export default Home;