import React, { ChangeEvent, useState } from 'react';
import classes from './FileInput.module.scss';

interface IProps {
  title: string;
  isRequired: boolean;
  acceptedFile?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, IProps>(({
  title, 
  isRequired, 
  acceptedFile
  }, ref) => {
   
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFile = (event:  ChangeEvent & { target: HTMLInputElement }) => {
    if (event.target.files && event.target.files.length) {
      const selectedFileValue = event.target.files[0];

      setSelectedFile(selectedFileValue);
    }
  }

  const accept = acceptedFile ? `${acceptedFile}/*` : ''
  return (
    <div  className={classes['file-picker']}>
      <div className={classes['input-wrapper']} title={title}>
        {title && <div>{title}</div>}
        <input 
          ref={ref}
          type="file"
          name="file-name"
          required={isRequired}
          accept={accept}
          onChange={handleFile}
        />
      </div>
      {selectedFile &&
        <div className={classes['selected-file-container']}>
          {acceptedFile === 'image' && <div
            className={classes['image-previev']}
            style={{backgroundImage: `url(${URL.createObjectURL(selectedFile)})`}}
          />}
          <span className={classes['file-name']}>
            <span>File name:</span> {selectedFile.name}
          </span>
        </div>
      }
    </div>
  )
})

export default FileInput