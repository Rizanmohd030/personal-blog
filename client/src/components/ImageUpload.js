import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import apiService from '../services/apiService';
import './ImageUpload.css';

const ImageUpload = ({ onImageUpload, multiple = false }) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setUploading(true);
    
    try {
      const formData = new FormData();
      
      if (multiple) {
        acceptedFiles.forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append('image', acceptedFiles[0]);
      }

      const response = await apiService.post(
        `/upload/${multiple ? 'multiple' : 'single'}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      if (response.data.success) {
        if (multiple) {
          onImageUpload(response.data.images);
        } else {
          onImageUpload(response.data.imageUrl);
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: multiple,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div 
      {...getRootProps()} 
      className={`image-upload-dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="upload-content">
        {uploading ? (
          <p>Uploading...</p>
        ) : (
          <>
            <div className="upload-icon">📁</div>
            <p>
              {isDragActive ? 
                'Drop the image here...' : 
                `Drag & drop ${multiple ? 'images' : 'an image'} here, or click to select`
              }
            </p>
            <small>Supports: JPEG, PNG, GIF, WebP (Max 5MB)</small>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;