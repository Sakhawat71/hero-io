import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Apps from './pages/Apps.jsx';
import AppDetails from './pages/AppDetails.jsx';
import Installation from './pages/Installation.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: 600,
            borderRadius: '12px',
            padding: '14px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apps" element={<Apps />} />
          <Route path="apps/:id" element={<AppDetails />} />
          <Route path="installation" element={<Installation />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
