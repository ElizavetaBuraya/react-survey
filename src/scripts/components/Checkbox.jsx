import React from 'react';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.id = (new Date).getTime() * Math.random();

        this.state = {
            isChecked :false,
        }
    }

    componentDidMount() {
        if (this.props.isChecked)
            {
                this.setState({
                    isChecked: this.props.isChecked
                })
            }
    }

    toggleCheckboxChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });

        if (this.props.onChange) {
            this.props.onChange(!this.state.isChecked);
        }
    };

    render() {
        return(
            <div>
                {this.props.isEdited &&
                <p>
                    <input type='checkbox' id={this.id} name='checkbox-question'/>
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
                        id={this.id}
                        checked={this.state.isChecked}
                        name={this.props.name}
                        onChange={this.toggleCheckboxChange}
                    />
                    <label htmlFor={this.id}>{this.props.answer}</label>
                </p>
                }
            </div>
        )
    }
}
