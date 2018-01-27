"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INCREASE_VALUE = exports.DECREASE_VALUE = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DECREASE_VALUE = exports.DECREASE_VALUE = 'DECREASE_VALUE';
var INCREASE_VALUE = exports.INCREASE_VALUE = 'INCREASE_VALUE';

/*
 USAGE EXAMPLES:
 <Form.Field inline control={NumberPicker} name={MULTIPLY_INPUT + ".times"} onChange={this.triggerChange} label="Copies to create" defaultValue={1} min={1} max={999} placeholder="Repeat ..." />
 <Form.Field width="8" control={NumberPicker} compact label="compact buttons" placeholder="Enter a number" defaultValue={6} min={-41} max={45} step={1} />
 <Form.Field width="8" control={NumberPicker} circular label="circular buttons" placeholder="Enter a number" defaultValue={6} min={-41} max={45} step={1} />
 <Form.Field width="8" control={NumberPicker} basic label="basic buttons" placeholder="Enter a number" defaultValue={4} min={-40} max={40} step={2} />

*/
var NumberPicker = _react2.default.createClass({
    displayName: "NumberPicker",

    getDefaultProps: function getDefaultProps() {
        return {
            placeholder: "Enter a number",
            id: "",
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
            compact: false,
            classname_button_minus: "number_picker_button_minus",
            classname_button_plus: "number_picker_button_plus",
            classname_outer_input: "number_picker",
            classname_inner_input: "number_picker_input"
        };
    },
    propTypes: {
        name: _react2.default.PropTypes.string.isRequired,
        id: _react2.default.PropTypes.string,
        value: _react2.default.PropTypes.any.isRequired,
        onChange: _react2.default.PropTypes.func.isRequired,
        placeholder: _react2.default.PropTypes.string,
        min: _react2.default.PropTypes.number,
        max: _react2.default.PropTypes.number,
        step: _react2.default.PropTypes.number,
        maxLength: _react2.default.PropTypes.number,
        required: _react2.default.PropTypes.bool,
        basic: _react2.default.PropTypes.bool,
        circular: _react2.default.PropTypes.bool,
        compact: _react2.default.PropTypes.bool
    },
    getInitialState: function getInitialState() {
        return {
            touched: false,
            buffer: {}
        };
    },
    handleAction: function handleAction(event, v) {
        var actionFilter = event.currentTarget.name;
        var currentValue = event.currentTarget.value.replace(",", ".").replace(/\D/g, '');

        var setVal = _lodash2.default.isFinite(parseFloat(this.props.value)) ? parseFloat(this.props.value) : null;
        var stepSize = _lodash2.default.isFinite(parseFloat(this.props.step)) ? parseFloat(this.props.step) : 1;
        switch (actionFilter) {
            case DECREASE_VALUE:
                if (this.props.value - stepSize >= this.props.min) setVal -= stepSize;else setVal = this.props.min;

                break;
            case INCREASE_VALUE:
                if (setVal + stepSize <= this.props.max) setVal += stepSize;else setVal = this.props.max;

                break;
            default:
                var parsedVal = parseFloat(currentValue);
                if (currentValue === "-") this.state.buffer = "-";

                if (!(parsedVal > this.props.max || parsedVal < this.props.min)) {
                    setVal = currentValue;
                }

                break;
        }

        var lastChar = ("" + setVal).charAt(setVal.length - 1) || "";
        var returnValue = setVal;
        var precision = 1000;
        if (_lodash2.default.isFinite(parseFloat(setVal))) returnValue = Math.floor(parseFloat(setVal) * precision) / precision;

        if (setVal === "" || setVal === "-" || lastChar === "." || lastChar === ",") returnValue = setVal;

        setTimeout(this.props.onChange, 1, {
            name: this.props.name,
            value: returnValue
        });
    },
    validateInput: function validateInput(event, v) {
        var actionFilter = event.target.name;
        var currentValue = event.target.value;

        var setVal = this.props.value;
        switch (actionFilter) {
            case this.props.name:
                var parsedVal = parseFloat(currentValue);
                setVal = _lodash2.default.isFinite(parsedVal) ? parsedVal : null;

                if (parsedVal > this.props.max) setVal = this.props.max;
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
                borderBottomLeftRadius: "0px"
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
    render: function render() {
        var style = this.props.circular ? this.style.circular : this.style.default;
        var display = {
            circular: this.props.circular,
            basic: this.props.basic,
            compact: this.props.compact
        };
        return _react2.default.createElement(
            _semanticUiReact.Input,
            { className: this.props.classname_outer_input },
            _react2.default.createElement(_semanticUiReact.Button, (0, _extends3.default)({}, display, {
                type: "button",
                icon: "minus",
                onClick: this.handleAction,
                name: DECREASE_VALUE,
                style: style.buttonLeft,
                disabled: this.props.value <= this.props.min,
                className: this.props.classname_button_minus
            })),
            " ",
            _react2.default.createElement("input", { type: "text",
                name: this.props.name,
                id: this.props.id,
                min: this.props.min,
                max: this.props.max,
                step: this.props.step,
                className: this.props.classname_inner_input,
                maxLength: this.props.maxLength,
                placeholder: this.props.placeholder,
                required: this.props.required,
                value: this.props.value,
                onChange: this.handleAction,
                onBlur: this.validateInput,
                style: style.input
            }),
            " ",
            _react2.default.createElement(_semanticUiReact.Button, (0, _extends3.default)({}, display, {
                type: "button",
                icon: "plus",
                onClick: this.handleAction,
                name: INCREASE_VALUE,
                style: style.buttonRight,
                disabled: this.props.value >= this.props.max,
                className: this.props.classname_button_plus
            })),
            " "
        );
    }
});

exports.default = NumberPicker;
//# sourceMappingURL=index.js.map