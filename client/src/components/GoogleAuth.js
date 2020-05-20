import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../store/actions';

const GoogleAuth = ({ signIn, signOut, isSignedIn }) => {
  const authRef = useRef({});
  useEffect(() => {
    //load auth2 api from window scope
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '456032909023-o9827edomqbbmo7henehksv615vk1dhn.apps.googleusercontent.com',
          //Want to access the user email
          scope: 'email',
        })
        .then(() => {
          //Create the AuthInstance and save it
          authRef.current = window.gapi.auth2.getAuthInstance();
          //Set the authenticate status of the user to redux store, initially is false
          onAuthChange(authRef.current.isSignedIn.get());
          //Listen to anytime the user authentication status changes and call the onAuthChange function to update the state in the store
          authRef.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  //Call back function, tie to the context of the component
  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //Dispatch signIn action so redux can update the state
      const userId = authRef.current.currentUser.get().getId();
      signIn(userId);
    } else {
      signOut();
    }
  };

  const onSignInClick = () => {
    authRef.current.signIn();
  };

  const onSignOutClick = () => {
    authRef.current.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui green google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
