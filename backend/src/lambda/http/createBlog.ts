import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateBlogRequest } from '../../requests/CreateBlogRequest'
import { createBlog } from '../../businessLogic/blogs'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newBlog: CreateBlogRequest = JSON.parse(event.body);

  if (!newBlog.title || !newBlog.description || !newBlog.content) {
    return{
      statusCode:400,
      headers:{
        'Access-Control-Allow-Origin': "*"
      },
      body: JSON.stringify({
        error: 'All fields are required'
      })
    }
  }

  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  const item = await createBlog(newBlog, jwtToken);

  // TODO: Implement creating a new TODO item
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item
    })
  }

}
