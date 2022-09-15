import React from 'react';
import './App.css';

const notZero = /[1-9]+/,
  isOp = /[*+/-]/,
  endsWithOperator = /[*+/-]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
  startsWithZero = /^0/,
  endsWithDecimal = /.$/,
  endsWithDecNumber = /\d+\.\d*/, 
  negs = /-{1,}$/ 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "0",
      previous: "",
      formula: "0",
      evaluated: false
    }
    this.numberClick = this.numberClick.bind(this);
    this.operatorClick = this.operatorClick.bind(this);
    this.decimalClick = this.decimalClick.bind(this);
    this.zeroClick = this.zeroClick.bind(this);
    this.allClear = this.allClear.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.percentage = this.percentage.bind(this);
  }

  numberClick(e){
    let value = e.target.value;
    const { current, formula, evaluated } = this.state;
    if(evaluated) {
      this.setState({
        evaluated: false,
        prev: current,
        current: value,
        formula: value
      })
    } else if(!endsWithOperator.test(current)) {
      this.setState({
        previous: current,
        current: !startsWithZero.test(current) ? current + value : value,
        formula: startsWithZero.test(formula) 
          ? formula.slice(1,-1) + value
          : formula + value
      })
    } else {
      this.setState({
        previous: current,
        current: value,
        formula: formula + value
      })
    }
  }

  zeroClick(e) {
    let value = e.target.value;
    const { current, formula } = this.state;
      this.setState({
        previous: current,
        current: startsWithZero.test(current) ? value : current + value,
        formula: startsWithZero.test(formula) ? formula.replace(/^[0]+/, "0") : formula + value
      })
  }

  operatorClick(e){
    let value = e.target.value;
    const { current, formula } = this.state;
    this.setState({
      current: value,
      formula: formula + value
    })
  }

  decimalClick(e){
    let value = e.target.value;
    const { current, formula } = this.state;
    if(current === "0" || formula === ""){
      this.setState({
        current: "0" + value,
        formula: "0" + value
      })
    
    } else {
      this.setState({
      current: current.includes(".") ? current : current + value,
      formula: !formula.endsWith(".") ? formula + value : formula
    })
    }
  }
    /*this.setState({
      current: current.includes(".") ? current : current + value,
      formula: current.includes(".") ? current : current + value
    })*/

  allClear(){
    this.setState({
      current: 0,
      prev: 0,
      formula: "",
      evaluated: false
    })
  }

  getAnswer(){
    let expression = this.state.formula;
    while(endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1);
    }
      // eslint-disable-next-line
      let answer = eval(expression);
      this.setState({
        current: answer.toString(),
        formula: expression + " = " + answer,
        prev: answer,
        evaluated: true
      })
  }

  percentage() {
    let value = this.state.formula;
    this.setState({
      // eslint-disable-next-line
      current: eval(value/100),
      formula: `${value}% =`,
      evaluated: true
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
                <button onClick={this.zeroClick} id="zero" value={"0"}>0</button>
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

/* 
 numberClick(e) {
    const value = e.target.value
    const { current, formula, evaluated } = this.state;
      if(evaluated) {
        this.setState({
          evaluated: false,
          prev: current,
          current: value,
          formula: value
        })
      } else {
        this.setState({
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
      
  }

  operatorClick(e) {
    const value = e.target.value;
    const { current, formula, evaluated } = this.state;
    if(evaluated) {
      this.setState({
        evaluated: false,
        prev: current,
        current: value,
        formula: current + value
      })
    }  else if(endsWithOperator.test(formula)) {
      this.setState({
        prev: current,
        current: value,
        formula: !negs.test(formula + current) && value === "-" 
          ? (formula).replace(negs, "-") + value
          : (formula + current).slice(0, -2) + value
      })
    } else {
        this.setState({
          prev: current,
          current: value,
          formula: formula + value
      })
    }
  }

  decimalClick(e) {
    const value = e.target.value;
    const {current, formula } = this.state;
    if(current.includes("."))
       {this.setState ({
          current: current,
          formula: formula
      })
     } else {
        this.setState ({
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
  
  

  getAnswer() {
    let expression = this.state.formula;
    while(endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1);
    }
      // eslint-disable-next-line
      let answer = eval(expression);
      this.setState({
        current: answer.toString(),
        formula: expression + "=" + answer,
        prev: answer,
        evaluated: true
      })
  }
*/