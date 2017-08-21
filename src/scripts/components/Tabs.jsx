import React from 'react';
import classNames from 'classnames';
import GenerateQuestions from './GenerateQuestions.jsx'

function TabItem(props) {
    return  <li className='nav-item nav-tab-item'
                onClick={() => {(props.handleChangePage) ? props.handleChangePage(props.id) : ""}}>
                <a className={(props.active ? 'active ' : '') + 'nav-link nav-tab-link'}
                   data-toggle='tab'
                   href={props.href}
                   role='tab'>{props.name}
                </a>
            </li>
}

class TabsList extends React.Component {
    render() {
        const tabs = this.props.navtabs;

        return (
            <ul className='nav nav-tabs' role='tablist'>
                {tabs.map((tab, index) =>
                    <TabItem key={index}
                             href={tab.href}
                             name={tab.name}
                             id={tab.id}
                             active={tab.active}
                             handleChangePage = {this.props.handleChangePage}
                    />
                )}
            </ul>
        )
    }
}

class GenerateContent extends React.Component {
    render() {
        const { navtabs,
            currentPage,
            questions_list,
            survey_page,
            handleDeletePage,
            handleUpdateQuestion,
            handleDragQuestion,
            handleDeleteQuestion,
            handleChangePageName,
            questions_are_numbered,
            required_fields } = this.props;

        const tabClass = classNames({'tab-pane': true,
            'about-pane': currentPage === '/about',
        });

        const deleteClass = classNames({'delete-page': true,
            'inactive-delete': survey_page === 'page_1',
        });

        const isAboutPage = (currentPage === '/about');
        const isSurveyPage = (currentPage === '/new_survey');
        return (
            <div className='tab-content'>
                {navtabs.map((tab, index) =>
                    <div className={(tab.active ? 'active ' : '') + tabClass} id={tab.id} role='tabpanel' key={index}>
                        {isSurveyPage &&
                            <div className='survey-content'>
                                <span className={deleteClass} aria-hidden='true' onClick={() => handleDeletePage(tab.id)}/>
                                <input type='text'
                                       name='page-head'
                                       value={tab.name}
                                       maxLength="12"
                                       onChange={(e) => handleChangePageName(e.target.value, tab.id)}
                                /><br/>
                                {questions_list[survey_page] &&
                                    <GenerateQuestions questions_list = {questions_list}
                                                       survey_page = {survey_page}
                                                       handleUpdateQuestion = {handleUpdateQuestion}
                                                       handleDragQuestion = {handleDragQuestion}
                                                       handleDeleteQuestion = {handleDeleteQuestion}
                                                       questions_are_numbered = {questions_are_numbered}
                                                       required_fields = {required_fields}
                                    />
                                }
                                {!questions_list[survey_page] &&
                                    <em>Добавьте вопрос, выбрав нужный тип вопроса в меню опроса</em>
                                }
                            </div>
                        }
                        {isAboutPage &&
                            <div>
                                <img src='img/placeholder_2.png' alt='placeholder' height='200' />
                                <p>
                                    Page {index + 1}.<br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper
                                    elementum libero sed lacinia. Quisque ac quam tempus, aliquet nibh vitae, lobortis ex.
                                    Aliquam posuere interdum ex vitae pretium. Mauris ac odio in ex feugiat varius. Nam nec
                                    fringilla diam. Phasellus ac nibh sit amet nisl viverra posuere. Nulla vehicula commodo eros
                                    eu posuere. Fusce finibus ligula pharetra, fringilla elit et, vestibulum mauris. Interdum et
                                    malesuada fames ac ante ipsum primis in faucibus.
                                </p>
                            </div>
                        }
                    </div>
                )}
            </div>
        )
    }
}

export default class Tabs extends React.Component {
    render() {
        const { navtabs,
            currentPage,
            questions_list,
            survey_page,
            handleDeletePage,
            handleUpdateQuestion,
            handleDragQuestion,
            handleDeleteQuestion,
            handleChangePage,
            handleChangePageName,
            questions_are_numbered,
            required_fields } = this.props;

        let isSurveyPage = (currentPage === '/new_survey');

        return(
            <div className={isSurveyPage ? 'survey-page' : ''}>
                <TabsList navtabs={navtabs}
                          handleChangePage = {handleChangePage}/>
                <div className='tab-content'>
                    <GenerateContent navtabs={navtabs}
                                     currentPage={currentPage}
                                     questions_list = {questions_list}
                                     survey_page = {survey_page}
                                     handleUpdateQuestion = {handleUpdateQuestion}
                                     handleDragQuestion = {handleDragQuestion}
                                     handleDeleteQuestion = {handleDeleteQuestion}
                                     handleChangePageName = {handleChangePageName}
                                     handleDeletePage = {handleDeletePage}
                                     questions_are_numbered = {questions_are_numbered}
                                     required_fields = {required_fields}
                    />
                </div>
            </div>
        )
    }
}