<?php

namespace App\Services;

use App\Validations\CalcGradeValidation;

class CalcGradeService
{
    private const PERCENT_GRADE_1 = 0.4;
    private const PERCENT_GRADE_2 = 0.6;

    private CalcGradeValidation $calcGradeValidation;

    /**
     * @param App\Validations\CalcGradeValidation $calcGradeValidation
     *
     * @return void
     */
    public function __construct(CalcGradeValidation $calcGradeValidation)
    {
        $this->calcGradeValidation = $calcGradeValidation;
    }

    /**
     * @param string $grade1
     * @param string $grade2
     *
     * @return string[]|float
     */
    public function calcAverage1(string $grade1, string $grade2): array|float
    {
        $errors = $this
            ->calcGradeValidation
            ->checkCalcAverage1($grade1, $grade2);

        if (!empty($errors)) {
            return $errors;
        }

        $trueGrade1 = (float)$grade1 * self::PERCENT_GRADE_1;
        $trueGrade2 = (float)$grade2 * self::PERCENT_GRADE_2;

        return $trueGrade1 + $trueGrade2;
    }

    /**
     * @param string $grade1
     * @param string $formativeGrade
     * @param string $grade2
     *
     * @return string[]|float
     */
    public function calcAverage2(
        string $grade1,
        string $formativeGrade,
        string $grade2
    ): array|float {
        $errors = $this
            ->calcGradeValidation
            ->checkCalcAverage2($grade1, $formativeGrade, $grade2);

        if (!empty($errors)) {
            return $errors;
        }

        $averageGrade1AndFormativeGrade = ((float)$grade1 + (float)$formativeGrade) / 2;

        $trueGrade1 = $averageGrade1AndFormativeGrade * self::PERCENT_GRADE_1;
        $trueGrade2 = (float)$grade2 * self::PERCENT_GRADE_2;

        return $trueGrade1 + $trueGrade2;
    }

    /**
     * @param string $average1
     * @param string $average2
     *
     * @return string[]|float
     */
    public function calcFinalAverage(
        string $average1,
        string $average2
    ): array|float {
        $errors = $this
            ->calcGradeValidation
            ->checkCalcFinalAverage($average1, $average2);

        if (!empty($errors)) {
            return $errors;
        }

        return ($average1 + $average2) / 2;
    }
}
