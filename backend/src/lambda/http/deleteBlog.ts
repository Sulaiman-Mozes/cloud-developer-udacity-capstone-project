import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteBlogs } from '../../businessLogic/blogs'



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const blogId = event.pathParameters.blogId;

  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  try {

    await deleteBlogs(blogId, jwtToken);

    return {
      statusCode:204,
      headers:{
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    }
  } catch (error) {
    return{
      statusCode:400,
      headers:{
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({
        error: 'An error occured when deleting, please try again'
      })
    }
  }

}
