import React from 'react';
import './App.css';

const
  isOp = /[*+/-]/,
  startsWithZero = /^0/,
  endsWithOperator = /[*+/-]$/,
  endsWithDecimal = /.$/,
  isDecNumber = /.\d*/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
  startsWithZeroPoint = /^0\.\d*/,
  endsWithZeroPoint = /0\.\d*$/,
  endsWithDecNumber = /\.(\d*)$/, 
  negs = /-{1,}$/ 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "0",
      formula: "",
      evaluated: false
    }
    this.numberClick = this.numberClick.bind(this);
    this.zeroClick = this.zeroClick.bind(this);
    this.decimalClick = this.decimalClick.bind(this);
    this.operatorClick = this.operatorClick.bind(this);
    this.allClear = this.allClear.bind(this);
    this.percentage = this.percentage.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    
  }

  numberClick(e){
    let value = e.target.value;
    const { current, formula, evaluated } = this.state;
    if(evaluated) {
    //replaces the last answer with the "value", displaying it in "current" and "formula" fields
      this.setState({
        evaluated: false,
        current: value,
        formula: value
      })
    } else if(isOp.test(current)){
      //replaces the operator displayed in "current" with the typed numbers, "current" added to "formula"
        this.setState({
          current: value,
          formula: formula + value
        })
    } else if(endsWithDecimal.test(current) && endsWithDecimal.test(formula)){
      //allows numbers to be appended to decimals
        this.setState({
          current: current + value,
          formula: formula + value
      })
    } else {
      //if cleared or just loaded, places "value" in "current" and "formula" fields
        this.setState({
          current: !startsWithZero.test(current) ? current + value : value,
          formula: startsWithZero.test(formula) 
          ? formula.slice(1,-1) + value
          : formula + value
        })
    }
  }

  zeroClick(e) {
    let value = e.target.value;
    const { current, formula, evaluated } = this.state;
    if(evaluated){
    //allows 0 to be entered after previous answer, starting new calculation
      this.setState({
        evaluated: false,
        current: value,
        formula: value
      })
    } else if(endsWithZeroPoint.test(current) && endsWithZeroPoint.test(formula)){
      //allows calculation to start with "0.000000000" etc.
        this.setState({
          current: current + value,
          formula: formula + value
        })
    } else if(isOp.test(current)){
      //allows current number to start with "0."
        this.setState({
        //not actually sure how I got this to work, logically-speaking, but working as I would like
        //"Unless (current+value) starts with 0., return (current minus operator) + 0. Otherwise return current"
        current: !startsWithZeroPoint.test(current + value) ? current.slice(1,-1) + value : current,
      })
    } else {
      //prevents next number from starting with more than one 0
      this.setState({
        current: startsWithZero.test(current) ? value : current + value,
        formula: startsWithZero.test(formula) ? formula.replace(/^[0]+/, "0") : formula + value
      })
    }
  }

  decimalClick(e){
    let value = e.target.value;
    const { current, formula, evaluated } = this.state;
    if(evaluated){
    //allows decimal to be entered after previous answer, starting new calculation with "0."
      this.setState({
        evaluated: false,
        current: "0" + value,
        formula: "0" + value
      })
    } else if(current === "0" && formula === ""){
      //if decimal is first button clicked, displays "0." in both fields
        this.setState({
          current: current + value,
          formula: current + value
        })
    } else if(current.includes(".") && isDecNumber.test(formula)){
      //prevents additional decimals after number (e.g. "1.2.1.""). Can also use "formula.endsWith(isDecNumber)"
        this.setState({
          current: current,
          formula: formula
        })
      } else if (endsWithOperator.test(formula)){
        //if last clicked is operator, inserts a zero before the decimal in "current" and "formula"
          this.setState({
            current: "0" + value,
            formula: formula + "0" + value
          })
    } else {
      //prevents more than one decimal point from being added to "current" and "formula"
        this.setState({
          //"If current contains a decimal, return only the current value. Otherwise return current + decimal"
          current: current.includes(".") ? current : current + value,
          //"If formula does not end with a decimal, return formula + decimal. Otherwise, return only formula"
          formula: !formula.endsWith(".") ? formula + value : formula
        })
    }
  }

  operatorClick(e){
    let value = e.target.value;
    const { current, formula } = this.state;
    this.setState({
      current: value,
      formula: formula + value
    })
  }

  allClear(){
  //returns state to initial state
    this.setState({
      current: "0",
      previous: "",
      formula: "",
      evaluated: false
    })
  }

  percentage() {
    let value = this.state.formula;
    //self-explanatory, but evaluates current formula by giving percentage
    this.setState({
      // eslint-disable-next-line
      current: eval(value/100),
      formula: `${value}% =`,
      evaluated: true
    })
  }

  getAnswer(){
    let expression = this.state.formula;
    //if expression end in an operator, removes the operator prior to evaluating
    while(endsWithOperator.test(expression)) {
      expression = expression.slice(0, -1);
    }
      //corrects rounding errors of "answer" (borrowed from FCC example)
      // eslint-disable-next-line
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      //converts answer to a string, so that "eval" can operate on it...
      this.setState({
        current: answer.toString(),
        formula: expression + " = " + answer,
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