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

const Table = (props) => {
    const { data,
        options,
        surveyLink,
        fileLink,
        roles,
        columnNames,
        isFetching,
        search,
        pagination,
        type, loggedInAs, onSelectAll, onRowSelect, afterSaveCell } = props;

        let isAdmin = (loggedInAs.role === 'Администратор');

        let columns = (data.length > 0)
            ? Object.keys(data[0])
                : columnNames;

        const selectRowProp = {
            mode: 'checkbox',
            onSelect: onRowSelect,
            onSelectAll: onSelectAll
        };

        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: afterSaveCell
        };

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
                            thStyle={{ 'textAlign': 'center' }}
                            tdStyle={{ 'textAlign': 'center' }}
                            width='120'
                            editable={(key === 'name' && !type)
                                ? true
                                    : (key === 'role')
                                        ? {type: 'select', options: { values: roles }}
                                            : false}
                            dataSort = {(key === 'name')}
                            caretRender={(key === 'name') ? getCaret : null}
                            hidden = {hiddenColumns.includes(key)}
                        >{columnNames[index]}</TableHeaderColumn>
                    )}
                </BootstrapTable>
            )
        }
};

export default Table;