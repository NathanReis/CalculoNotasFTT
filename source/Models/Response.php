<?php

namespace App\Models;

class Response
{
    /**
     * @param array|object|string $data
     * @param int $statusCode
     * @param bool $success
     *
     * @return void
     */
    public function __construct(
        private array|object|string $data,
        private int $statusCode,
        private bool $success
    ) {
    }

    /**
     * @return array|object|string
     */
    public function getData(): array|object|string
    {
        return $this->data;
    }

    /**
     * @param array|object|string $data
     *
     * @return App\Models\Response
     */
    public function setData(array|object|string $data): self
    {
        $this->data = $data;

        return $this;
    }

    /**
     * @return int
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * @param int $statusCode
     *
     * @return App\Models\Response
     */
    public function setStatusCode(int $statusCode): self
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * @return bool
     */
    public function getSuccess(): bool
    {
        return $this->success;
    }

    /**
     * @param bool $success
     *
     * @return App\Models\Response
     */
    public function setSuccess(bool $success): self
    {
        $this->success = $success;

        return $this;
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            "data" => $this->data,
            "statusCode" => $this->statusCode,
            "success" => $this->success
        ];
    }

    /**
     * @return string
     */
    public function toJSON(): string
    {
        return json_encode($this->toArray());
    }
}
