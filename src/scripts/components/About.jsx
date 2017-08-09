import React from 'react';
import Sidebar from './Sidebar.jsx';
import Tabs from './Tabs.jsx';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navtabs : [
                { 'href':'#about', 'id': 'about', 'name':'О нас', 'active':true },
                { 'href':'#training', 'id': 'training', 'name':'Обучение', 'active':false},
                { 'href':'#benefits', 'id': 'benefits', 'name':'Бенефиты', 'active':false},
                { 'href':'#students', 'id': 'students', 'name':'Для студентов', 'active':false},
                { 'href':'#pros', 'id': 'pros', 'name':'Наши преимущества', 'active':false},
                { 'href':'#vacancies', 'id': 'vacancies', 'name':'Вакансии', 'active':false},
                { 'href':'#contacts', 'id': 'contacts', 'name':'Контакты', 'active':false},
            ]
        }
    }

    componentDidMount() {
        if (this.props.currentPage !== '/about')
        {
            this.props.handleChangePage('/about');
        }
    }

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
                        <Tabs currentPage = '/about'
                              navtabs={this.state.navtabs}
                        />
                    </div>
                </div>
            </main>
        )
    }
}
