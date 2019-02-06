import React from 'react';

import QuestionItem from './QuestionItem';

const QuestionList = ({
  questions,
  onEditQuestion,
  onRemoveQuestion,
}) => (
  <ul>
    {questions.map(question => (
      <QuestionItem
        key={question.uid}
        question={question}
        onEditQuestion={onEditQuestion}
        onRemoveQuestion={onRemoveQuestion}
      />
    ))}
  </ul>
);

export default QuestionList;
