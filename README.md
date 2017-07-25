# semantic-ui-react-numberpicker
Number Picker Component based on Semantic UI React

## Demo
https://semantic-ui-react-numberpicker.github.io/semantic-ui-react-numberpicker/

Semantic-UI-NumberPicker is based on <a href="http://react.semantic-ui.com/">Semantic-UI-React</a> and needs it as a dependency.

## Install
    npm i semantic-ui-react-numberpicker --save
    
## Prerequisites.
react, react-dom, semantic-ui-react

## How to use
Since the component is stateless you need to provide the value and an onChange function.

**import with:**

    import NumberPicker from 'semantic-ui-react-numberpicker';

**onChange function**

    updateNumberPicker: function (e) {
        /*
         * The value is expected as string to avoid warnings 
         * append an empty string to your possibly numberic value
        */
        this.setState({numberPickerValue: e.value + ''});
    }
    
**Basic example:**

    render(
        <NumberPicker name="numberPicker" value={this.state.numberPickerValue} onChange={this.updateNumberPicker} />
    );
    
**Extended example using Semantic UI React Form:**

    render(
        <Form.Field width="1" control={NumberPicker} 
            name={"multipleOfThree"}
            label="What is your favourite multiple of 3" 
            value={this.getValue("multipleOfThree")} 
            onChange={this.updateNumberPicker}
            circular 
            basic
            placeholder="Enter a multiple of 3" 
            min={-30}
            max={30}
            step={3}
            maxLength={3} />
    );

## Additional Properties:
       
        placeholder: React.PropTypes.string
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        step:
        maxLength: React.PropTypes.number,
        required: React.PropTypes.bool,
        basic: React.PropTypes.bool,
        circular: React.PropTypes.bool,
        compact: React.PropTypes.bool,
        
## More Reads
<a href="http://semantic-ui.com/">Semantic-UI</a>

<a href="http://react.semantic-ui.com/">Semantic-UI-React</a>
