import 'source-map-support/register';

import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { getAllBlogsbyScan } from '../../businessLogic/blogs'

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user

  const items = await getAllBlogsbyScan();

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
