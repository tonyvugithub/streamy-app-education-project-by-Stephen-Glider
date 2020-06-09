import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamList from './streams/StreamList';
import Header from './Header';
import history from '../history';

const StreamCreate = React.lazy(() => {
  return import('./streams/StreamCreate');
});

const StreamEdit = React.lazy(() => {
  return import('./streams/StreamEdit');
});

const StreamDelete = React.lazy(() => {
  return import('./streams/StreamDelete');
});

const StreamShow = React.lazy(() => {
  return import('./streams/StreamShow');
});

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route path="/" exact component={StreamList} />
              <Route
                path="/streams/new"
                exact
                render={(props) => <StreamCreate {...props} />}
              />
              <Route
                path="/streams/edit/:id"
                exact
                render={(props) => <StreamEdit {...props} />}
              />
              <Route
                path="/streams/delete/:id"
                exact
                render={(props) => <StreamDelete {...props} />}
              />
              <Route path="/streams/:id" exact component={StreamShow} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </div>
  );
};

export default App;
