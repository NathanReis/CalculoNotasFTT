<?php

namespace App\Validations;

class CalcGradeValidation
{
    public GradeValidation $gradeValidation;

    /**
     * @param App\Validations\GradeValidation $gradeValidation
     *
     * @return void
     */
    public function __construct(GradeValidation $gradeValidation)
    {
        $this->gradeValidation = $gradeValidation;
    }

    /**
     * @param string $grade1
     * @param string $grade2
     *
     * @return string[]
     */
    public function checkCalcAverage1(string $grade1, string $grade2): array
    {
        $grade1Errors = $this->gradeValidation->check($grade1);
        $grade2Errors = $this->gradeValidation->check($grade2);

        $errors = [];

        if (!empty($grade1Errors)) {
            $errors["grade1"] = $grade1Errors;
        }

        if (!empty($grade2Errors)) {
            $errors["grade2"] = $grade2Errors;
        }

        return $errors;
    }

    /**
     * @param string $grade1
     * @param string $formativeGrade
     * @param string $grade2
     *
     * @return string[]
     */
    public function checkCalcAverage2(
        string $grade1,
        string $formativeGrade,
        string $grade2
    ): array {
        $grade1Errors = $this->gradeValidation->check($grade1);
        $formativeGradeErrors = $this->gradeValidation->check($formativeGrade);
        $grade2Errors = $this->gradeValidation->check($grade2);

        $errors = [];

        if (!empty($grade1Errors)) {
            $errors["grade1"] = $grade1Errors;
        }

        if (!empty($formativeGradeErrors)) {
            $errors["formativeGrade"] = $formativeGradeErrors;
        }

        if (!empty($grade2Errors)) {
            $errors["grade2"] = $grade2Errors;
        }

        return $errors;
    }

    /**
     * @param string $average1
     * @param string $average2
     *
     * @return string[]
     */
    public function checkCalcFinalAverage(
        string $average1,
        string $average2
    ): array {
        $average1Errors = $this->gradeValidation->check($average1);
        $average2Errors = $this->gradeValidation->check($average2);

        $errors = [];

        if (!empty($average1Errors)) {
            $errors["average1"] = $average1Errors;
        }

        if (!empty($average2Errors)) {
            $errors["average2"] = $average2Errors;
        }

        return $errors;
    }
}
