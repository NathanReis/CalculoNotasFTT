<?php

use App\Controllers\CalcGradeController;
use App\Utils\PathUtil;
use Dotenv\Dotenv;
use Slim\Factory\AppFactory;

require implode(
    DIRECTORY_SEPARATOR,
    [__DIR__, "..", "vendor", "autoload.php"]
);

// *** WARNING - Using unsafe ***
$dotenv = Dotenv::createUnsafeImmutable(
    PathUtil::resolve(__DIR__, "..")
);
$dotenv->safeLoad();

$app = AppFactory::create();

$app->addRoutingMiddleware();

$app->add(function ($request, $handler) {
    return $handler
        ->handle($request)
        ->withHeader("Access-Control-Allow-Origin", "*")
        ->withHeader("Access-Control-Allow-Methods", "GET");
});

if (getenv("ENV") === "prod") {
    $app->addErrorMiddleware(false, false, false);
} else {
    $app->addErrorMiddleware(true, true, true);
}

$app->get(
    "/calc-average-1/{grade-1}/{grade-2}",
    CalcGradeController::class . ":calcAverage1"
);

$app->get(
    "/calc-average-2/{grade-1}/{formative-grade}/{grade-2}",
    CalcGradeController::class . ":calcAverage2"
);

$app->get(
    "/calc-final-average/{average-1}/{average-2}",
    CalcGradeController::class . ":calcFinalAverage"
);

$app->run();
