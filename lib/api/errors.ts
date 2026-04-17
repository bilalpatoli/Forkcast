export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return {
      body: { error: error.message },
      status: error.status
    };
  }

  console.error(error);

  return {
    body: { error: "Something went wrong" },
    status: 500
  };
}
