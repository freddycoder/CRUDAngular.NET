export interface OpenAPI {
  openapi: string;
  info: Info;
  servers: Server[];
  paths: Paths;
  components: Components;
  security: SecurityRequirement[];
  tags: Tag[];
  externalDocs: ExternalDocumentation;
}

export interface Info {
  title: string;
  description: string;
  termsOfService: string;
  contact: Contact;
  license: License;
  version: string;
}

export interface Contact {
  name: string;
  url: string;
  email: string;
}

export interface License {
  name: string;
  url: string;
}

export interface Server {
  url: string;
  description: string;
  variables: { [name: string]: ServerVariable };
}

export interface ServerVariable {
  enum: string[];
  default: string;
  description: string;
}

export interface Paths {
    [path: string]: PathItem;
    }

export interface PathItem {
    $ref: string;
    summary: string;
    description: string;
    get: Operation;
    put: Operation;
    post: Operation;
    delete: Operation;
    options: Operation;
    head: Operation;
    patch: Operation;
    trace: Operation
    servers: Server[];
    parameters: Parameter[];
}

export interface Operation {
  tags: string[];
  summary: string;
  description: string;
  externalDocs: ExternalDocumentation;
  operationId: string;
  parameters: Parameter[];
  requestBody: RequestBody;
  responses: Responses;
  callbacks: Callback;
  deprecated: boolean;
  security: SecurityRequirement[];
  servers: Server[];
}

export interface ExternalDocumentation {
  description: string;
  url: string;
}

export interface Parameter {
  name: string;
  in: string;
  description: string;
  required: boolean;
  deprecated: boolean;
  allowEmptyValue: boolean;
  style: string;
  explode: boolean;
  allowReserved: boolean;
  schema: Schema;
  example: any;
  examples: Example[];
  content: { [mediaType: string]: MediaType };
}

export interface Schema {
  title: string;
  multipleOf: number;
  maximum: number;
  exclusiveMaximum: boolean;
  minimum: number;
  exclusiveMinimum: boolean;
  maxLength: number;
  minLength: number;
  pattern: string;
  maxItems: number;
  minItems: number;
  uniqueItems: boolean;
  maxProperties: number;
  minProperties: number;
  required: string[];
  enum: string[];
  type: string;
  allOf: Schema[];
  oneOf: Schema[];
  anyOf: Schema[];
  not: Schema;
  items: Schema;
  properties: { [name: string]: Schema };
  additionalProperties: Schema;
  description: string;
  format: string;
  default: any;
  nullable: boolean;
  discriminator: Discriminator;
  readOnly: boolean;
  writeOnly: boolean;
  xml: XML;
  externalDocs: ExternalDocumentation;
  example: any;
  deprecated: boolean;
}

export interface Discriminator {
  propertyName: string;
  mapping: { [value: string]: string };
}

export interface XML {
  name: string;
  namespace: string;
  prefix: string;
  attribute: boolean;
  wrapped: boolean;
}

export interface Example {
  summary: string;
  description: string;
  value: any;
  externalValue: string;
}

export interface MediaType {
  schema: Schema;
  example: any;
  examples: Example[];
  encoding: { [name: string]: Encoding };
}

export interface Encoding {
  contentType: string;
  headers: { [name: string]: Header };
  style: string;
  explode: boolean;
  allowReserved: boolean;
}

export interface Header {
  description: string;
  required: boolean;
  deprecated: boolean;
  allowEmptyValue: boolean;
  style: string;
  explode: boolean;
  allowReserved: boolean;
  schema: Schema;
  example: any;
  examples: Example[];
  content: { [mediaType: string]: MediaType };
}

export interface RequestBody {
  description: string;
  content: { [mediaType: string]: MediaType };
  required: boolean;
}

export interface Responses {
  default: Response;
  [status: string]: Response;
}

export interface Response {
  description: string;
  headers: { [name: string]: Header };
  content: { [mediaType: string]: MediaType };
  links: { [name: string]: Link };
}

export interface Link {
  operationRef: string;
  operationId: string;
  parameters: { [name: string]: any };
  requestBody: any;
  description: string;
  server: Server;
}

export interface Callback {
  [name: string]: PathItem;
}

export interface Components {
  schemas: { [name: string]: Schema };
  responses: { [name: string]: Response };
  parameters: { [name: string]: Parameter };
  examples: { [name: string]: Example };
  requestBodies: { [name: string]: RequestBody };
  headers: { [name: string]: Header };
  securitySchemes: { [name: string]: SecurityScheme };
  links: { [name: string]: Link };
  callbacks: { [name: string]: Callback };
}

export interface SecurityScheme {
  type: string;
  description: string;
  name: string;
  in: string;
  scheme: string;
  bearerFormat: string;
  flows: OAuthFlows;
  openIdConnectUrl: string;
}

export interface OAuthFlows {
  implicit: OAuthFlow;
  password: OAuthFlow;
  clientCredentials: OAuthFlow;
  authorizationCode: OAuthFlow;
}

export interface OAuthFlow {
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl: string;
  scopes: { [name: string]: string };
}

export interface SecurityRequirement {
  [name: string]: string[];
}

export interface Tag {
  name: string;
  description: string;
  externalDocs: ExternalDocumentation;
}