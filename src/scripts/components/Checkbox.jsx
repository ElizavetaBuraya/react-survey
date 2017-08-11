import React from 'react';

export default class Checkbox extends React.Component {
    render() {
        return(
            <div>
                {this.props.isEdited &&
                <p>
                    <input type='checkbox' id={this.props.id} name='checkbox-question'/>
                    <label>
                        <input type='text' defaultValue={this.props.answer}
                               onChange={(e) => this.props.handleEditAnswer(e.target.value, this.props.index) } />
                    </label>
                </p>
                }
                {!this.props.isEdited &&
                <p>
                    <input
                        type='checkbox'
                        id={this.props.id}
                        checked={this.props.isChecked}
                        name='checkbox-question' />
                    <label htmlFor={this.props.id}>{this.props.answer}</label>
                </p>
                }
            </div>
        )
    }
}
