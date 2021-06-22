<?php

namespace App\Validations;

class GradeValidation
{
    /**
     * @param string $grade
     *
     * @return string[]
     */
    public function check(string $grade): array
    {
        $errors = [];

        if (!is_numeric($grade)) {
            $errors[] = "Formato inválido";
        }

        if (!empty($errors)) {
            return $errors;
        }

        $numericGrade = (float)$grade;

        if ($numericGrade < 0 || $numericGrade > 10) {
            $errors[] = "Valor inválido";
        }

        return $errors;
    }
}
