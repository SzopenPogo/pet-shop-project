import React, { ChangeEvent, useState } from 'react';
import ImageContainer from '../../containers/ImageContainer/ImageContainer';
import classes from './FilesInput.module.scss';

interface IProps {
  title: string;
  isRequired: boolean;
  acceptedFile?: string;
}

const FilesInput = React.forwardRef<HTMLInputElement, IProps>(({
  title, 
  isRequired, 
  acceptedFile
  }, ref) => {

  const [selectedFiles, setSelectedFiles] = useState<FileList>();

  const isImageInput = acceptedFile === 'image';
  const imagesUrl = [] as Array<string>;

  const handleFile = (event:  ChangeEvent & { target: HTMLInputElement }) => {
    if (event.target.files && event.target.files.length) {
      const selectedFilesValue = event.target.files;

      setSelectedFiles(selectedFilesValue);
    }
  }

  if(selectedFiles && selectedFiles.length > 0 && isImageInput) {
    for (let i = 0; i < selectedFiles.length; i++) {
      imagesUrl.push(URL.createObjectURL(selectedFiles[i]));
    }
  }

  let renderImages;
  if(imagesUrl.length) {
    renderImages = imagesUrl.map((image, index) => (
      <ImageContainer key={index} imageUrl={image} size='8rem' />
    ))
    
  }

  const accept = acceptedFile ? `${acceptedFile}/*` : ''
  return (
    <div  className={classes['files-picker']}>
      <div className={classes['input-wrapper']} title={title}>
        {title && <div>{title}</div>}
        <input 
          ref={ref}
          type="file"
          name="file-name"
          required={isRequired}
          accept={accept}
          onChange={handleFile}
          multiple={true}
        />
      </div>
      {selectedFiles &&
        <div className={classes['selected-files-container']}>
          {renderImages}
        </div>}
    </div>
  )
})

export default FilesInput