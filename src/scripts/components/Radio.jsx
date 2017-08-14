import React from 'react';

export default class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked(event) {
        if (this.props.id === event.target.id) {
           this.setState({
               isChecked: true
           })
        } else {
            this.setState({
                isChecked: false
            })
        }
    }

    render() {
        return(
            <div>
                {this.props.isEdited &&
                <p>
                    <input type='radio' id={this.props.id} name='radio-question'/>
                    <label>
                        <input type='text' defaultValue={this.props.answer}
                               onChange={(e) => this.props.handleEditAnswer(e.target.value, this.props.index)} />
                    </label>
                </p>
                }
                {!this.props.isEdited &&
                <p>
                    <input type='radio'
                           id={this.props.id}
                           name={this.props.name}
                           value={this.props.answer}
                           onClick={this.handleChecked}/>
                    <label htmlFor={this.props.id}>{this.props.answer}</label>
                </p>
                }
            </div>
        )
    }
}