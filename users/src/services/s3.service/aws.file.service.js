import AWS from 'aws-sdk'
const config= require("../config/config")


const S3_BUCKET ='social-media-static';
const REGION ='ap-south-1';


AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

 
async function uploadFile  (file)  {

    var params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      
        ContentType: "image/png",
        Expires: 86400,
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
         
         console.log(evt);
           // setProgress(Math.round((evt.loaded / evt.total) * 100))
        })
        .send((err) => {
            if (err) console.log(err)
        })
 const url = await myBucket.getSignedUrlPromise('putObject',params)
 console.log(   url.split('?')[0]); 
 return url.split('?')[0];
}

export default uploadFile;