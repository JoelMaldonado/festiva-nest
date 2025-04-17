export function successResponse(message: string = '', data: any) {
  return {
    isSuccess: true,
    code: 200,
    message: message,
    data: data,
  };
}

export function errorResponse(error: any) {
  return {
    isSuccess: false,
    code: error.status ?? 500,
    message: error.message,
    data: null,
  };
}
