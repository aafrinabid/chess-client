import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
function App() {
  const list=[]
  const[ currentKnight,setCurrentKnight]=useState({})
  const [possibleMoves,setPossibleMoves]=useState([])
  console.log(currentKnight)
    const findPossiblemoves=(i)=>{
      console.log(i)
      setCurrentKnight(i)
      axios.post('http://localhost:4000/getmoves',i).then(res=>{
       setPossibleMoves([...res.data])
      })
    }
    const checkIfPossible=(i,j)=>{
      const data=possibleMoves.find(e=>e.index==i && e.secondArrayIndex==j)
      if(data!==undefined){
        return true
      }else{
        return false
      }
    }

  for(let i=0;i<8;i++){
    for (var j = 0; j < 8; j++){
      const isPossible=checkIfPossible(i,j)
     list.push( <div key={`${i}${j}`} onClick={findPossiblemoves.bind(null,{i,j})} style={ {float: 'left',width: '50px',height: '50px',backgroundColor:`${i==currentKnight.i && j==currentKnight.j ?'red': isPossible?'green': (i+j)%2==0?'#000':'#fff'}`}}></div>)

    }
  }
 
  
    
  return (
    <div style= {{paddingRight:'200px',paddingLeft:'563px',paddingTop:'50px'}}>
    <div  style={{   width: '400px',
      height: '400px'
   }}>
{list}
    </div>
    </div>
  );
}

export default App;
