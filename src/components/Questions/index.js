import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const QuestionListPage = () => (
    <div>
      <h1>List of Questions</h1>
      <p>This is the list of questions.</p>
  
      <Switch>
        <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
        <Route exact path={ROUTES.ADMIN} component={UserList} />
      </Switch>
    </div>
  );

  const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

  export default compose(
    withEmailVerification,
    withAuthorization(condition),
  )(QuestionListPage);