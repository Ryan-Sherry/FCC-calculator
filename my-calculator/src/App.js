import React from 'react';
import './App.css';

const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
  startsWithZero = /^0/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "0",
      prev: "",
      formula: ""
    }
    this.numberClick = this.numberClick.bind(this);
    this.operatorClick = this.operatorClick.bind(this);
    this.decimalClick = this.decimalClick.bind(this);
    this.allClear = this.allClear.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.percentage = this.percentage.bind(this);
  }

  numberClick(e) {
    const value = e.target.value
    const { prev, current, formula } = this.state;
      this.setState({
        prev: current,
        current: startsWithZero.test(current) ? value : current + value,
        formula: current === 0 && value === 0
          ? formula === ""
            ? value
            : formula
          : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value
              });
  }

  operatorClick(e) {
    const value = e.target.value;
    const { prev, current, formula } = this.state;
    this.setState({
    })
  }

  decimalClick(e) {
    const value = e.target.value;
    const { prev, current, formula } = this.state;
    if(current.includes("."))
       {this.setState ({
          prev: current,
          current: current,
          formula: formula
      })
     } else {
        this.setState ({
          prev: current,
          current: current + value,
          formula: formula + value
      })
      }
  }

  allClear() {
    this.setState({
      current: 0,
      prev: 0,
      formula: ""
    })
  }
  
  percentage() {
    let value = this.state.formula;
    this.setState({
      current: eval(value/100),
      formula: value + "%" + "=",
    })
  }

  getAnswer() {
    let expression = this.state.formula;
    while(endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1);
    }
      let answer = eval(expression);
      this.setState({
        current: answer.toString(),
        formula: expression + "=",
        prev: answer
      })
  }

  render() {
    return (
      <div id='wrapper'>
        <div id="calculator">
          <div id="display-wrapper">
            <div id="screen">
              <div id="output">{this.state.formula}</div>
              <div id="display">{this.state.current}</div>
            </div>
          </div>
          <div id="button-wrapper">
            <div id="keypad">
              <div id="row1">
                <button onClick={this.allClear} id="clear">AC</button>
                <button onClick={this.percentage} id="percentage">%</button>
                <button onClick={this.operatorClick} id="divide" value={"/"}>÷</button>
              </div>
              <div id="row2">
                <button onClick={this.numberClick} id="seven" value={"7"}>7</button>
                <button onClick={this.numberClick} id="eight" value={"8"}>8</button>
                <button onClick={this.numberClick} id="nine" value={"9"}>9</button>
                <button onClick={this.operatorClick} id="multiply" value={"*"}>x</button>
                <button onClick={this.numberClick} id="four" value={"4"}>4</button>
                <button onClick={this.numberClick} id="five" value={"5"}>5</button>
                <button onClick={this.numberClick} id="six" value={"6"}>6</button>
                <button onClick={this.operatorClick} id="add" value={"+"}>+</button>
                <button onClick={this.numberClick} id="one" value={"1"}>1</button>
                <button onClick={this.numberClick} id="two" value={"2"}>2</button>
                <button onClick={this.numberClick} id="three" value={"3"}>3</button>
                <button onClick={this.operatorClick} id="subtract" value={"-"}>-</button>
              </div>
              <div id="row3">
                <button onClick={this.decimalClick} id="decimal" value={"."}>.</button>
                <button onClick={this.numberClick} id="zero" value={"0"}>0</button>
                <button onClick={this.getAnswer} id="equals">=</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
