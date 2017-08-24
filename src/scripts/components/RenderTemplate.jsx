import React from 'react';
import { Link } from 'react-router-dom';

export default class RenderTemplate extends React.Component {
    render() {
        let templates = this.props.data.map(function(obj, index) {
        let { filterText, handleEditTemplate, handleDeleteTemplate, data } = this.props;
            return <div className='template-wrapper' key={index}>
                        <p className='active-template'>
                            <Link to={`/new_survey/${obj.link}`} className='edit-template'/>
                            <span className='delete-template' onClick={() => that.props.handleDeleteTemplate(obj.id)}/>
                        </p>
                        <div className='template'
                             tabIndex='0'
                             onClick={(e) => that.props.handleEditTemplate(e.currentTarget)}
                             onBlur={(e) => that.props.handleEditTemplate(e.currentTarget, 'hide')}
                        >
                            <h2>{ obj.name }</h2>
                            <p>{ obj.description }</p>
                            <p className='question-number'>Вопросов: <span>{ obj.questions }&nbsp;</span></p>
                            <p className='page-number'>Страниц: <span>{ obj.pages }</span></p>
                            <Link to={`/new_survey/create/${obj.link}`} className='create-survey'>Создать опрос</Link>
                        </div>
                   </div>
        });
        let filteredTemplates = this.props.data.map(function(obj, index) {
            if ((that.props.filterText) &&
                obj.name.includes(that.props.filterText) ||
                obj.description.includes(that.props.filterText) ||
                obj.pages.toString().includes(that.props.filterText) ||
                obj.questions.toString().includes(that.props.filterText)
            ) {
                return <div className='template-wrapper' key={index}>
                            <p className='active-template'>
                                <Link to={`/new_survey/${obj.link}`} className='edit-template'/>
                                <span className='delete-template' onClick={() => that.props.handleDeleteTemplate(obj.id)}/>
                            </p>
                            <div className='template'
                                 tabIndex='0'
                                 onClick={(e) => that.props.handleEditTemplate(e.currentTarget)}
                                 onBlur={(e) => that.props.handleEditTemplate(e.currentTarget, 'hide')}
                            >
                                <h2>{ obj.name }</h2>
                                <p>{ obj.description }</p>
                                <p className='question-number'>Вопросов: <span>{ obj.questions }&nbsp;</span></p>
                                <p className='page-number'>Страниц: <span>{ obj.pages }</span></p>
                                <Link to={`/new_survey/create/${obj.link}`} className='create-survey'>Создать опрос</Link>
                            </div>
                        </div>
            }
        });
        return (
            <div className='available-templates'>
                {!this.props.filterText && templates}
                {this.props.filterText && filteredTemplates}
            </div>
        )
    }
}