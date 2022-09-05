import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div id='wrapper'>
        <div id="calculator">
          <Display />
          <Buttons />
        </div>
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div id="display-wrapper">

    </div>
  )
}

const Buttons = (props) => {
  return (
    <div id="button-wrapper">

    </div>
  ) 
}
export default App;
