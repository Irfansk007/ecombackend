export const imageUrlGenerator = (imageurl,files,url)=>{
    if(imageurl && !files){
        const uploadImages = imageurl.split(",")
        return uploadImages
    }
    if(!imageurl && files){
        const uploadImages = files.map(file=>{
            return `${url}${file.filename}`
        })
        return uploadImages
    }
    if (imageurl && files){
      const newimageurl = imageurl.split(",")
      const newimagefiles = files.map(file=>{
        return `${url}${file.filename}`
    })
    const uploadImage = newimageurl.concat(newimagefiles)
    return uploadImage
    }

}


export const thumbnailGenerator = (thumbnailurl,files,url) =>{
if(thumbnailurl){
   return thumbnailurl
}
if (files){
    
    const uploadThubnail = files[0].filename
    return uploadThubnail
}
}