import * as uuid from 'uuid'

import  { BlogItem } from '../models/BlogItem'
import { BlogAccess } from '../dataLayer/blogsAccess'
import { CreateBlogRequest } from '../requests/CreateBlogRequest'
import { UpdateBlogRequest } from '../requests/UpdateBlogRequest'
import { parseUserId } from '../auth/utils'
import { createLogger } from '../utils/logger'


const blogsAccess = new BlogAccess();
const logger = createLogger('blogs-business-logic');

export async function getAllBlogs(jwtToken: string): Promise<BlogItem[]> {
  const userId = parseUserId(jwtToken)
  logger.info(`Initiated Request for getting all blogs. User: ${userId}`)
  return await blogsAccess.getAllBlogs(userId);
}

export async function getAllBlogsbyScan(): Promise<BlogItem[]> {
  logger.info(`Initiated Request for getting all blogs by Scan`)
  return await blogsAccess.getAllBlogsbyScan();
}

export async function getBlog(blogId: string): Promise<BlogItem> {
    return await blogsAccess.getBlog(blogId);
}

export async function updateBlog(blogId: string, jwtToken: string, updatedBlog: UpdateBlogRequest): Promise<BlogItem> {
    const userId = parseUserId(jwtToken);
    logger.info(`Initiated Request for updating blog. User: ${userId}, Blog: ${blogId}`)

    const item = await getBlog(blogId);

    if (!item || item.userId !== userId) {
        logger.error(`Item doesnot exist. User: ${userId}, Blog ${blogId}`)
        throw new Error('Item doesnot exist')
    }
    await blogsAccess.updateBlog(blogId, updatedBlog);

    return {...item, ...updatedBlog}
}

export async function deleteBlogs(blogId: string, jwtToken:string): Promise<void> {
    const userId = parseUserId(jwtToken);

    logger.info(`Initiated Request for deleting blog. User: ${userId}, Blog: ${blogId}`)

    const item = await getBlog(blogId);

    if (!item || item.userId !== userId) {
        logger.error(`Blog doesnot exist. User: ${userId}, Blog ${blogId}`)
        throw new Error('Blog doesnot exist')
    }

    return await blogsAccess.deleteBlog(blogId);
}

export async function createBlog(
  createBlogRequest: CreateBlogRequest,
  jwtToken: string
): Promise<BlogItem> {

  const id = uuid.v4()
  const userId = parseUserId(jwtToken)

  logger.info(`Initiated Request for creating blog. User: ${userId}`)

  return await blogsAccess.createBlog({
        blogId: id,
        userId: userId,
        createdAt: new Date().toISOString(),
        attachmentUrl: "",
        ...createBlogRequest
  })
}
