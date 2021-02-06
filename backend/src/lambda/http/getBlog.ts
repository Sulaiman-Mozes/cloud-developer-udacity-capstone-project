import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { getBlog } from '../../businessLogic/blogs'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  const blogId = event.pathParameters.blogId;
  const item = await getBlog(blogId);

  if (!item) {
    return {
        statusCode:404,
        headers:{
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Blog doesnot exist'
        })
      }
    
    }

  return {
    statusCode:200,
    headers:{
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      item
    })
  }

}
