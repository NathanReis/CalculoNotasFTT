/**
 * Returns a grade without last character when has some character ou empty
 *
 * @param {string} grade
 *
 * @return {string}
 */
function applyTypedBackspace(grade) {
    var lengthGrade = grade.length;

    return lengthGrade === 0
        ? grade
        : grade.substring(0, lengthGrade - 1);
}

/**
 * Returns a grade with the typed number
 *
 * @param {string} grade
 * @param {string} number
 *
 * @return {string}
 */
function applyTypedNumber(grade, number) {
    return grade + number;
}

/**
 * @param {string} key
 * @param {string} grade
 *
 * @return {string}
 */
function applyTypedKeyEffect(key, grade) {
    if (key === "Backspace") {
        grade = applyTypedBackspace(grade);
    } else if (key in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
        grade = applyTypedNumber(grade, key);
    }

    return grade;
}

/**
 * @param {KeyboardEvent} event
 *
 * @return {void}
 */
function handleKeyDownSemester1Average(event) {
    var average1 = $("#average-1").val();

    average1 = applyTypedKeyEffect(event.key, average1);

    $("#semester-1-grade-1, #semester-1-grade-2")
        .attr(
            "disabled",
            average1 != ""
        );
}

/**
 * @param {KeyboardEvent} event
 *
 * @return {void}
 */
function handleKeyDownSemester1Grades(event) {
    var id = event.target.id;

    var grade1 = $("#semester-1-grade-1").val();
    var grade2 = $("#semester-1-grade-2").val();

    if (id.includes("grade-1")) {
        grade1 = applyTypedKeyEffect(event.key, grade1);
    } else {
        grade2 = applyTypedKeyEffect(event.key, grade2);
    }

    $("#average-1")
        .attr(
            "disabled",
            grade1 != "" || grade2 != ""
        );
}

/**
 * @param {KeyboardEvent} event
 *
 * @return {void}
 */
function handleKeyDownSemester2Average(event) {
    var average2 = $("#average-2").val();

    average2 = applyTypedKeyEffect(event.key, average2);

    $("#semester-2-grade-1, #formative-grade, #semester-2-grade-2")
        .attr(
            "disabled",
            average2 != ""
        );
}

/**
 * @param {KeyboardEvent} event
 *
 * @return {void}
 */
function handleKeyDownSemester2Grades(event) {
    var id = event.target.id;

    var grade1 = $("#semester-2-grade-1").val();
    var formativeGrade = $("#formative-grade").val();
    var grade2 = $("#semester-2-grade-2").val();

    if (id.includes("grade-1")) {
        grade1 = applyTypedKeyEffect(event.key, grade1);
    } else if (id.includes("formative-grade")) {
        formativeGrade = applyTypedKeyEffect(event.key, formativeGrade);
    } else {
        grade2 = applyTypedKeyEffect(event.key, grade2);
    }

    $("#average-2")
        .attr(
            "disabled",
            grade1 != "" || formativeGrade != "" || grade2 != ""
        );
}

/**
 * @param {string} endpoint
 * @param {string[]} grades
 * @param {Function} callback
 *
 * @return {void}
 */
function calcAverage(endpoint, grades, callback) {
    var baseURI = "https://api-calculo-notas-ftt.herokuapp.com";
    var uriComplete = baseURI + endpoint + "/" + grades.join("/")

    $.ajax({
        url: uriComplete,
        method: "get"
    })
        .done(function (response) {
            callback(response);
        })
        .fail(function (error) {
            callback(error.responseJSON);
        });
}

/**
 * Gets input value from screen and replace "," by "."
 *
 * Returns value got or "0"
 *
 * @param {string} idGrade
 *
 * @return {string}
 */
function getFormattedGradeToSend(idGrade) {
    var grade = $("#" + idGrade).val().replace(",", ".");

    return grade ? grade : "0";
}

/**
 * @param {object} data
 *
 * @return {void}
 */
function showErrors(errors) {
    console.log(errors);
}

/**
 * @param {object} data
 *
 * @return {void}
 */
function showFinalResult(data) {
    var maskedAverage = (String)(data.average).replace(".", ",");

    $("#final-average").val(maskedAverage);
}

/**
 * @param {object} data
 *
 * @return {void}
 */
function showResultSemester1(data) {
    var maskedAverage = (String)(data.average).replace(".", ",");

    $("#average-1").val(maskedAverage);
    $("#average-1").trigger("blur");
}

/**
 * @param {object} data
 *
 * @return {void}
 */
function showResultSemester2(data) {
    var maskedAverage = (String)(data.average).replace(".", ",");

    $("#average-2").val(maskedAverage);
    $("#average-2").trigger("blur");
}

/**
 * @param {FocusEvent} event
 *
 * @return {void}
 */
function handleBlurAverages(event) {
    if (
        $("#average-1").val() == ""
        && $("#average-2").val() == ""
    ) {
        return;
    }

    var average1 = getFormattedGradeToSend("average-1");
    var average2 = getFormattedGradeToSend("average-2");

    calcAverage(
        "/calc-final-average",
        [average1, average2],
        function (response) {
            if (response.success) {
                showFinalResult(response.data);
            } else {
                $("#final-average").val("");

                showErrors(response.data);
            }
        }
    );
}

/**
 * @param {FocusEvent} event
 *
 * @return {void}
 */
function handleBlurSemester1Grades(event) {
    if (
        $("#semester-1-grade-1").val() == ""
        && $("#semester-1-grade-2").val() == ""
    ) {
        return;
    }

    var grade1 = getFormattedGradeToSend("semester-1-grade-1");
    var grade2 = getFormattedGradeToSend("semester-1-grade-2");

    calcAverage(
        "/calc-average-1",
        [grade1, grade2],
        function (response) {
            if (response.success) {
                showResultSemester1(response.data);
            } else {
                $("#average-1").val("");
                $("#final-average").val("");

                showErrorsSemester1(response.data);
            }
        }
    );
}

/**
 * @param {FocusEvent} event
 *
 * @return {void}
 */
function handleBlurSemester2Grades(event) {
    if (
        $("#semester-2-grade-1").val() == ""
        && $("#formative-grade").val() == ""
        && $("#semester-2-grade-2").val() == ""
    ) {
        return;
    }

    var grade1 = getFormattedGradeToSend("semester-2-grade-1");
    var formativeGrade = getFormattedGradeToSend("formative-grade");
    var grade2 = getFormattedGradeToSend("semester-2-grade-2");

    calcAverage(
        "/calc-average-2",
        [grade1, formativeGrade, grade2],
        function (response) {
            if (response.success) {
                showResultSemester2(response.data);
            } else {
                $("#average-2").val("");
                $("#final-average").val("");

                showErrors(response.data);
            }
        }
    );
}

/**
 * @param {number} widthCalc
 * @param {number} leftDistance
 * @param {number} widthInput
 *
 * @return {string}
 */
function buildLeftDistanceCSS(widthCalc, leftDistance, widthInput) {
    var freeSpace = Math.abs(widthInput - widthCalc);
    var leftDistanceCalculated = leftDistance + (freeSpace / 2);

    return leftDistanceCalculated + "px";
}

/**
 * @param {number} topDistance
 *
 * @return {void}
 */
function buildTopDistanceCSS(topDistance) {
    return "calc(" + topDistance + "px + 2rem)";
}

/**
 * @param {string} idInputGrade
 *
 * @return {object}
 */
function getReferencePositionCalc(idInputGrade) {
    var $inputGrade = $("#" + idInputGrade);

    return {
        left: $inputGrade.offset().left,
        top: $inputGrade.offset().top,
        width: $inputGrade.width()
    };
}

/**
 * @param {string} idCalc
 * @param {string} idInputGrade
 *
 * @return {void}
 */
function setPositionCalc(idCalc, idInputGrade) {
    var $calc = $("#" + idCalc);
    var referencePosition = getReferencePositionCalc(idInputGrade);

    var leftDistance = buildLeftDistanceCSS(
        $calc.width(),
        referencePosition.left,
        referencePosition.width
    );
    var topDistance = buildTopDistanceCSS(referencePosition.top);

    $calc
        .css("left", leftDistance)
        .css("top", topDistance);
}

/**
 * @param {*} event
 *
 * @return {void}
 */
function handleResizeWindow(event) {
    setPositionCalc("calc-semester-1-grade-1", "semester-1-grade-1");
    setPositionCalc("calc-semester-1-grade-2", "semester-1-grade-2");
    setPositionCalc("calc-average-1", "average-1");
    setPositionCalc("calc-semester-2-grade-1", "semester-2-grade-1");
    setPositionCalc("calc-formative-grade", "formative-grade");
    setPositionCalc("calc-semester-2-grade-2", "semester-2-grade-2");
    setPositionCalc("calc-average-2", "average-2");
}

/**
 * @return {void}
 */
function showCalcsForSemester1() {
    $("#calc-semester-1-grade-1").removeClass("hidden");
    $("#calc-semester-1-grade-2").removeClass("hidden");
}

/**
 * @return {void}
 */
function showCalcsForSemester2() {
    $("#calc-semester-2-grade-1").removeClass("hidden");
    $("#calc-formative-grade").removeClass("hidden");
    $("#calc-semester-2-grade-2").removeClass("hidden");
}

/**
 * @return {void}
 */
function showCalcsForEndSemester() {
    $("#calc-average-1").removeClass("hidden");
    $("#calc-average-2").removeClass("hidden");
}

/**
 * @param {MouseEvent} event
 *
 * @return {void}
 */
function handleClickHelp(event) {
    $("#calc-semester-1-grade-1").addClass("hidden");
    $("#calc-semester-1-grade-2").addClass("hidden");
    $("#calc-average-1").addClass("hidden");
    $("#calc-semester-2-grade-1").addClass("hidden");
    $("#calc-formative-grade").addClass("hidden");
    $("#calc-semester-2-grade-2").addClass("hidden");
    $("#calc-average-2").addClass("hidden");

    var idGradesForm = $(event.target).closest(".grades-form").attr("id");

    switch (idGradesForm) {
        case "semester-1":
            showCalcsForSemester1();
            break;

        case "semester-2":
            showCalcsForSemester2();
            break;

        default:
            showCalcsForEndSemester();
            break;
    }

    $("#modal-calc").removeClass("hidden");

    $(window).trigger("resize");
}

/**
 * @param {MouseEvent} event
 *
 * @return {void}
 */
function handleClickCloseCalc(event) {
    $(event.target).closest("#modal-calc").addClass("hidden");
}

$(".grade").mask("09,00", { reverse: true });

$(document).ready(function () {
    $("#semester-1-grade-1, #semester-1-grade-2")
        .on("keydown", handleKeyDownSemester1Grades)
        .on("blur", handleBlurSemester1Grades);

    $("#semester-2-grade-1, #formative-grade, #semester-2-grade-2")
        .on("keydown", handleKeyDownSemester2Grades)
        .on("blur", handleBlurSemester2Grades);

    $("#average-1, #average-2")
        .on("blur", handleBlurAverages);

    $("#average-1")
        .on("keydown", handleKeyDownSemester1Average);

    $("#average-2")
        .on("keydown", handleKeyDownSemester2Average);

    $(".help")
        .on("click", handleClickHelp);

    $(".close")
        .on("click", handleClickCloseCalc);

    $(window)
        .resize(handleResizeWindow);
});
