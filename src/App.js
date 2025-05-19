import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthButtons from './components/AuthButtons';
import FolderManager from './components/FolderManager';

import './App.css';

const Loading = () => (
  <div className="loading-container">
    <div className="loading">Loading...</div>
  </div>
);

function App() {
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    console.log('Uploaded files:', files.map(file => file.name));
    // TODO: Store or process files as needed
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>FileManager</h1>
          
          <div className="header-right">
            <AuthButtons />

            {/* Hidden file input */}
            {/* <input
              type="file"
              id="uploadInput"
              multiple
              style={{ display: 'none' }}
              onChange={handleUpload}
            />

            {/* Styled label as button */}
            {/* <label htmlFor="uploadInput" className="upload-btn">
              Upload
            </label>  */}
          </div>
        </header>

        <main>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<FolderManager />} />
              <Route path="/AuthButtons/:AuthButtons" element={<AuthButtons />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
