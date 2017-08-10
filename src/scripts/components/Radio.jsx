import React from 'react';

export default class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        };
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked(event) {
        console.log(event.target.id);
        console.log(this.state.selected);
        this.setState({
            selected: event.target.id
        })
    }

    render() {
        return(
            <div>
                {this.props.isEdited &&
                <p>
                    <input type='radio' id={this.props.id} name='radio-question'/>
                    <label>
                        <input type='text' defaultValue={this.props.answer}
                               onChange={(e) => this.props.handleEditAnswer(e.target.value, this.props.index) } />
                    </label>
                </p>
                }
                {!this.props.isEdited &&
                <p>
                    <input type='radio'
                           id={this.props.id}
                           name='radio-question'
                           value={this.props.value}
                           checked={this.props.id === this.state.selected}
                           onChange={this.handleChecked}/>
                    <label htmlFor={this.props.id}>{this.props.answer}</label>
                </p>
                }
            </div>
        )
    }
}