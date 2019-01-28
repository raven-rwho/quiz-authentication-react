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

  onEditQuestion = (message, text) => {
    this.props.firebase.message(message.uid).update({
      ...message,
      text,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  render() {
    const { question, loading } = this.state;

    return (
      <div>
        <h2>Question ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {question && (
          <div>
            <form>
              <span>
                <strong>ID: </strong> {question.uid}
              </span>
              <br />
              <span>
                <strong> Question: </strong>
                <input
                  type="text"
                  value={question.questions}
                  onChange={this.onChangeText}
                />
              </span>
              <br />
              <span>
                <strong> Choices: </strong>
                <input
                  type="text"
                  value={question.choices}
                  onChange={this.onChangeText}
                />
              </span>
              <br />
              <span>
                <strong> Answer: </strong>
                <input
                  type="text"
                  value={question.correctAnswers}
                  onChange={this.onChangeText}
                />
              </span>
              <br />
              <span>
                <strong> Difficulty: </strong>
                <input
                  type="text"
                  value={question.difficulty}
                  onChange={this.onChangeText}
                />
              </span>
              <br />
              <span>
                <strong> Image: </strong>
                <input
                  type="text"
                  value={question.images}
                  onChange={this.onChangeText}
                />
              </span>
              <br />
              <span>
                <button type="submit">Edit Question</button>
              </span>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(QuestionItem);
