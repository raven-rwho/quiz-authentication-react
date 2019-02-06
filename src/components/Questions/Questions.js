import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import QuestionList from './QuestionList';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      questions: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForQuestions();
  }

  onListenForQuestions = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .questions()
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let questions = [];
          snapshot.forEach(doc =>
            questions.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            questions: questions.reverse(),
            loading: false,
          });
        } else {
          this.setState({ questions: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateQuestion = (event, authUser) => {
    this.props.firebase.questions().add({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditQuestion = (question, text) => {
    this.props.firebase.question(question.uid).update({
      ...question,
      text,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveQuestion = uid => {
    this.props.firebase.question(uid).delete();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForQuestions,
    );
  };

  render() {
    const { users } = this.props;
    const { text, questions, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && questions && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {questions && (
              <QuestionList
              questions={questions.map(question => ({
                  ...question,
                  user: users
                    ? users[question.userId]
                    : { userId: question.userId },
                }))}
                onEditQuestion={this.onEditQuestion}
                onRemoveQuestion={this.onRemoveQuestion}
              />
            )}

            {!questions && <div>There are no Questions ...</div>}

            <form
              onSubmit={event =>
                this.onCreateQuestion(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Questions);
