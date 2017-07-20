import React from 'react';
import Sidebar from './Sidebar.jsx';
import Tab_About from './Tab_About.jsx';

const navtabs = [
    { 'href':'#about', 'name':'О нас', 'active':'active' },
    { 'href':'#training', 'name':'Обучение', 'active':''},
    { 'href':'#benefits', 'name':'Бенефиты', 'active':''},
    { 'href':'#students', 'name':'Для студентов', 'active':''},
    { 'href':'#pros', 'name':'Наши преимущества', 'active':''},
    { 'href':'#vacancies', 'name':'Вакансии', 'active':''},
    { 'href':'#contacts', 'name':'Контакты', 'active':''},
];

function TabItem(props) {
    return  <li className="nav-item nav-tab-item">
                <a className={`nav-link ${props.active}`} data-toggle="tab" href={props.href} role="tab">{props.name}</a>
            </li>
}

function TabsList(props) {
    const tabs = props.tabs;
    return (
        <ul className="nav nav-tabs" role="tablist">
            {tabs.map((tab, index) =>
                <TabItem key={index}
                          href={tab.href}
                          name={tab.name}
                          active={tab.active}
                />
            )}
        </ul>
    );
}

export default class About extends React.Component {
    render() {
        return (
            <main className="d-flex flex-row justify-content-start">
                <Sidebar />
                <div className="main-content d-flex flex-column">
                    <div className="page-head about-page-head d-flex justify-content-start align-items-center">
                        <h1>iTechArt</h1>
                        <img src="img/placeholder.jpg" alt="splaceholder" height="200" width="500" />
                    </div>
                    <div className="tab-content-panel d-flex flex-column">
                        <div className="tab-content">
                            <TabsList tabs={navtabs}/>
                            <div className="tab-pane active" id="about" role="tabpanel">
                                <Tab_About/>
                            </div>
                            <div className="tab-pane" id="training" role="tabpanel">
                                <Tab_About/>
                            </div>
                            <div className="tab-pane" id="benefits" role="tabpanel">
                                <Tab_About/>
                            </div>
                            <div className="tab-pane" id="students" role="tabpanel">
                                <Tab_About/>
                            </div>
                            <div className="tab-pane" id="pros" role="tabpanel">
                                <Tab_About/>
                            </div>
                            <div className="tab-pane" id="vacancies" role="tabpanel">
                                <Tab_About/>
                            </div>
                            <div className="tab-pane" id="contacts" role="tabpanel">
                                <Tab_About/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
