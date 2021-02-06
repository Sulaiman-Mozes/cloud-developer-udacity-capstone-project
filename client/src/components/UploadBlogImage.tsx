import * as React from 'react'
import Auth from '../auth/Auth'
import { getUploadUrl, uploadFile } from '../api/blogs-api'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile,
}

interface UploadBlogImageProps {
  blogId: string
  auth: Auth
  onUploadImageSucessful: (blogId: string, attachmentUrl: string) => void;
}

interface UploadBlogImageState {
  file: any
  uploadState: UploadState
}

export class UploadBlogImage extends React.PureComponent<
  UploadBlogImageProps,
  UploadBlogImageState
> {
  state: UploadBlogImageState = {
    file: undefined,
    uploadState: UploadState.NoUpload
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.handleSubmit(files);
  }

  handleSubmit = async (files: any) => {
    try {
      if (!files[0]) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.FetchingPresignedUrl)
      const {uploadUrl, attachmentUrl} = await getUploadUrl(this.props.auth.getIdToken(), this.props.blogId)

      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadUrl, files[0])
      this.props.onUploadImageSucessful(this.props.blogId, attachmentUrl)
    } catch (e) {
      alert('Could not upload a file: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  render() {
    return (
        <>
          <input accept="*" onChange={this.handleFileChange} type="file" className="inputfile" id={`embedpollfileinput-${this.props.blogId}`} />
          <label htmlFor={`embedpollfileinput-${this.props.blogId}`} className="blue ui button">
            <i className="ui upload icon"></i>
            {this.state.uploadState === UploadState.FetchingPresignedUrl && 'Uploading image metadata'}
            {this.state.uploadState === UploadState.UploadingFile && 'Uploading file'}
            {(this.state.uploadState !== UploadState.UploadingFile &&  this.state.uploadState !== UploadState.FetchingPresignedUrl) && 'Upload Image' }
          </label>
        </>
    )
  }
}
