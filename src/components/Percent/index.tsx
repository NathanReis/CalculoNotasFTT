import "./style.css";

export interface IPercentProps {
    percent: string;
    isToShow: boolean;
}

export function Percent(props: IPercentProps) {
    let {
        percent,
        isToShow
    } = props;

    return (
        <div className={"calc-block" + (isToShow ? "" : " hidden")}>
            <span>x {percent}</span>
        </div>
    );
}
