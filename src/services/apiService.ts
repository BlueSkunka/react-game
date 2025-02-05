import {RequestHeaderEnum} from "../enums/RequestHeaderEnum.ts";
import {RequestHeaderParamEnum} from "../enums/RequestHeaderParamEnum.ts";

export function authHeaders(token: string): HeadersInit {
    const headers = new Headers();
    headers.append(RequestHeaderEnum.CONTENT_TYPE, RequestHeaderParamEnum.APPLICATION_JSON);
    headers.append(RequestHeaderEnum.AUTH, RequestHeaderParamEnum.BEARER + token);

    return headers;
}