import { MouseEventHandler } from "react";
import { MdHelpOutline } from "react-icons/md";

import "./style.css";

import { IInputProps, Input } from "../Input";

interface IFormProps {
  legend: string;
  onClickHelp: MouseEventHandler<SVGElement>;
  grades: IInputProps[];
  average: IInputProps;
}

export function Form(props: IFormProps) {
  let {
    legend,
    onClickHelp,
    grades,
    average
  } = props;

  return (
    <form className="grades-form">
      <fieldset>
        <legend>
          {legend}
          <MdHelpOutline className="help" onClick={onClickHelp} />
        </legend>

        <div className="grades-block">
          {
            grades.map((inputProps) => {
              return (
                <Input
                  key={inputProps.id}
                  {...inputProps}
                />
              );
            })
          }
        </div>

        <Input {...average} />
      </fieldset>
    </form>
  );
}
