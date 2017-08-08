import React from 'react';
import classNames from 'classnames';
import GenerateQuestions from './GenerateQuestions.jsx'

function TabItem(props) {
    return  <li className='nav-item nav-tab-item'>
                <a className={(props.active ? 'active ' : '') + 'nav-link'}
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
                             active={tab.active}
                    />
                )}
            </ul>
        )
    }
}

class GenerateContent extends React.Component {
    render() {
            const tabClass = classNames({'tab-pane': true,
                'about-pane': this.props.currentPage === '/about',
        });
        const tabs = this.props.navtabs;
        const isAboutPage = (this.props.currentPage === '/about');
        const isSurveyPage = (this.props.currentPage === '/new_survey');
        return (
            <div className='tab-content'>
                {tabs.map((tab, index) =>
                    <div className={(tab.active ? 'active ' : '') + tabClass} id={tab.id} role='tabpanel' key={index}>
                        {isSurveyPage &&
                            <div className='survey-content'>
                                <i className='fa fa-trash fa-lg' aria-hidden='true' />
                                <input type='text' name='page-head' id='page_name' placeholder='Страница 1' /><br/>
                                {this.props.questions &&
                                    <GenerateQuestions questions = {this.props.questions}
                                                       handleUpdateQuestion = {this.props.handleUpdateQuestion}
                                                       handleDragQuestion = {this.props.handleDragQuestion}
                                                       handleDeleteQuestion = {this.props.handleDeleteQuestion}
                                    />
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
        let isSurveyPage = (this.props.currentPage === '/new_survey');
        return(
            <div className={isSurveyPage ? 'survey-page' : ''}>
                <TabsList navtabs={this.props.navtabs}/>
                <div className='tab-content'>
                    <GenerateContent navtabs={this.props.navtabs}
                                     currentPage={this.props.currentPage}
                                     questions = {this.props.questions}
                                     handleUpdateQuestion = {this.props.handleUpdateQuestion}
                                     handleDragQuestion = {this.props.handleDragQuestion}
                                     handleDeleteQuestion = {this.props.handleDeleteQuestion}
                    />
                </div>
            </div>
        )
    }
}