import React, { Component } from 'react';

class QuestionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.question.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.question.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditQuestion(this.props.question, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { question, onRemoveQuestion } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>
              {question.choices}
            </strong>{' '}
            {question.correctAnswers} {question.difficulty && <span>(Edited)</span>}
          </span>
        )}

        {editMode ? (
          <span>
            <button onClick={this.onSaveEditText}>Save</button>
            <button onClick={this.onToggleEditMode}>Reset</button>
          </span>
        ) : (
          <button onClick={this.onToggleEditMode}>Edit</button>
        )}

        {!editMode && (
          <button
            type="button"
            onClick={() => onRemoveQuestion(question.uid)}
          >
            Delete
          </button>
        )}
      </li>
    );
  }
}

export default QuestionItem;
