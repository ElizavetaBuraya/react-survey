import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.state = {
            isRegistered: true,
            isAuthorized: false,
        };
    }
    handleRegisterClick(val) {
        this.setState({
            isRegistered: val
        });
    }
    render() {
        return (
            <div>
                <Header
                    isRegistered={this.state.isRegistered}
                    isAuthorized={this.state.isRegistered}
                    handleRegisterClick = {this.handleRegisterClick}
                />
                <Main
                    isRegistered={this.state.isRegistered}
                    handleRegisterClick = {this.handleRegisterClick}
                />
                <Footer />
            </div>
        )
    }
}
