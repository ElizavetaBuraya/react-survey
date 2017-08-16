import React from 'react';

export default class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.id = (new Date).getTime() * Math.random();

        this.state = {
            isChecked: false
        };
    }

    toggleRadioChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    };

    render() {
        return(
            <div>
                {this.props.isEdited &&
                <p>
                    <input type='radio' id={this.id} name='radio-question'/>
                    <label>
                        <input type='text' defaultValue={this.props.answer}
                               onChange={(e) => this.props.handleEditAnswer(e.target.value, this.props.index)} />
                    </label>
                </p>
                }
                {!this.props.isEdited &&
                <p>
                    <input type='radio'
                           id={this.id}
                           name={this.props.name}
                           checked={this.state.isChecked}
                           onChange={this.toggleRadioChange}
                    />
                    <label htmlFor={this.id}>{this.props.answer}</label>
                </p>
                }
            </div>
        )
    }
}