import React, { useRef, useState } from 'react';
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from 'imagekitio-next';
import config from '@/lib/config';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Props {
  type: 'image' | 'video';
  placeholder?: string;
  accept: string;
  folder: string;
  variant: 'light' | 'dark';
  onFileChange: (filePath: string) => void;
  value?:string
}

const authenticatior = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status} : ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication failed : ${error.message}`);
  }
};

const FileUpload = ({
  onFileChange,
  type,
  placeholder,
  accept,
  folder,
  variant,
  value
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(
  value ? { filePath: value } : null
);

  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-dark-100' : 'text-dark-400',
  };

  const onError = (error: any) => {
    console.error(error);
    toast({
      title: `Uh oh! ${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again.`,
      variant: 'destructive',
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${type} uploaded successfully`,
      description: `${res.filePath} uploaded successfully`,
    });
  };

  const onValidate = (file: File): boolean => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file that is less than 20MB',
          variant: 'destructive',
        });
        return false;
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file that is less than 50MB',
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndPoint}
      authenticator={authenticatior}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <div className="upload-container">
        <button
          className={cn('upload-btn flex flex-row items-center py-2', styles.button)}
          onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current) {
              // @ts-ignore
              ikUploadRef.current?.click();
            }
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="upload"
            width={20}
            height={20}
            className="object-contain"
          />
          {!file ? (
            <p className={cn('text-[14px]', styles.placeholder)}>{placeholder}</p>
          ) : (
            <p className={cn('upload-filename')}>{file.filePath}</p>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-full rounded-full bg-gray-200 mt-2">
          <div
            className="progress bg-green-500 text-white text-center text-sm leading-none rounded-full h-2"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Display Uploaded File */}
      {file &&
        (type === 'image' ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={500}
            className="rounded-xl h-[300px] object-cover mt-3"
          />
        ) : type === 'video' ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : (
          <p>Upload something</p>
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;
