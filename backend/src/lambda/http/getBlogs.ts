import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { getAllBlogs } from '../../businessLogic/blogs'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user

  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  const items = await getAllBlogs(jwtToken);

  return {
    statusCode:200,
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      items
    })
  }

}
