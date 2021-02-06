import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import  { BlogItem } from '../models/BlogItem'
import { BlogUpdate } from '../models/BlogUpdate'
import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('blogs-data-layer');

export class BlogAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly blogsTable = process.env.BLOGS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX
  ) {}

  async getAllBlogsbyScan(): Promise<BlogItem[]> {
    console.log('Getting all groups')

    const result = await this.docClient.scan({
      TableName: this.blogsTable
    }).promise()

    const items = result.Items
    return items as BlogItem[]
  }

  async getAllBlogs(userId: string): Promise<BlogItem[]> {
    logger.info(`Getting user blogs, User : ${userId}`)

    const result = await this.docClient.query({
        TableName: this.blogsTable,
        IndexName: this.userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      }).promise()
    
    const items = result.Items;

    return items as BlogItem[];
  }

  async getBlog(blogId: string): Promise<BlogItem> {
    logger.info(`Getting Blog Item. Blog: ${blogId}`)

    const result = await this.docClient.get({
        TableName: this.blogsTable,
        Key: {
          blogId
        }
      }).promise();
    
    const item = result.Item;

    return item as BlogItem;
  }

  async updateBlog(blogId: string, updatedBlog: BlogUpdate): Promise<BlogUpdate> {
    logger.info(`Updating Blog. Blog ${blogId}`)
    await this.docClient.update({
        TableName: this.blogsTable,
        Key: {
          blogId
        },
        UpdateExpression: 'set #title = :title, description = :description, content = :content',
        ExpressionAttributeNames: {
          "#title": "title"
        },
        ExpressionAttributeValues: {
          ":title": updatedBlog.title,
          ":description": updatedBlog.description,
          ":content": updatedBlog.content
        }
      }).promise();
    return updatedBlog as BlogUpdate;
  }

  async createBlog(blogItem: BlogItem): Promise<BlogItem> {
    logger.info(`Creating Blog`)
    await this.docClient.put({
        TableName: this.blogsTable,
        Item: blogItem
      }).promise();   

    return blogItem;
  }

  async deleteBlog(blogId: string): Promise<void> {
    logger.info(`Deleting Blog, Blog: ${blogId}`)
    await this.docClient.delete({
        TableName: this.blogsTable,
        Key: {
            blogId
        }
      }).promise();
  }

}
