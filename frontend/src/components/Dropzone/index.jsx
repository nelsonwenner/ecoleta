import React,{ useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

const Dropzone = ({ onFileUpload }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUpload(file);
  }, [onFileUpload]);
  
  const { getRootProps, getInputProps } = useDropzone({onDrop, accept: 'image/*'});

  return (
    <div className="dropzone" { ...getRootProps() }>
      <input { ...getInputProps() } accept='image/*' />

      {selectedFileUrl ? (

        <img src={ selectedFileUrl } alt='thumbnail point' />

      ) : (

        <div className="border">
          <div>
            <FiUpload />
            Establishment Image
          </div>
        </div>

      )}
    </div>
  )
}

export default Dropzone;
