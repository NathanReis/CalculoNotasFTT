import { InputHTMLAttributes } from "react";

import "./style.css";

import { IPercentProps, Percent } from "../Percent";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    value: string;
    percent?: IPercentProps
}

export function Input(props: IInputProps) {
    let {
        id,
        label,
        percent,
        ...rest
    } = props;

    return (
        <div className="input-block">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className="grade"
                type="text"
                {...rest}
            />
            {
                percent &&
                <Percent {...percent} />
            }
        </div>
    );
}
