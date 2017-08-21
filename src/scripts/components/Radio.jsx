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
        const { isEdited, name, index, answer, handleEditAnswer } = this.props;
        return (
            <div>
                {isEdited &&
                <p>
                    <input type='radio' id={this.id} name='radio-question'/>
                    <label>
                        <input type='text' defaultValue={answer}
                               onChange={(e) => handleEditAnswer(e.target.value, index)} />
                    </label>
                </p>
                }
                {!this.props.isEdited &&
                <p>
                    <input type='radio'
                        id={this.id}
                        name={name}
                        checked={this.state.isChecked}
                        onChange={this.toggleRadioChange}
                    />
                    <label htmlFor={this.id}>{answer}</label>
                </p>
                }
            </div>
        )
    }
}