import React from 'react';


export default class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div id="dialog-register" title="Register new user">
        <form>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </fieldset>
        </form>
      </div>
    );
  }
}
