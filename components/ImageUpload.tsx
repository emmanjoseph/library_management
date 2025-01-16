'use client'
import React, { useRef, useState } from 'react'
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import config from '@/lib/config';
import ImageKit from 'imagekit';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';



const authenticatior = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

        if (!response.ok) {
            const errorText = await response.text()

            throw new Error(`Request failed with status ${response.status} : ${errorText}`)
        }

        const data = await response.json();

        const {signature,expire,token} = data;
         return { signature, expire, token };
    } catch (error:any) {
        throw new Error(`Authentication failed : ${error.message}`)
    }
} 

const ImageUpload = ({onFileChange}:{onFileChange:(filePath:string)=>void}) => {
    const ikUploadRef = useRef(null)
    const [file,setFile] = useState<{filePath:string} | null>(null)

    const onError = (error:any)=>{
        console.log(error)
        toast({
          title: "Uh oh! Images upload failed",
          description: "Please try again",
          variant:"destructive"
        })
    }
    const onSuccess = (res:any)=>{
        setFile(res)
        onFileChange(res.filePath)
        
        toast({
          title: "Image uploaded successfully",
          description: `${res.filePath} uploaded successfully`,
        })
    }
   
  return (
    <ImageKitProvider
    publicKey={config.env.imagekit.publicKey}
    urlEndpoint={config.env.imagekit.urlEndPoint}
    authenticator={authenticatior}
    >
        <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='test-upload.png'
        />

        <button className='upload-btn bg-dark-400' onClick={(e)=> {
            e.preventDefault()
            if (ikUploadRef.current) {
               // @ts-ignore
                ikUploadRef.current?.click()
            }
        }}>
            <Image src="/icons/upload.svg" alt='upload' width={20} height={20}
            className='object-contain'
            />
            <p className='text-base text-light-100'>upload a file</p>
            {file && <p className='upload-filename'>{file.filePath}</p>}
        </button>

        {file && (
            <IKImage 
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
            className='rounded-xl h-[300px] object-cover mt-3'
            />
        )}
    </ImageKitProvider>
  )
}

export default ImageUpload