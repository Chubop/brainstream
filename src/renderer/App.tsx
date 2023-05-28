import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, ChakraProvider, Text } from '@chakra-ui/react'
import icon from '../../assets/icon.svg';
import './App.css';
import Start from './components/Start';



export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
