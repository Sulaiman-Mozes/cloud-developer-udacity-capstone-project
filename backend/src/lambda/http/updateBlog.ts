import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateBlogRequest } from '../../requests/UpdateBlogRequest';
import { updateBlog } from '../../businessLogic/blogs';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const blogId = event.pathParameters.blogId
  const updatedBlog: UpdateBlogRequest = JSON.parse(event.body);

  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  const item = await updateBlog(blogId, jwtToken, updatedBlog);

  // TODO: Update a TODO item with the provided id using values in the "updatedBlog" object
  return {
    statusCode:200,
    headers:{
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item
    })
  }
}
