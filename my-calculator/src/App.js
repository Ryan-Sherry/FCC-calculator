import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      formula: "hello"
    }
  }
  render() {
    return (
      <div id='wrapper'>
        <div id="calculator">
          <Display output={this.state.currentValue} input={this.state.formula} />
          <Buttons />
        </div>
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div id="display-wrapper">
      <div id="display">
        <div id="input">{props.input}</div>
        <div id="output">{props.output}</div>
      </div>
    </div>
  )
}

const Buttons = (props) => {
  return (
    <div id="button-wrapper">
      <div id="keypad">
        <div id="row1">
          <button id="clear">AC</button>
          <button id="percentage">%</button>
          <button id="divide">/</button>
        </div>
        <div id="row2">
          <button id="seven">7</button>
          <button id="eight">8</button>
          <button id="nine">9</button>
          <button id="multiply">X</button>
          <button id="four">4</button>
          <button id="five">5</button>
          <button id="six">6</button>
          <button id="add">+</button>
          <button id="one">1</button>
          <button id="two">2</button>
          <button id="three">3</button>
          <button id="subtract">-</button>
        </div>
        <div id="row3">
          <button id="decimal">.</button>
          <button id="zero">0</button>
          <button id="equals">=</button>
        </div>
      </div>
    </div>
  ) 
}
export default App;
