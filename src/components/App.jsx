import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogInClick = this.handleLogInClick.bind(this);
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
    handleLogInClick() {
        let val;
        if (!this.state.isRegistered) {
            val = false;
            this.changeState();
        } else {
            val = true;
        }
        this.setState({
            isAuthorized: val
        });
    }
    render() {
        return (
            <div>
                <Header
                    handleChangeStateClick = {this.handleChangeStateClick}
                    isRegistered={this.state.isRegistered}
                    isAuthorized={this.state.isAuthorized}
                />
                <Main
                    isRegistered={this.state.isRegistered}
                    isAuthorized={this.state.isAuthorized}
                    handleChangeStateClick = {this.handleChangeStateClick}
                    handleLogInClick = {this.handleLogInClick}
                />
                <Footer />
            </div>
        )
    }
}

