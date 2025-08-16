import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemTable from './components/ItemTable';
import ItemDetails from './components/ItemDetails';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ItemTable />} />
        <Route path='/items/:id' element={<ItemDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
