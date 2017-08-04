import React from 'react';
import classNames from 'classnames';
import GenerateQuestions from './GenerateQuestions.jsx'

function TabItem(props) {
    return  <li className='nav-item nav-tab-item'>
                <a className={`nav-link ${props.active}`} data-toggle='tab' href={props.href} role='tab'>{props.name}</a>
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

class AboutContent extends React.Component {
    render() {
        const tabClass = classNames({'tab-pane about-pane': true,
            'active': this.props.isRegistered
        });
        const tabs = this.props.navtabs;
        return (
            <div className='tab-content'>
                {tabs.map((tab, index) =>
                    <div className={tabClass} id={tab.id} role='tabpanel' key={index}>
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
                )}
            </div>
        )
    }
}

class SurveyContent extends React.Component {
    render() {
        const tabClass = classNames({'tab-pane active': true
        });
        const tabs = this.props.navtabs;
        return (
            <div className='tab-content'>
                {tabs.map((tab, index) =>
                    <div className={tabClass} id={tab.id} role='tabpanel' key={index}>
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
                    </div>
                )}
            </div>
        )
    }
}

export default class Tabs extends React.Component {
    render() {
        let isAboutPage = (this.props.currentPage === '/about');
        let isSurveyPage = (this.props.currentPage === '/new_survey');
        return(
            <div className={isSurveyPage ? 'survey-page' : ''}>
                <TabsList navtabs={this.props.navtabs}/>
                <div className='tab-content'>
                    {isAboutPage && <AboutContent navtabs={this.props.navtabs}/>}
                    {isSurveyPage && <SurveyContent navtabs={this.props.navtabs}
                                                    questions = {this.props.questions}
                                                    handleUpdateQuestion = {this.props.handleUpdateQuestion}
                                                    handleDragQuestion = {this.props.handleDragQuestion}
                                                    handleDeleteQuestion = {this.props.handleDeleteQuestion}/>}
                </div>
            </div>
        )
    }
}