import React from 'react';
import Sidebar from './Sidebar.jsx';
import { Link } from 'react-router-dom';

const templates = [
    { name:'Шаблон 1', pages: 3, questions: 12 },
    { name:'Шаблон 2', pages: 2, questions: 10 },
    { name:'Шаблон 3', pages: 1, questions: 12 },
    { name:'Шаблон 4', pages: 3, questions: 10 },
    { name:'Шаблон 5', pages: 2, questions: 12 },
    { name:'Шаблон 6', pages: 1, questions: 10 },
]

function activeTemplate() {
    return (
        <span id="active-template">
            <i className="fa fa-pencil-square fa-2x" aria-hidden="true" />
            <i className="fa fa-trash fa-2x" aria-hidden="true" />
        </span>
    )
}

export default class Templates extends React.Component {
    render() {
        return (
            <main className="d-flex flex-row justify-content-start">
                <Sidebar />
                <div className="main-content">
                    <div className="page-head d-flex justify-content-between align-items-center">
                        <h1>Шаблоны <Link to="/new_survey" className="create-survey">Новый шаблон</Link></h1>
                        <div className="search-form">
                            <input className="search" type="text" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="available-templates">
                        {templates.map((obj, index) =>
                        <div className="template">
                            <h2>{obj.name}</h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius.
                            </p>
                            <p className="question-number">Вопросов: <span>{obj.pages }&nbsp;</span></p>
                            <p className="page-number">Страниц: <span>{obj.questions}</span></p>
                            <a className="create-survey" href="#">Создать опрос</a>
                        </div> )}
                    </div>
                </div>
            </main>
        )
    }
}
