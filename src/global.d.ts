// Global types for React Native environment
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response>;

interface RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  [key: string]: any;
}

type HeadersInit = string[][] | Record<string, string> | Headers;
type BodyInit = string | Blob | ArrayBufferView | ArrayBuffer | FormData;

declare class Headers {
  constructor(init?: HeadersInit);
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
}

declare class Response {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly headers: Headers;
  json<T = any>(): Promise<T>;
  text(): Promise<string>;
}

type RequestInfo = Request | string;

declare class Request {
  constructor(input: RequestInfo | URL, init?: RequestInit);
  readonly url: string;
  readonly method: string;
}