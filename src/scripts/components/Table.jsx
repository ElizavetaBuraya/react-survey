import React from 'react';
import Spinner from 'react-spinner-material';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function getCaret(direction) {
    return direction === 'desc'
        ?  <span className='sort-up'/>
        :  <span className='sort-down'/>;
}

const hiddenColumns = ['id','template', 'pages','questions', 'description', 'is_anonymous', 'questions_are_numbered',
    'pages_are_numbered', 'randomized', 'required_fields', 'progress_bar', 'questions_list', 'navtabs', 'surveys',
    'login', 'password'];

const linkColumns = ['link', 'results', 'respondent', 'edit_survey'];

export default class Table extends React.Component {
    render() {
        let isAdmin = (this.props.loggedInAs.role === 'Администратор');
        let columns = null;
        if (this.props.data.length > 0) {
            columns = Object.keys(this.props.data[0]);
        } else {
            columns = this.props.columnNames;
        }

        const selectRowProp = {
            mode: 'checkbox',
            onSelect: this.props.onRowSelect,
            onSelectAll: this.props.onSelectAll
        };

        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.props.afterSaveCell
        };

        const {data,
            options,
            surveyLink,
            fileLink,
            roles,
            columnNames,
            isFetching,
            search,
            pagination,
            type} = this.props;

        if (isFetching) {
            return (
                    <div className='spinner'>
                        <Spinner
                            size={120}
                            spinnerColor={"#FF0000"}
                            spinnerWidth={2}
                            visible={true} />
                    </div>
                )
        } else {
            return (
                <BootstrapTable data={data}
                                options={options}
                                ref='table'
                                searchPlaceholder={'Поиск'}
                                cellEdit={cellEditProp}
                                selectRow={(data.length > 0 && isAdmin)
                                    ? selectRowProp
                                    : undefined}
                                deleteRow={(isAdmin)}
                                search={search}
                                hover
                                pagination={pagination}
                >
                    {columns.map((key, index) =>
                        <TableHeaderColumn
                            key={index}
                            isKey={(key === 'id')}
                            dataField = {key}
                            dataFormat = {
                                (linkColumns.includes(key))
                                    ? surveyLink
                                    : (key === 'name' && type === 'file')
                                        ? fileLink
                                            : undefined
                            }
                            thStyle={ { 'text-align': 'center' } }
                            tdStyle={ { 'text-align': 'center' } }
                            width='120'
                            editable={(key === 'name' && !type)
                                ? true
                                : (key === 'role')
                                    ? { type: 'select', options: { values: roles }}
                                    : false }
                            dataSort = {(key === 'name')}
                            caretRender={ (key === 'name') ? getCaret : null }
                            hidden = {hiddenColumns.includes(key)}
                        >{columnNames[index]}</TableHeaderColumn>
                    )}
                </BootstrapTable>
            )
        }
    }
}