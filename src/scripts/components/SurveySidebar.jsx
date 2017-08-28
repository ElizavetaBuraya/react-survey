import React from 'react';
import Checkbox from './Checkbox.jsx'

const SurveySidebar = (props) => {
    const { handleAddQuestion,
        handleChangeSurveySettings,
        handleTogglePanel,
        is_anonymous,
        questions_are_numbered,
        pages_are_numbered,
        randomized,
        required_fields,
        progress_bar } = props;

    return(
        <aside className='survey-sidebar' id='sidebar'>
            <a className='survey-sidebar-collapse' id='sidebarCollapse' onClick={handleTogglePanel}/>
            <div className='params'>
                <p  className='params-list'>Тип вопроса</p>
                <ul className='question-type-list'>
                    <li className='single-answer' onClick={() => handleAddQuestion('single-choice')}>Варианты ответа (один)</li>
                    <li className='multiple-answer' onClick={() => handleAddQuestion('multi-choice')}>Варианты ответа (несколько)</li>
                    <li className='text-answer' onClick={() => handleAddQuestion('text')}>Текст</li>
                    <li className='file-answer' onClick={() => handleAddQuestion('file')}>Файл</li>
                    <li className='star-answer' onClick={() => handleAddQuestion('rating')}>Рейтинг в звездах</li>
                    <li className='range-answer' onClick={() => handleAddQuestion('scale')}>Шкала</li>
                </ul>
            </div>
            <div className='params'>
                <p className='params-list'>Параметры опроса</p>
                <ul className='survey-params-list'>
                    <li>
                        <Checkbox answer = 'Анонимный опрос'
                                  id = 'anonymous'
                                  isChecked = {is_anonymous}
                                  onChange={(val) => handleChangeSurveySettings('is_anonymous', val)}
                        />
                    </li>
                    <li>
                        <Checkbox answer = 'Номера вопросов'
                                  id = 'questions-are-numbered'
                                  isChecked = {questions_are_numbered}
                                  onChange={(val) => handleChangeSurveySettings('questions_are_numbered', val)}
                        />
                    </li>
                    <li>
                        <Checkbox answer = 'Номера страниц'
                                  id = 'pages-are-numbered'
                                  isChecked = {pages_are_numbered}
                                  onChange={(val) => handleChangeSurveySettings('pages_are_numbered', val)}
                        />
                    </li>
                    <li>
                        <Checkbox answer = 'Случайный порядок вопросов'
                                  id = 'random-order'
                                  isChecked = {randomized}
                                  onChange={(val) => handleChangeSurveySettings('randomized', val)}
                        />
                    </li>
                    <li>
                        <Checkbox answer = 'Звездочки обязательных полей'
                                  id = 'compulsory'
                                  isChecked = {required_fields}
                                  onChange={(val) => handleChangeSurveySettings('required_fields', val)}
                        />
                    </li>
                    <li>
                        <Checkbox answer = 'Индикатор выполнения'
                                  id = 'progress'
                                  isChecked = {progress_bar}
                                  onChange={(val) => handleChangeSurveySettings('progress_bar', val)}
                        />
                    </li>
                </ul>
            </div>
        </aside>
    )
};

export default SurveySidebar;