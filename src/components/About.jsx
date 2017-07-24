import React from 'react';
import Sidebar from './Sidebar.jsx';
import Tabs from './Tabs.jsx';

export default class About extends React.Component {
    render() {
        const isAuthorized = this.props.isAuthorized;
        return (
            <main className="d-flex flex-row justify-content-start">
                {
                    isAuthorized && <Sidebar />
                }
                <div className="main-content d-flex flex-column">
                    <div className="page-head about-page-head d-flex justify-content-start align-items-center">
                        <h1>iTechArt</h1>
                        <img src="img/placeholder.jpg" alt="splaceholder" height="200" width="500" />
                    </div>
                    <div className="tab-content-panel d-flex flex-column">
                        <Tabs />
                    </div>
                </div>
            </main>
        )
    }
}
