import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemTable from './components/ItemTable';
import ItemDetails from './components/ItemDetails';
import UPCScanner from './components/UPCScanner';

function App() {

  return (
    <Routes>
      <Route path='/' element={<ItemTable />} />
      <Route path='/items/:id' element={<ItemDetails />} />
      <Route path='/upcscanner' element={<UPCScanner />} />
    </Routes>
  );
}

export default App;
