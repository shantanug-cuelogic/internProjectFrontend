const config = {
    codeMirrorOptions: {
        tabSize: 4
    },
    videoDefaultDisplay: 'inline',
    videoAllowedTypes: ['mp4'],
    videoUpload: true,
    videoUploadMethod: 'POST',
    videoUploadParam: 'file_name',
    videoUploadURL: 'http://localhost:3000/editor/videoupload',

    imageUpload: true,
    imageUploadMethod: 'POST',
    imageUploadParam: 'file_name',
    imageUploadRemoteUrls: true,
    imageUploadURL: 'http://localhost:3000/editor/imageupload',

    fileUpload: true,
    fileUploadURL: 'http://localhost:3000/editor/fileupload',
    fileUploadMethod: 'POST',
    fileUploadParam: 'file_name',
    colorsDefaultTab: 'background',
    disableRightClick: true,
    codeMirror: false
}

export default config;