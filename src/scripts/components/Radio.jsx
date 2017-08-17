import React from 'react';

export default class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.id = (new Date).getTime() * Math.random();

        this.state = {
            isChecked: false
        };
    }

    componentDidMount() {
        if (this.props.result && this.props.result.includes(this.props.index)) {
            this.setState({
                isChecked: true
            })
        }
    }

    toggleRadioChange = (e) => {
        this.setState({
            isChecked: !this.state.isChecked,
        });

        if (this.props.handleSaveAnswer) {
            this.props.handleSaveAnswer(parseInt(e.target.name), this.props.index, e.target.checked)
        }
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