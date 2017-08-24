import React from 'react';
import Sidebar from './Sidebar.jsx';
import RenderTemplate from './RenderTemplate.jsx';
import Spinner from 'react-spinner-material';
import { Link } from 'react-router-dom';

export default class Templates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteTemplate = this.handleDeleteTemplate.bind(this);
        this.handleEditTemplate = this.handleEditTemplate.bind(this);
    }

    componentDidMount() {
        if (this.props.currentPage !== '/templates')
        {
            this.props.handleChangePage('/templates');
        }
        this.props.handleLoadSurveyData();
    }

    handleChange(event) {
        this.setState({
            filterText: event.target.value,
        })
    }

    handleDeleteTemplate(id) {
        let deleteTemplate = confirm('Вы уверены, что хотите удалить шаблон?');
        if (deleteTemplate) {
            this.props.handleDeleteTemplate(id);
        }
    }

    handleEditTemplate(target, display) {
        function show() {
            $(target).parent('.template-wrapper').find('.active-template').show();
            $('.template').css('box-shadow', 'none');
            $(target).parent('.template-wrapper').find('.template')
                .css('box-shadow','inset 0em 0em 0em .4em #e6e6e6');
        }

        function hide() {
            $('.template').css('box-shadow', 'none');
            $('.active-template').hide();
        }

        if (display) {
            setTimeout(hide, 100);
        } else {
            setTimeout(show, 110);
        }
    }

    render() {
        const { surveyData, isFetching } = this.props;

        return (
            <main className='d-flex flex-row justify-content-start'>
                <Sidebar
                    currentPage = {this.props.currentPage}
                />
                <div className='main-content'>
                    <div className='page-head d-flex justify-content-between align-items-center'>
                        <h1>Шаблоны <Link to='/new_survey/' className='create-survey'>Новый шаблон</Link></h1>
                        <div className='search-form'>
                            <input className='form-control'
                                   type='text'
                                   placeholder='Поиск'
                                   value={this.state.filterText}
                                   onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                    </div>
                    {isFetching &&
                        <div className='spinner'>
                            <Spinner
                                size={120}
                                spinnerColor={"#FF0000"}
                                spinnerWidth={2}
                                visible={true} />
                        </div>
                    }
                    {!isFetching &&
                        <RenderTemplate
                            handleDeleteTemplate={this.handleDeleteTemplate}
                            handleEditTemplate={this.handleEditTemplate}
                            filterText={this.state.filterText}
                            data={surveyData}
                        />
                    }
                </div>
            </main>
        )
    }
}