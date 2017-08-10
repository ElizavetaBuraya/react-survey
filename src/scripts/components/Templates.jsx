import React from 'react';
import Sidebar from './Sidebar.jsx';
import RenderTemplate from './RenderTemplate.jsx';
import { Link } from 'react-router-dom';

export default class Templates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{'name':'Нет данных','pages':'нет данных','questions':'нет данных', 'description':'нет данных'}],
            filterText: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.handleDeleteTemplate = this.handleDeleteTemplate.bind(this);
        this.handleEditTemplate = this.handleEditTemplate.bind(this);
    }

    onLoad() {
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

    componentDidMount() {
        this.onLoad();
        if (this.props.currentPage !== '/templates')
        {
            this.props.handleChangePage('/templates');
        }
    }

    handleChange(event) {
        this.setState({
            filterText: event.target.value,
        })
    }

    handleDeleteTemplate(id) {
        let deleteTemplate = confirm('Вы уверены, что хотите удалить шаблон?');
        if (deleteTemplate) {
            $.ajax({
                url: 'http://localhost:3000/surveys/' + id ,
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({
                    'template':false
                }),
                success: function() {
                    this.onLoad();
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
    }

    handleEditTemplate(event, target, display) {
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
        return (
            <main className='d-flex flex-row justify-content-start'>
                <Sidebar
                    currentPage = {this.props.currentPage}
                />
                <div className='main-content'>
                    <div className='page-head d-flex justify-content-between align-items-center'>
                        <h1>Шаблоны <Link to='/new_survey' className='create-survey'>Новый шаблон</Link></h1>
                        <div className='search-form'>
                            <input className='form-control' type='text' placeholder='Поиск' value={this.state.filterText} onChange={() => this.handleChange(this)} />
                        </div>
                    </div>
                    <RenderTemplate
                        handleDeleteTemplate={this.handleDeleteTemplate}
                        handleEditTemplate={this.handleEditTemplate}
                        filterText={this.state.filterText}
                        data={this.state.data}
                    />
                </div>
            </main>
        )
    }
}