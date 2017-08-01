import React from 'react';
import Sidebar from './Sidebar.jsx';
import { Link } from 'react-router-dom';

export default class Templates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{"name":"нет данных","pages":"нет данных","questions":"нет данных", "description":"нет данных"}],
            filterText: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteTemplate = this.handleDeleteTemplate.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:3000/surveys',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            success: function(data) {
                let templates = data.filter((obj) => obj.template === true);
                this.setState({data: templates});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleChange(event) {
        this.setState({
            filterText: event.target.value,
        })
    }

    handleDeleteTemplate(id) {
        let deleteTemplate = confirm("Вы уверены, что хотите удалить шаблон?");
        if (deleteTemplate) {
            $.ajax({
                url: 'http://localhost:3000/surveys/' + id ,
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({
                    "template":false
                }),
                success: function() {
                    $.get( "http://localhost:3000/surveys", function( data ) {
                        let templates = data.filter((obj) => obj.template === true);
                        this.setState({data: templates});
                    }.bind(this));
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }

    render() {
        let that = this;
        let templates = this.state.data.map(function(obj, index) {
            return <div className="template" key={index}>
                    <span className="active-template">
                        <Link to={`${obj.link}`} className="edit-template"/>
                        <span className="delete-template" onClick={() => that.handleDeleteTemplate(obj.id)}/>
                    </span>
                    <h2>{ obj.name }</h2>
                    <p>{ obj.description }</p>
                    <p className="question-number">Вопросов: <span>{ obj.pages }&nbsp;</span></p>
                    <p className="page-number">Страниц: <span>{ obj.questions }</span></p>
                    <Link to="/new_survey" className="create-survey">Создать опрос</Link>
                </div>
        });
        let filteredTemplates = this.state.data.map(function(obj, index) {
            if ((that.state.filterText) && obj.name.includes(that.state.filterText)) {
                return <div className="template" key={index}>
                    <span className="active-template">
                        <Link to={`${obj.link}`} className="edit-template"/>
                        <span className="delete-template" onClick={() => that.handleDeleteTemplate(obj.id)}/>
                    </span>
                    <h2>{ obj.name }</h2>
                    <p>{ obj.description }</p>
                    <p className="question-number">Вопросов: <span>{ obj.pages }&nbsp;</span></p>
                    <p className="page-number">Страниц: <span>{ obj.questions }</span></p>
                    <Link to="/new_survey" className="create-survey">Создать опрос</Link>
                </div>
            }
        });
        return (
            <main className="d-flex flex-row justify-content-start">
                <Sidebar />
                <div className="main-content">
                    <div className="page-head d-flex justify-content-between align-items-center">
                        <h1>Шаблоны <Link to="/new_survey" className="create-survey">Новый шаблон</Link></h1>
                        <div className="search-form">
                            <input className="search" type="text" placeholder="Search..." value={this.state.filterText} onChange={event => this.handleChange(event)} />
                        </div>
                    </div>
                    <div className="available-templates">
                        {!this.state.filterText && templates}
                        {this.state.filterText && filteredTemplates}
                    </div>
                </div>
            </main>
        )
    }
}
