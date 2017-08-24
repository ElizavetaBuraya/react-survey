import React from 'react';
import { Link } from 'react-router-dom';

export default class RenderTemplate extends React.Component {
    render() {
        let { filterText, handleEditTemplate, handleDeleteTemplate, data } = this.props;
        let templateData = (filterText)
            ? data.filter((obj) =>
                obj.name.includes(filterText)
                    || obj.description.includes(filterText)
                    || obj.pages.toString().includes(filterText)
                    || obj.questions.toString().includes(filterText))
                : data;


        let templates = templateData.map(function(obj, index) {
            return <div className='template-wrapper' key={index}>
                        <p className='active-template'>
                            <Link to={`/new_survey/${obj.link}`} className='edit-template'/>
                            <span className='delete-template' onClick={() => handleDeleteTemplate(obj.id)}/>
                        </p>
                        <div className='template'
                             tabIndex='0'
                             onClick={(e) => handleEditTemplate(e.currentTarget)}
                             onBlur={(e) => handleEditTemplate(e.currentTarget, 'hide')}
                        >
                            <h2>{obj.name}</h2>
                            <p>{obj.description}</p>
                            <p className='question-number'>Вопросов: <span>{obj.questions}&nbsp;</span></p>
                            <p className='page-number'>Страниц: <span>{obj.pages}</span></p>
                            <Link to={`/new_survey/create/${obj.link}`} className='create-survey'>Создать опрос</Link>
                        </div>
                   </div>
        });

        return (
            <div className='available-templates'>
                {templates}
            </div>
        )
    }
}