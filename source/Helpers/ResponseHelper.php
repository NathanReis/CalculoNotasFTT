<?php

namespace App\Helpers;

use App\Models\Response;
use Psr\Http\Message\ResponseInterface as IResponse;

class ResponseHelper
{
    /**
     * @param Psr\Http\Message\ResponseInterface $response
     * @param array|object|string $data
     * @param int $statusCode
     * @param bool $success
     *
     * @return Psr\Http\Message\ResponseInterface
     */
    public static function getNewResponseWithJSON(
        IResponse $response,
        array|object|string $data,
        int $statusCode,
        bool $success
    ): IResponse {
        $responseModel = new Response(
            data: $data,
            statusCode: $statusCode,
            success: $success
        );

        $response
            ->getBody()
            ->write($responseModel->toJSON());

        return $response
            ->withHeader("Content-Type", "application/json; charset=UTF-8")
            ->withStatus($statusCode);
    }

    /**
     * @param Psr\Http\Message\ResponseInterface $response
     * @param array|object|string $data
     * @param int $statusCode
     *
     * @return Psr\Http\Message\ResponseInterface
     */
    public static function getNewFailResponseWithJSON(
        IResponse $response,
        array|object|string $data,
        int $statusCode = 400
    ): IResponse {
        return self::getNewResponseWithJSON(
            response: $response,
            data: $data,
            statusCode: $statusCode,
            success: false
        );
    }

    /**
     * @param Psr\Http\Message\ResponseInterface $response
     * @param array|object|string $data
     * @param int $statusCode
     *
     * @return Psr\Http\Message\ResponseInterface
     */
    public static function getNewSuccessResponseWithJSON(
        IResponse $response,
        array|object|string $data,
        int $statusCode = 200
    ): IResponse {
        return self::getNewResponseWithJSON(
            response: $response,
            data: $data,
            statusCode: $statusCode,
            success: true
        );
    }
}
