export interface GenericResponseType<T> {
  data: T; // The type of 'data' is determined by the type parameter T
  message: string; // A message, typically a success or error message
  statusCode: number; // The HTTP status code or any other numerical status code
}

