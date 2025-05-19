import React, { useState } from 'react';
import { useStorage } from '../hooks/useStorage';
import FolderContent from './FolderContent';
// import AuthButtons from './AuthButtons';
import './FolderManager.css';

const FolderManager = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useStorage('folders', {
    photos: [],
    videos: [],
    documents: [],
    Add: [],
  });

  const folderTypes = [
    { id: 'photos', name: 'Photos', icon: '📷' },
    { id: 'videos', name: 'Videos', icon: '🎥' },
    { id: 'documents', name: 'Documents', icon: '📄' },
    { id: 'Add', name: 'Add New', icon: '➕' }
  ];

  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId);
    // Reset any pagination state in child components
  };

  const handleBack = () => {
    setSelectedFolder(null);
  };

  const handleNextFolder = (nextFolderId) => {
    setSelectedFolder(nextFolderId);
  };

  const renderFolderList = () => (
    <div className="sidebar">
      <h3 className="sidebar-title"> DATATYPES</h3>
      {folderTypes.map(folder => (
        <div
          key={folder.id}
          className={`sidebar-folder ${selectedFolder === folder.id ? 'active' : ''}`}
          onClick={() => handleFolderClick(folder.id)}
        >
          <span className="folder-icon">{folder.icon}</span>
          <span className="folder-name">{folder.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="folder-manager">
      {renderFolderList()}
      <div className="folder-content">
        {selectedFolder ? (
          <FolderContent
            folderId={selectedFolder}
            folderName={folderTypes.find(f => f.id === selectedFolder).name}
            icon={folderTypes.find(f => f.id === selectedFolder).icon}
            onBack={handleBack}
            onNextFolder={handleNextFolder}
          />
        ) : (
          <div className="welcome-message">
            <h2>Select a folder from the sidebar</h2>
          </div>
        )}
      </div>
      </div>
  );
};

export default FolderManager;
