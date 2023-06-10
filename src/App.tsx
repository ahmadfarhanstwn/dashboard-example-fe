import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './scenes/layout';
import Dashboard from './scenes/dashboard';
import { GlobalState } from './index';
import Products from './scenes/products';

function App() {
  const mode = useSelector((state: GlobalState) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/products' element={<Products />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
