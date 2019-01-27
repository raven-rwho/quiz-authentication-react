import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class QuestionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      question: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.question) {
      return;
    }

    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .question(this.props.match.params.id)
      .onSnapshot(snapshot => {
        this.setState({
          question: snapshot.data(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  onSendPasswordResetEmail = () => {
    //this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { question, loading } = this.state;

    return (
      <div>
        <h2>Question ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {question && (
          <div>
            <span>
              <strong>ID: </strong> {question.uid}
            </span>
            <span>
              <strong> Question: </strong> {question.questions}
            </span>
            <span>
              <strong> Choices: </strong> {question.choices}
            </span>
            <span>
              <strong> Answer: </strong> {question.correctAnswers}
            </span>
            <span>
              <strong> Difficulty: </strong> {question.difficulty}
            </span>
            <span>
              <strong> Image: </strong> {question.images}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Edit Question
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(QuestionItem);
