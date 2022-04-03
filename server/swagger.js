"";
export default {
  swagger: "2.0",
  info: {
    version: `${process.env.NODE_ENV.charAt[0].toUpperCase().concat(process.env.NODE_ENV.substring(1))} Version`,
    title: "NIR",
    description: "Node Image Recognition",
    contact: {
      name: "Bilgem B720",
      email: "noreplay@bilengoz.com",
      url: "https://nir.bilengoz.com",
    },
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local server",
    },
    {
      url: "https://test.nir.bilengoz.com",
      description: "Testing server",
    },
    {
      url: "https://nir.bilengoz.com",
      description: "Production server",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: "Photo",
    },
    {
      name: "Notification",
    },
    {
      name: "User",
    },
    {
      name: "SysComponent",
    },
  ],
  paths: {
    "/api/photo/add": {
      post: {
        tags: ["Photo"],
        description: "Add a photo to database",
        operationId: "addPhoto",
        consumes: ["multipart/form-data"],
        produces: ["application/json"],
        parameters: [
          {
            name: "photo",
            in: "formData",
            type: "file",
            required: true,
            description: "Photo to add",
          },
          {
            name: "grounddataId",
            in: "formData",
            type: "integer",
            required: true,
            description: "Ground Data id for photo",
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/photo/remove/{id}": {
      get: {
        tags: ["Photo"],
        description: "Remove a photo from db",
        operationId: "removePhoto",
        parameters: [
          {
            name: "id",
            in: "path",
            type: "integer",
            required: true,
            description: "Photo to remove",
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/photo/flush/{limit}": {
      get: {
        tags: ["Photo"],
        description: "Flush orphan photos from db",
        operationId: "flushPhoto",
        parameters: [
          {
            name: "limit",
            in: "path",
            type: "integer",
            required: true,
            description: "Photo limit to flush",
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/notification/{page}/{limit}": {
      get: {
        tags: ["Notification"],
        description: "Get a notification list from db",
        operationId: "getNotificationList",
        parameters: [
          {
            name: "page",
            in: "path",
            type: "integer",
            required: true,
            description: "Notification pagination number",
          },
          {
            name: "limit",
            in: "path",
            type: "integer",
            required: true,
            description: "Notification pagination limit",
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/notification/count": {
      get: {
        tags: ["Notification"],
        description: "Get notification count of the user",
        operationId: "notificationCount",
        parameters: [],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/notification/add": {
      post: {
        tags: ["Notification"],
        description: "Send a notification to web / mobile app",
        operationId: "sendNotification",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Message title and body",
            required: true,
            type: "object",
            example: {
              userId: 5,
              msgTitle: "Notification Message Title",
              msgBody: "Notification Message Body",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/user/renewpassword": {
      post: {
        tags: ["User"],
        description: "Renew user password",
        operationId: "userRenewpassword",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Renew password",
            required: true,
            type: "object",
            example: {
              password: "newpassword",
              hash: "1f3870be274f6c49b3e31a0c6728957f",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/forgetpassword": {
      post: {
        tags: ["User"],
        description: "Request password renewal",
        operationId: "userRequestRenewal",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Forgot password",
            required: true,
            type: "object",
            example: {
              email: "mail@tubitak.gov.tr",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/validate/{hash}": {
      get: {
        tags: ["User"],
        description: "Validate registered user ",
        operationId: "validateUser",
        parameters: [
          {
            name: "hash",
            in: "path",
            type: "integer",
            required: true,
            description: "Hash to validate user account",
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/login": {
      post: {
        tags: ["User"],
        description: "Login user",
        operationId: "userLogin",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User credentials",
            required: true,
            type: "object",
            example: {
              email: "mail@tubitak.gov.tr",
              password: "password",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/ldaplogin": {
      post: {
        tags: ["User"],
        description: "Login LDAP user",
        operationId: "userLDAPLogin",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User credentials",
            required: true,
            type: "object",
            example: {
              email: "mail@tubitak.gov.tr",
              password: "password",
              ldapserverId: "2",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/googlelogin": {
      post: {
        tags: ["User"],
        description: "Login with Google",
        operationId: "userGoogleLogin",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User credentials",
            required: true,
            type: "object",
            example: {
              tokenId: "tokenexample",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/register": {
      post: {
        tags: ["User"],
        description: "Register user",
        operationId: "userRegister",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User credentials",
            required: true,
            type: "object",
            example: {
              userName: "username",
              password: "password",
              email: "someemail@mail.com",
              firstName: "Some Name",
              lastName: "Some other name",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/logout": {
      get: {
        tags: ["User"],
        description: "Logout user ",
        operationId: "logoutUser",
        parameters: [],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
        security: [],
      },
    },
    "/api/user/ldapservers": {
      get: {
        tags: ["User"],
        description: "Get LDAP servers",
        operationId: "getLDAPServers",
        parameters: [],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/user/me": {
      get: {
        tags: ["User"],
        description: "Get User Info ",
        operationId: "getUserInfo",
        parameters: [],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
      post: {
        tags: ["User"],
        description: "Set User Info ",
        operationId: "setUserInfo",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User Info",
            required: true,
            type: "object",
            example: {
              firstName: "Some Name",
              lastName: "Some other name",
              email: "mail@mail.com",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/user/photo": {
      post: {
        tags: ["User"],
        description: "Set user photo",
        operationId: "userPhoto",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User credentials",
            required: true,
            type: "object",
            example: {
              photo: "base64 Photo String here",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
    "/api/component/findByUser": {
      post: {
        tags: ["SysComponent"],
        description: "Find components according to users ",
        operationId: "getComponents",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "User Id",
            required: true,
            type: "object",
            example: {
              p_user_idx: "2539",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful",
            schema: { $ref: "#/definitions/Response" },
          },
          400: {
            description: "Bad Request",
            schema: { $ref: "#/definitions/Response" },
          },
          401: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          404: {
            description: "Unauthorized",
            schema: { $ref: "#/definitions/Response" },
          },
          500: {
            description: "Internal Server Error",
            schema: { $ref: "#/definitions/Response" },
          },
        },
      },
    },
  },
  securityDefinitions: {
    ApiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "AUTH_TOKEN",
    },
  },
  definitions: {
    SysComponent: {
      type: "object",
      properties: {
        p_user_idx: {
          type: "integer",
          required: true,
          description: "An user id ",
          example: 23,
        },
      },
    },
    Response: {
      type: "object",
      properties: {
        data: {
          type: "object",
        },
        code: {
          type: "integer",
          description: "Response Code",
          enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 404, 500, 401],
        },
        message: {
          type: "string",
          example: "A response message",
        },
      },
      example: {
        code: 1,
        data: {},
        message: "Response message",
      },
    },
  },
};
