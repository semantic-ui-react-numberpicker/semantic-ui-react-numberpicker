declare module 'NumberPicker' {
    import * as React from 'react';
    import {HTMLAttributes} from 'react';

    export interface INumberPickerProps extends HTMLAttributes<any> {
        name?: string;
        id?: string;
        value: any;
        onChange: (event: any) => void;
        placeholder: string;
        min: number;
        max: number;
        step: number;
        maxLength: number;
        required: boolean;
        basic: boolean;
        circular: boolean;
        compact: boolean;
    }

    export interface INumberPickerState extends HTMLAttributes<any> {
        touched: boolean;
        buffer: object;
    }

    export default class Recaptcha extends React.Component<INumberPickerProps, INumberPickerState> {
    }
}