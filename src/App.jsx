import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import VinyleSync from './VinyleSync';
import InstructionsModal from './InstructionsModal';

function App() {
  return (
    <BrowserRouter basename="/ar_vsnr/">
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Landing />} />
        
        {/* Page AR */}
        <Route path="/vinylesync" element={<VinyleSync />} />
        {/* Page d'instructions */}
        <Route path="/instructions" element={<InstructionsModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;