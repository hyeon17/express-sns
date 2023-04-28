export interface AppResponse<T = unknown, E = Error> {
  ok: boolean;
  payload?: T;
  error?: E;
}

export interface NonPayloadResponse<E = Error> {
  ok: boolean;
  error?: E;
}
