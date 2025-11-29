import type http from "http";
import type { URLSearchParams } from "url";

import type httpProxy from "http-proxy-node16";
import type Joi from "joi";

import type { Cluster } from "../../common/cluster/cluster";
import type { K8sightApiResultContentType } from "./router-content-types";

export type InferParam<T extends string, PathParams extends Record<string, string>> = T extends `{${infer P}?}`
  ? PathParams & Partial<Record<P, string>>
  : T extends `{${infer P}}`
    ? PathParams & Record<P, string>
    : PathParams;

export type InferParamFromPath<P extends string> = P extends `${string}/{${infer B}*}${infer Tail}`
  ? Tail extends ""
    ? Record<B, string>
    : never
  : P extends `${infer A}/${infer B}`
    ? InferParam<A, Record<string, string> & InferParamFromPath<B>>
    : InferParam<P, {}>;

export interface K8sightApiRequest<Path extends string> {
  path: Path;
  payload: unknown;
  params: InferParamFromPath<Path>;
  cluster: Cluster | undefined;
  query: URLSearchParams;
  raw: {
    req: http.IncomingMessage;
    res: http.ServerResponse;
  };
}

export interface ClusterK8sightApiRequest<Path extends string> extends K8sightApiRequest<Path> {
  cluster: Cluster;
}

export interface K8sightApiResult<Response> {
  statusCode?: number;
  response?: Response;
  error?: any;
  contentType?: K8sightApiResultContentType;
  headers?: Partial<Record<string, string>>;
  proxy?: httpProxy;
}

export type RouteResponse<Response> = K8sightApiResult<Response> | void;

export interface RouteHandler<TResponse, Path extends string> {
  (request: K8sightApiRequest<Path>): RouteResponse<TResponse> | Promise<RouteResponse<TResponse>>;
}

export interface BaseRoutePaths<Path extends string> {
  path: Path;
  method: "get" | "post" | "put" | "patch" | "delete";
}

export interface PayloadValidator<Payload> {
  validate(payload: unknown): Joi.ValidationResult<Payload>;
}

export interface ValidatorBaseRoutePaths<Path extends string, Payload> extends BaseRoutePaths<Path> {
  payloadValidator: PayloadValidator<Payload>;
}

export interface Route<TResponse, Path extends string> extends BaseRoutePaths<Path> {
  handler: RouteHandler<TResponse, Path>;
}

export interface BindHandler<Path extends string> {
  <TResponse>(handler: RouteHandler<TResponse, Path>): Route<TResponse, Path>;
}

export function route<Path extends string>(parts: BaseRoutePaths<Path>): BindHandler<Path> {
  return (handler) => ({
    ...parts,
    handler,
  });
}

export interface ClusterRouteHandler<Response, Path extends string> {
  (request: ClusterK8sightApiRequest<Path>): RouteResponse<Response> | Promise<RouteResponse<Response>>;
}

export interface BindClusterHandler<Path extends string> {
  <TResponse>(handler: ClusterRouteHandler<TResponse, Path>): Route<TResponse, Path>;
}

export function clusterRoute<Path extends string>(parts: BaseRoutePaths<Path>): BindClusterHandler<Path> {
  return (handler) => ({
    ...parts,
    handler: ({ cluster, ...rest }) => {
      if (!cluster) {
        return {
          error: "Cluster missing",
          statusCode: 400,
        };
      }

      return handler({ cluster, ...rest });
    },
  });
}

export interface ValidatedClusterK8sightApiRequest<Path extends string, Payload> extends ClusterK8sightApiRequest<Path> {
  payload: Payload;
}

export interface ValidatedClusterRouteHandler<Payload, Response, Path extends string> {
  (request: ValidatedClusterK8sightApiRequest<Path, Payload>): RouteResponse<Response> | Promise<RouteResponse<Response>>;
}

export interface BindValidatedClusterHandler<Path extends string, Payload> {
  <Response>(handler: ValidatedClusterRouteHandler<Payload, Response, Path>): Route<Response, Path>;
}

export function payloadValidatedClusterRoute<Path extends string, Payload>({
  payloadValidator,
  ...parts
}: ValidatorBaseRoutePaths<Path, Payload>): BindValidatedClusterHandler<Path, Payload> {
  const boundClusterRoute = clusterRoute(parts);

  return (handler) =>
    boundClusterRoute(({ payload, ...rest }) => {
      const validationResult = payloadValidator.validate(payload);

      if (validationResult.error) {
        return {
          error: validationResult.error,
          statusCode: 400,
        };
      }

      return handler({
        payload: validationResult.value,
        ...rest,
      });
    });
}
