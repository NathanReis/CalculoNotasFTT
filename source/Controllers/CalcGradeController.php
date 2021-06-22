<?php

namespace App\Controllers;

use App\Helpers\ResponseHelper;
use App\Services\CalcGradeService;
use App\Validations\CalcGradeValidation;
use App\Validations\GradeValidation;
use Psr\Http\Message\ResponseInterface as IResponse;
use Psr\Http\Message\ServerRequestInterface as IRequest;

class CalcGradeController
{
    /**
     * @param Psr\Http\Message\ServerRequestInterface $request
     * @param Psr\Http\Message\ResponseInterface $response
     * @param array $args
     */
    public function calcAverage1(
        IRequest $request,
        IResponse $response,
        array $args
    ): IResponse {
        $calcGradeService = new CalcGradeService(
            new CalcGradeValidation(
                new GradeValidation()
            )
        );

        $average = $calcGradeService->calcAverage1(
            (string)$args["grade-1"],
            (string)$args["grade-2"]
        );

        if (is_float($average)) {
            return ResponseHelper::getNewSuccessResponseWithJSON(
                $response,
                ["average" => (float)number_format($average, 2, ".", "")]
            );
        }

        return ResponseHelper::getNewFailResponseWithJSON(
            $response,
            $average
        );
    }

    /**
     * @param Psr\Http\Message\ServerRequestInterface $request
     * @param Psr\Http\Message\ResponseInterface $response
     * @param array $args
     */
    public function calcAverage2(
        IRequest $request,
        IResponse $response,
        array $args
    ): IResponse {
        $calcGradeService = new CalcGradeService(
            new CalcGradeValidation(
                new GradeValidation()
            )
        );

        $average = $calcGradeService->calcAverage2(
            (string)$args["grade-1"],
            (string)$args["formative-grade"],
            (string)$args["grade-2"]
        );

        if (is_float($average)) {
            return ResponseHelper::getNewSuccessResponseWithJSON(
                $response,
                ["average" => (float)number_format($average, 2, ".", "")]
            );
        }

        return ResponseHelper::getNewFailResponseWithJSON(
            $response,
            $average
        );
    }

    /**
     * @param Psr\Http\Message\ServerRequestInterface $request
     * @param Psr\Http\Message\ResponseInterface $response
     * @param array $args
     */
    public function calcFinalAverage(
        IRequest $request,
        IResponse $response,
        array $args
    ): IResponse {
        $calcGradeService = new CalcGradeService(
            new CalcGradeValidation(
                new GradeValidation()
            )
        );

        $finalAverage = $calcGradeService->calcFinalAverage(
            (string)$args["average-1"],
            (string)$args["average-2"]
        );

        if (is_float($finalAverage)) {
            return ResponseHelper::getNewSuccessResponseWithJSON(
                $response,
                ["average" => (float)number_format($finalAverage, 2, ".", "")]
            );
        }

        return ResponseHelper::getNewFailResponseWithJSON(
            $response,
            $finalAverage
        );
    }
}
