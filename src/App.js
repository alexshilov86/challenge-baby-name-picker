import { React } from 'react';
import './App.css';
import babynameslist from "./babynames.js"
import Container from './Container';
import Info from './info';



function App() {
  
  return (
    <div >
      <Container data={babynameslist}/>
      <Info />
    </div>
  );
}
export default App;
