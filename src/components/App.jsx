import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.handleRegisteredClick = this.handleRegisteredClick.bind(this);
        this.handleNotRegisteredClick = this.handleNotRegisteredClick.bind(this);
        this.state = {
            isRegistered: JSON.parse(sessionStorage.getItem('isRegistered')),
            isAuthorized: JSON.parse(sessionStorage.getItem('isAuthorized')),
        };
    }
    handleRegisteredClick() {
        sessionStorage.setItem('isRegistered', true);
        this.setState({
            isRegistered: true
        });
    }
    handleNotRegisteredClick() {
        sessionStorage.setItem('isRegistered', false);
        this.setState({
            isRegistered: false
        });
    }
    handleLogInClick() {
        sessionStorage.setItem('isAuthorized', true);
        this.setState({
            isAuthorized: true
        });
    }
    handleLogOutClick() {
        sessionStorage.setItem('isAuthorized', false);
        this.setState({
            isAuthorized: false
        });
    }
    render() {
        return (
            <div>
                <Header
                    handleRegisteredClick = {this.handleRegisteredClick}
                    isRegistered={this.state.isRegistered}
                    isAuthorized={this.state.isAuthorized}
                />
                <Main
                    isRegistered={this.state.isRegistered}
                    isAuthorized={this.state.isAuthorized}
                    handleLogInClick = {this.handleLogInClick}
                    handleLogOutClick = {this.handleLogOutClick}
                    handleNotRegisteredClick = {this.handleNotRegisteredClick}
                />
                <Footer />
            </div>
        )
    }
}

