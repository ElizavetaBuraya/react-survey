import React from 'react';
import { Link } from 'react-router-dom';

export default class RenderTemplate extends React.Component {
    render() {
        let that = this;
        let templates = this.props.data.map(function(obj, index) {
            return <div className="template" key={index}>
                    <span className="active-template">
                        <Link to={`${obj.link}`} className="edit-template"/>
                        <span className="delete-template" onClick={() => that.props.handleDeleteTemplate(obj.id)}/>
                    </span>
                <h2>{ obj.name }</h2>
                <p>{ obj.description }</p>
                <p className="question-number">Вопросов: <span>{ obj.questions }&nbsp;</span></p>
                <p className="page-number">Страниц: <span>{ obj.pages }</span></p>
                <Link to="/new_survey" className="create-survey">Создать опрос</Link>
            </div>
        });
        let filteredTemplates = this.props.data.map(function(obj, index) {
            if ((that.props.filterText) &&
                obj.name.includes(that.props.filterText) ||
                obj.description.includes(that.props.filterText) ||
                obj.pages.toString().includes(that.props.filterText) ||
                obj.questions.toString().includes(that.props.filterText)
             ) {
                return <div className="template" key={index}>
                    <span className="active-template">
                        <Link to={`${obj.link}`} className="edit-template"/>
                        <span className="delete-template" onClick={() => that.props.handleDeleteTemplate(obj.id)}/>
                    </span>
                    <h2>{ obj.name }</h2>
                    <p>{ obj.description }</p>
                    <p className="question-number">Вопросов: <span>{ obj.questions }&nbsp;</span></p>
                    <p className="page-number">Страниц: <span>{ obj.pages }</span></p>
                    <Link to="/new_survey" className="create-survey">Создать опрос</Link>
                </div>
            }
        });
        return (
            <div className="available-templates">
                {!this.props.filterText && templates}
                {this.props.filterText && filteredTemplates}
            </div>
        )
    }
}