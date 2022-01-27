'use strict';

exports.handler = async (event, context) => {
  const name = event.queryStringParameters.name || "World";

  return {
    statusCode: 200,
    body: `Hello, ${name}
    ${JSON.stringify(event)}
    
    ${JSON.stringify(context)}
    `,
  };
};
