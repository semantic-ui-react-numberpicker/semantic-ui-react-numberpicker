import React, {Component} from "react";
import {render} from 'react-dom'
import _ from "lodash";
import {Button, Form, Input} from "semantic-ui-react";


export const DECREASE_VALUE = 'DECREASE_VALUE';
export const INCREASE_VALUE = 'INCREASE_VALUE';

/*
 USAGE EXAMPLES:
 <Form.Field inline control={NumberPicker} name={MULTIPLY_INPUT + ".times"} onChange={this.triggerChange} label="Copies to create" defaultValue={1} min={1} max={999} placeholder="Repeat ..." />
 <Form.Field width="8" control={NumberPicker} compact label="compact buttons" placeholder="Enter a number" defaultValue={6} min={-41} max={45} step={1} />
 <Form.Field width="8" control={NumberPicker} circular label="circular buttons" placeholder="Enter a number" defaultValue={6} min={-41} max={45} step={1} />
 <Form.Field width="8" control={NumberPicker} basic label="basic buttons" placeholder="Enter a number" defaultValue={4} min={-40} max={40} step={2} />

*/
const NumberPicker = React.createClass({
    getDefaultProps: function () {
        return {
            placeholder: "Enter a number",
            /*
             Limiting min, max value to 1e10 to prevent javascript to switch into scientific notation
             */
            min: 1e10 * -1,
            max: 1e10,
            maxLength: 10,
            step: 1,
            required: false,
            basic: false,
            circular: false,
            compact: false
        };
    },
    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.any.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        step: React.PropTypes.number,
        maxLength: React.PropTypes.number,
        required: React.PropTypes.bool,
        basic: React.PropTypes.bool,
        circular: React.PropTypes.bool,
        compact: React.PropTypes.bool
    },
    getInitialState: function () {
        return {
            touched: false,
            buffer: {}
        };
    },
    handleAction: function (event, v) {
        let actionFilter = event.currentTarget.name;
        let currentValue = event.currentTarget.value.replace(",", ".");

        var setVal = (_.isFinite(parseFloat(this.props.value))) ? parseFloat(this.props.value) : null;
        let stepSize = (_.isFinite(parseFloat(this.props.step))) ? parseFloat(this.props.step) : 1;
        switch (actionFilter) {
            case DECREASE_VALUE:
                if (this.props.value - stepSize >= this.props.min)
                    setVal -= stepSize;
                else
                    setVal = this.props.min;

                break;
            case INCREASE_VALUE:
                if (setVal + stepSize <= this.props.max)
                    setVal += stepSize;
                else
                    setVal = this.props.max;

                break;
            case this.props.name:
                let parsedVal = parseFloat(currentValue);
                if (currentValue === "-")
                    this.state.buffer = "-";

                if (!(parsedVal > this.props.max || parsedVal < this.props.min)) {
                    setVal = currentValue;
                }

                break;
        }


        let lastChar = ("" + setVal).charAt(setVal.length - 1) || "";
        let returnValue = setVal;
        let precision = 1000;
        if (_.isFinite(parseFloat(setVal)))
            returnValue = Math.floor(parseFloat(setVal) * precision) / precision;

        if (setVal === "" || setVal === "-" || lastChar === "." || lastChar === ",")
            returnValue = setVal;

        setTimeout(this.props.onChange, 1, {name: this.props.name, value: returnValue});
    },
    validateInput: function (event, v) {
        let actionFilter = event.target.name;
        let currentValue = event.target.value;

        var setVal = this.props.value;
        switch (actionFilter) {
            case this.props.name:
                let parsedVal = parseFloat(currentValue);
                setVal = (_.isFinite(parsedVal)) ? parsedVal : null;

                if (parsedVal > this.props.max)
                    setVal = this.props.max;
                break;

            case DECREASE_VALUE:
            case INCREASE_VALUE:
            default:
                break;
        }
    },
    style: {
        default: {
            input: {
                borderRadius: "0px",
                textAlign: "right"
            },
            buttonLeft: {
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
                margin: "0px"
            },
            buttonRight: {
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
            }
        },
        circular: {
            input: {
                textAlign: "right"
            },
            buttonLeft: {
                marginRight: "3.5px"
            },
            buttonRight: {
                marginLeft: "3.5px"
            }
        }

    },
    render: function () {
        var style = (this.props.circular) ? this.style.circular : this.style.default;
        var display = {circular: this.props.circular, basic: this.props.basic, compact: this.props.compact};
        return (
            <Input>
                <Button {...display} type="button" icon='minus' onClick={this.handleAction} name={DECREASE_VALUE}
                        style={style.buttonLeft} disabled={(this.props.value <= this.props.min)}/>
                <input type="text" name={this.props.name} min={this.props.min} max={this.props.max}
                       step={this.props.step}
                       maxLength={this.props.maxLength} placeholder={this.props.placeholder} required={this.props.required}
                       value={this.props.value}
                       onChange={this.handleAction} onBlur={this.validateInput} style={style.input}/>
                <Button {...display} type="button" icon='plus' onClick={this.handleAction} name={INCREASE_VALUE}
                        style={style.buttonRight} disabled={(this.props.value >= this.props.max)}/>
            </Input>
        );
    }
});

export default NumberPicker;