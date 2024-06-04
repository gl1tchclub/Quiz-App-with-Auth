import React from "react";
import CardWrapper from "../components/CardWrapper";

const apiInfo = [
  {
    name: "Register Basic User",
    method: "POST",
    url: "/api/v1/auth/register",
    requestBody: `{
      "email": "string",
      "firstName": "string",
      "lastName": "string,
      "username": "string",
      "password": "string",
      "confirm_password": "string"
}`,
    responseBody: `{
      "id": "integer",
      "email": "string",
      "firstName": "string",
      "lastName": "string,
      "username": "string",
      "password": "string",
      "role": "string",
      "avatar": "string"
      "createdAt": "string"
}`,
  },
  {
    name: "Login User",
    method: "POST",
    url: "/api/v1/auth/login",
    requestBody: `{
      "username": "string",
      "password": "string"
}`,
    responseBody: `{
      "token": "string"
}`,
  },
  {
    name: "Home",
    method: "",
    url: "/",
    requestBody: `{}`,
    responseBody: `{}`,
  },
  {
    name: "Quizzes",
    method: "GET",
    url: "/api/v1/quizzes",
    requestBody: `{}`,
    responseBody: `{}`,
  },
];

const ApiInfoPage = () => {
  return (
    <div className="w-full py-10">
      <CardWrapper
        title="API Information"
        style="w-1/2 mx-auto bg-pink-300 shadow-lg rounded-lg p-6"
      >
        {apiInfo.map((api, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">{api.name}</h2>
            <div className="mt-2">
              <span className="text-gray-700 font-medium">HTTP Method:</span>{" "}
              <span className="text-pink-600 font-medium">{api.method}</span>
            </div>
            <div className="mt-2">
              <span className="text-gray-700 font-medium">Endpoint URL:</span>{" "}
              <span className="text-pink-600 font-medium">{api.url}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Request Body:
              </h3>
              <pre className="bg-pink-200 text-pink-800 rounded-md p-4 overflow-x-auto">
                {api.requestBody}
              </pre>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Response Body:
              </h3>
              <pre className="bg-pink-200 text-pink-800 rounded-md p-4 overflow-x-auto">
                {api.responseBody}
              </pre>
            </div>
          </div>
        ))}
      </CardWrapper>
    </div>
  );
};

export default ApiInfoPage;
