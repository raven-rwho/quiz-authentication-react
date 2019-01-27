import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      questions: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .questions()
      .onSnapshot(snapshot => {
        let questions = [];

        snapshot.forEach(doc =>
          questions.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          questions,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { questions, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {questions.map(question => (
            <li key={question.uid}>
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
                <Link
                  to={{
                    pathname: `${ROUTES.QUESTION_LIST}/${question.uid}`,
                    state: { question },
                  }}
                >
                Edit
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(QuestionList);
