import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

export default class NoMatch extends React.Component {
    render() {
        const { isAuthorized } = this.props;
        return (
            <main className='d-flex flex-column justify-content-center error-page'>
                <Route exact path='/starter_page' render={() => (
                    isAuthorized ? (
                        <Redirect to='/surveys'/>
                    ) : (
                        <Redirect to='/'/>
                    )
                )}/>
                <h1>404</h1>
                <p>Ничего не найдено. Вернуться обратно?</p>
                <Link to='/starter_page'>Стартовая страница</Link>
            </main>
        )
    }
}