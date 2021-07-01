import { useEffect, useState } from "react";

import "./style.css";

import { Form } from "../../components/Form";
import api from "../../services/api";

interface IResponse {
    data: any;
    statusCode: number;
    success: boolean;
}

function App() {
    let [grade1Semester1, setGrade1Semester1] = useState("");
    let [grade2Semester1, setGrade2Semester1] = useState("");
    let [average1, setAverage1] = useState("");
    let [grade1Semester2, setGrade1Semester2] = useState("");
    let [formativeGrade, setFormativeGrade] = useState("");
    let [grade2Semester2, setSemester2Grade2] = useState("");
    let [average2, setAverage2] = useState("");
    let [finalAverage, setFinalAverage] = useState("");

    let [isToDisableSemester1Grades, setIsToDisableSemester1Grades] = useState(false);
    let [isToDisableAverage1, setIsToDisableAverage1] = useState(false);
    let [isToDisableSemester2Grades, setIsToDisableSemester2Grades] = useState(false);
    let [isToDisableAverage2, setIsToDisableAverage2] = useState(false);

    let [isToShowCalcSemester1Grades, setIsToShowCalcSemester1Grades] = useState(false);
    let [isToShowCalcSemester2Grades, setIsToShowCalcSemester2Grades] = useState(false);
    let [isToShowCalcAverages, setIsToShowCalcAverages] = useState(false);

    useEffect(() => {
        if (grade1Semester1 === "" && grade2Semester1 === "") {
            setAverage1("");
        }

        setIsToDisableAverage1(
            !isToDisableSemester1Grades
            && (grade1Semester1 !== ""
                || grade2Semester1 !== "")
        );
    }, [grade1Semester1, grade2Semester1]);

    useEffect(() => {
        setIsToDisableSemester1Grades(
            !isToDisableAverage1
            && average1 !== ""
        );
    }, [average1]);

    useEffect(() => {
        if (
            grade1Semester2 === ""
            && formativeGrade === ""
            && grade2Semester2 === ""
        ) {
            setAverage2("");
        }

        setIsToDisableAverage2(
            !isToDisableSemester2Grades
            && (grade1Semester2 !== ""
                || formativeGrade !== ""
                || grade2Semester2 !== "")
        );
    }, [grade1Semester2, formativeGrade, grade2Semester2]);

    useEffect(() => {
        setIsToDisableSemester2Grades(
            !isToDisableAverage2
            && average2 !== ""
        );
    }, [average2]);

    useEffect(() => {
        if (average1 === "" && average2 === "") {
            setFinalAverage("");
        }
    }, [average1, average2]);

    function applyGradeMask(grade: string): string {
        // Removing anything different than numbers
        let maskedGrade = grade.replace(/\D/, "").trim();
        let amountNumbers = maskedGrade.length;

        if (amountNumbers > 4) {
            // Getting the last 4 numbers
            maskedGrade = maskedGrade.substring(amountNumbers - 4);
            amountNumbers = 4;
        }

        switch (amountNumbers) {
            case 2:
            case 3:
                // Mask with \d{1},\d{1} or \d{1},\d{2}
                maskedGrade = maskedGrade.replace(/^(\d)(.+)/, "$1,$2");
                break;
            case 4:
                // Mask with \d{2},\d{2}
                maskedGrade = maskedGrade.replace(/(.+)(\d{2})$/, "$1,$2");
                break;
        }

        return maskedGrade;
    }

    async function calcAverage(
        endpoint: string,
        grades: string[]
    ): Promise<IResponse> {
        try {
            return (await api.get<IResponse>(`${endpoint}/${grades.join("/")}`))
                .data;
        } catch (error) {
            return error;
        }
    }

    function formatGradeToSend(grade: string): string {
        let formattedGrade = grade.replace(",", ".");

        return formattedGrade ? formattedGrade : "0";
    }

    async function handleBlurAverages() {
        if (
            average1 === ""
            && average2 === ""
        ) {
            return;
        }

        let formattedAverage1 = formatGradeToSend(average1);
        let formattedAverage2 = formatGradeToSend(average2);

        let response = await calcAverage(
            "/calc-final-average",
            [formattedAverage1, formattedAverage2]
        );

        if (response.statusCode === 200) {
            let { average } = response.data;

            setFinalAverage(applyGradeMask((String)(average)));
        }
    }

    async function handleBlurSemester1Grades() {
        if (
            grade1Semester1 === ""
            && grade2Semester1 === ""
        ) {
            return;
        }

        let formattedGrade1 = formatGradeToSend(grade1Semester1);
        let formattedGrade2 = formatGradeToSend(grade2Semester1);

        let response = await calcAverage(
            "/calc-average-1",
            [formattedGrade1, formattedGrade2]
        );

        if (response.statusCode === 200) {
            let { average } = response.data;

            setAverage1(applyGradeMask((String)(average)));

            await handleBlurAverages();
        }
    }

    async function handleBlurSemester2Grades() {
        if (
            grade1Semester2 === ""
            && formativeGrade === ""
            && grade2Semester2 === ""
        ) {
            return;
        }

        var formattedGrade1 = formatGradeToSend(grade1Semester2);
        var formattedFormativeGrade = formatGradeToSend(formativeGrade);
        var formattedGrade2 = formatGradeToSend(grade2Semester2);

        let response = await calcAverage(
            "/calc-average-2",
            [formattedGrade1, formattedFormativeGrade, formattedGrade2]
        );

        if (response.statusCode === 200) {
            let { average } = response.data;

            setAverage2(applyGradeMask((String)(average)));

            await handleBlurAverages();
        }
    }

    return (
        <main>
            <Form
                legend="1° Semestre"
                onClickHelp={() => {
                    setIsToShowCalcSemester1Grades(oldState => !oldState);
                }}
                grades={[
                    {
                        id: "grade-1-semester-1",
                        label: "Nota 1",
                        value: grade1Semester1,
                        disabled: isToDisableSemester1Grades,
                        percent: {
                            percent: "40%",
                            isToShow: isToShowCalcSemester1Grades
                        },
                        onChange: (event) => {
                            setGrade1Semester1(
                                applyGradeMask(event.target.value)
                            );
                        },
                        onBlur: handleBlurSemester1Grades
                    },
                    {
                        id: "grade-2-semester-1",
                        label: "Nota 2",
                        value: grade2Semester1,
                        disabled: isToDisableSemester1Grades,
                        percent: {
                            percent: "60%",
                            isToShow: isToShowCalcSemester1Grades
                        },
                        onChange: (event) => {
                            setGrade2Semester1(
                                applyGradeMask(event.target.value)
                            );
                        },
                        onBlur: handleBlurSemester1Grades
                    }
                ]}
                average={{
                    id: "average-1",
                    label: "Média 1",
                    value: average1,
                    disabled: isToDisableAverage1,
                    percent: {
                        percent: "50%",
                        isToShow: isToShowCalcAverages
                    },
                    onChange: (event) => {
                        setAverage1(
                            applyGradeMask(event.target.value)
                        );
                    },
                    onBlur: handleBlurAverages
                }}
            />

            <Form
                legend="2° Semestre"
                onClickHelp={() => {
                    setIsToShowCalcSemester2Grades(oldState => !oldState);
                }}
                grades={[
                    {
                        id: "grade-1-semester-2",
                        label: "Nota 1",
                        value: grade1Semester2,
                        disabled: isToDisableSemester2Grades,
                        percent: {
                            percent: "20%",
                            isToShow: isToShowCalcSemester2Grades
                        },
                        onChange: (event) => {
                            setGrade1Semester2(
                                applyGradeMask(event.target.value)
                            );
                        },
                        onBlur: handleBlurSemester2Grades
                    },
                    {
                        id: "formative-grade",
                        label: "Formativa",
                        value: formativeGrade,
                        disabled: isToDisableSemester2Grades,
                        percent: {
                            percent: "20%",
                            isToShow: isToShowCalcSemester2Grades
                        },
                        onChange: (event) => {
                            setFormativeGrade(
                                applyGradeMask(event.target.value)
                            );
                        },
                        onBlur: handleBlurSemester2Grades
                    },
                    {
                        id: "grade-2-semester-2",
                        label: "Nota 2",
                        value: grade2Semester2,
                        disabled: isToDisableSemester2Grades,
                        percent: {
                            percent: "60%",
                            isToShow: isToShowCalcSemester2Grades
                        },
                        onChange: (event) => {
                            setSemester2Grade2(
                                applyGradeMask(event.target.value)
                            );
                        },
                        onBlur: handleBlurSemester2Grades
                    }
                ]}
                average={{
                    id: "average-2",
                    label: "Média 2",
                    value: average2,
                    disabled: isToDisableAverage2,
                    percent: {
                        percent: "50%",
                        isToShow: isToShowCalcAverages
                    },
                    onChange: (event) => {
                        setAverage2(
                            applyGradeMask(event.target.value)
                        );
                    },
                    onBlur: handleBlurAverages
                }}
            />

            <Form
                legend="Final"
                onClickHelp={() => {
                    setIsToShowCalcAverages(oldState => !oldState);
                }}
                grades={[]}
                average={{
                    id: "final-average",
                    label: "Média final",
                    value: finalAverage,
                    disabled: true,
                    onChange: (event) => {
                        setFinalAverage(
                            applyGradeMask(event.target.value)
                        );
                    }
                }}
            />
        </main>
    );
}

export default App;
