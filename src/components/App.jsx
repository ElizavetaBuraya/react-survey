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
        this.handleChangeStateClick = this.handleChangeStateClick.bind(this);
        this.state = {
            isRegistered: true,
            isAuthorized: false,
        };
    }
    handleChangeStateClick() {
        let val;
        if (!this.state.isRegistered) {
            val = true;
        } else {
            val = false;
        }
        this.setState({
            isRegistered: val
        });
    }
    handleRegisteredClick() {
        this.setState({
            isRegistered: true
        });
    }
    handleNotRegisteredClick() {
        this.setState({
            isRegistered: false
        });
    }
    handleLogInClick() {
        this.setState({
            isAuthorized: true
        });
    }
    handleLogOutClick() {
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
                    handleNotRegisteredClick = {this.handleNotRegisteredClick}
                />
                <Footer />
            </div>
        )
    }
}

