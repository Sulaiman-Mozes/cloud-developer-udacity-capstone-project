import { apiEndpoint } from '../config'
import { Blog } from '../types/Blog';
import { CreateBlogRequest } from '../types/CreateBlogRequest';
import Axios from 'axios'
import { UpdateBlogRequest } from '../types/UpdateBlogRequest';


interface uploadUrlResponse {
  uploadUrl: string
  attachmentUrl: string
}

export async function getBlogs(idToken: string): Promise<Blog[]> {
  console.log('Fetching blogs')

  const response = await Axios.get(`${apiEndpoint}/blogs`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Blogs:', response.data)
  return response.data.items
}


export async function getAllBlogs(): Promise<Blog[]> {
  console.log('Fetching blogs')

  const response = await Axios.get(`${apiEndpoint}/blogs/all`, {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Blogs:', response.data)
  return response.data.items
}

export async function getBlog(blogId: string): Promise<Blog> {
  console.log('Fetching blog')

  const response = await Axios.get(`${apiEndpoint}/blogs/${blogId}`, {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Blog:', response.data)
  return response.data.item
}

export async function createBlog(
  idToken: string,
  newBlog: CreateBlogRequest
): Promise<Blog> {
  const response = await Axios.post(`${apiEndpoint}/blogs`,  JSON.stringify(newBlog), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchBlog(
  idToken: string,
  blogId: string,
  updatedBlog: UpdateBlogRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/blogs/${blogId}`, JSON.stringify(updatedBlog), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteBlog(
  idToken: string,
  blogId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/blogs/${blogId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  blogId: string
): Promise<uploadUrlResponse> {
  const response = await Axios.post(`${apiEndpoint}/blogs/${blogId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return { ...response.data}
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
