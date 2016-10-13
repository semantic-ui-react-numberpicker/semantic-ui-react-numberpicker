import React from 'react';
import {render} from 'react-dom'

import {Form, Button, Segment, Divider, Message} from 'semantic-ui-react'
//import NumberPicker from 'semantic-ui-react-numberpicker';
import NumberPicker from '../src/index.js';

let rootElement = document.getElementById('app-root');

var App = React.createClass({
    getInitialState: function () {
        return {
            serializedForm: {
            }
        };
    },
    getValue: function (field) {
        return  _.get(this.state, 'serializedForm[\'' + field + '\']', '');
    },
    updateNumberPicker: function (e) {
        let value = this.state.serializedForm;
        console.log(value, e);
        value = _.set(value, e.name, e.value);
        // value[e.name] = e.value;
        this.setState({serializedForm: value});
    },
    handleSubmit: function (e, serializedForm) {
        e.preventDefault();
        this.setState({serializedForm});
    },
    render: function () {
        return (
            <div style={{width: 600, marginLeft: "auto", marginRight: "auto"}}>
            <Form onSubmit={this.handleSubmit}>
                <h1>Number Picker Demos</h1>
                <Divider horizontal>Default number picker</Divider>
                <NumberPicker name="numberPicker" value={this.getValue("numberPicker")} onChange={this.updateNumberPicker} /><br />
                <Message>{'<NumberPicker name="children" value={this.getValue("children")} onChange={this.updateNumberPicker} />'}</Message>



                <Divider horizontal>With label and minimum property set to 0</Divider>
                <label>How many Children do you have</label>
                <NumberPicker name="children" value={this.getValue("children")} onChange={this.updateNumberPicker} min={0} /><br />

                <Message>{'<NumberPicker name="children" value={this.getValue("children")} onChange={this.updateNumberPicker} min={0} />'}</Message>

                <Divider horizontal>With 100py width and <b>min</b> property set to 0</Divider>
                <div style={{width: 100}}><NumberPicker name="children" value={this.getValue("children")} onChange={this.updateNumberPicker} min={0} /></div>
                <Message>{'<div style={{width: 100}}><NumberPicker name="children" value={this.getValue("children")} onChange={this.updateNumberPicker} min={0} /></div>'}</Message>

                <Divider horizontal>Using Semantic UI React <i>{'<Form.Field>'}</i> with <b>step</b> property set to 3</Divider>
                <Form.Field inline control={NumberPicker} name={"multipleOfThree"}
                            value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}
                            compact label="What is your favourite multiple of 3" placeholder="Enter a multiple of 3" step={3} />
                <Message>{'<Form.Field inline control={NumberPicker} name={"multipleOfThree"}' +
                ' value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}' +
                ' label="What is your favourite multiple of 3" placeholder="Enter a multiple of 3" step={3}/>'}</Message>

                <Divider horizontal>Using circular basic property</Divider>
                <Form.Field inline control={NumberPicker} name={"multipleOfThree"} circular basic
                            value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}
                            label="What is your favourite multiple of 3" placeholder="Enter a multiple of 3" step={3} min={-30} max={30} />
                <Message>{'<Form.Field inline control={NumberPicker} name={"multipleOfThree"} circular basic' +
                ' value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}' +
                ' label="What is your favourite multiple of 3" placeholder="Enter a multiple of 3" step={3}/>'}</Message>

                <Divider horizontal>Using compact property</Divider>
                <Form.Field inline control={NumberPicker} name={"multipleOfThree"} compact
                            value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}
                            label="What is your favourite multiple of 3 between -30 and + 30" placeholder="Enter a multiple of 3" step={3} min={-30} max={30} />
                <Message>{'<Form.Field inline control={NumberPicker} name={"multipleOfThree"} compact' +
                ' value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}' +
                ' label="What is your favourite multiple of 3 between -30 and + 30" placeholder="Enter a multiple of 3" step={3} min={-30} max={30} />'}</Message>

                <Divider horizontal>Using Semantic UI React error property</Divider>
                <Form.Field control={NumberPicker} name={"multipleOfThree"} error
                            value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}
                            label="What is your favourite multiple of 3 between -30 and + 30" placeholder="Enter a multiple of 3" step={3} min={-30} max={30} />

                <Message>{'<Form.Field control={NumberPicker} name={"multipleOfThree"} error' +
                ' value={this.getValue("multipleOfThree")} onChange={this.updateNumberPicker}' +
                ' label="What is your favourite multiple of 3 between -30 and + 30" placeholder="Enter a multiple of 3" step={3} min={-30} max={30} />'}</Message>
                <br />
                <br />
                <Button>Submit Form</Button>
                <Segment>Form Data: {JSON.stringify(this.state.serializedForm)}</Segment>

                <a href="examples/index.js">Download the JS file which creates this demo</a>
            </Form>
            </div>
        );
    }
});

render(<App/>, rootElement);