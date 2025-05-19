import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import UploadFIle from './components/UploadFile';
import { useStorage } from '../hooks/useStorage';
// import Pagination from './Pagination';
import './FolderContent.css';


const FolderContent = ({ folderId, folderName, icon, onBack, onNextFolder }) => {
  const [folders, updateFolders] = useStorage('folders', {
    photos: [],
    videos: [],
    documents: [],
    Plus:[],
  });
  const [currentFolderId, setCurrentFolderId] = useState('photos');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page

  const handleRemoveItem = (index) => {
    try {
      if (!folders || !folders[folderId]) {
        throw new Error('Invalid folder data');
      }
      const updatedFolders = {
        ...folders,
        [folderId]: folders[folderId].filter((_, i) => i !== index)
      };
      updateFolders(updatedFolders);
    } catch (err) {
      setError('Failed to remove item');
      console.error('Error removing item:', err);
    }
  };

  const handleAddCategory = () => {
    try {
      if (!newCategory.trim()) {
        setError('Category name cannot be empty');
        return;
      }

      if (!folders || !folders[folderId]) {
        throw new Error('Invalid folder data');
      }

      if (folders[folderId].includes(newCategory.trim())) {
        setError('This category already exists');
        return;
      }

      const updatedFolders = {
        ...folders,
        [folderId]: [...(folders[folderId] || []), newCategory.trim()]
      };
      updateFolders(updatedFolders);
      setNewCategory('');
      setShowAddModal(false);
      setError('');
    } catch (err) {
      setError('Failed to add category');
      console.error('Error adding category:', err);
    }
  };

  const getFolderIcon = (type) => {
    switch(type) {
      
      case 'photos':
        return '🖼️';
      case 'videos':
        return '🎬';
      case 'documents':
        return '📄';
         case 'Plus':
        return '+';
    }
  };
  

  const handleNextFolder = () => {
    try {
      const folderTypes = ['photos', 'videos', 'documents' ];
      const currentIndex = folderTypes.indexOf(folderId);
      if (currentIndex === -1) {
        throw new Error('Invalid folder type');
      }
      const nextIndex = (currentIndex + 1) % folderTypes.length;
      const nextFolderId = folderTypes[nextIndex];
      onNextFolder(nextFolderId);
          // Reset pagination when changing folders
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to navigate to next folder');
      console.error('Error navigating to next folder:', err);
    }
  };

  return (
    
    <div className="folder-content-page">
      {error && (
        <div className="error-message">
          {error}
          <button className="error-close" onClick={() => setError('')}>×</button>
        </div>
      )}
       <input
              type="file"
              id="uploadInput"
              multiple
              style={{ display: 'none' }}
              // onChange={handleUpload}
            />

            {/* Styled label as button */}
            <label htmlFor="uploadInput" className="upload-btn">
              Upload
            </label>
      
      <div className="folder-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="folder-title">
          <span className="folder-icon">{icon}</span>
          <h2>{folderName}</h2>
        </div>
        {folderId === '   ' && (
          <button className="next-folder-button" onClick={handleNextFolder}>
            Next Folder →
          </button>
        )}
      </div>

      <div className="content-container">
        <div className="items-grid">
         {folders && folders[folderId] && folders[folderId].length > 0 ? (
                folders[folderId]
                  // Apply pagination
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((item, index) => {
                    // Calculate the actual index in the original array
                    const actualIndex = (currentPage - 1) * itemsPerPage + index;
                    return (
                      <div
                        key={actualIndex}
                        className="item-card"
                        onClick={() => onNextFolder(item)} // 👈 navigate to this item as new folder
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="item-preview">
                          <span>{getFolderIcon(folderId)}</span>
                        </div>
                        <div className="item-info">
                          <span className="item-name">{item}</span>
                          <button
                            className="remove-button"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent triggering folder open
                              handleRemoveItem(actualIndex);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="empty-state">
                  {/* <p>No items in this folder</p> */}
                  <p className="empty-state-hint">This folder is empty</p>
                </div>
              )}
        </div>
        
        {/* Add pagination if there are items and they exceed itemsPerPage */}
        {/* {folders && folders[folderId] && folders[folderId].length > itemsPerPage && (
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(folders[folderId].length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )} */}
      </div>

      {/* Floating Add Category Button */}
      <button className="floating-add-button" onClick={() => setShowAddModal(true)}>
        <span className="plus-icon">+</span>
      </button>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Category</h3>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                setError('');
              }}
              placeholder="Enter category name"
              autoFocus
            />
            <div className="modal-buttons">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowAddModal(false);
                  setNewCategory('');
                  setError('');
                }}
              >
                Cancel
              </button>
              <button 
                className="add-button"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FolderContent.propTypes = {
  folderId: PropTypes.string.isRequired,
  folderName: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onNextFolder: PropTypes.func.isRequired
};

export default FolderContent; 