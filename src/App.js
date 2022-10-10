import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
function App() {
  const list=[]
  const[ currentKnight,setCurrentKnight]=useState({})
  const [possibleMoves,setPossibleMoves]=useState([])
  const [fetchState,setFetchState]=useState(false)
    const findPossiblemoves=(i)=>{
      setCurrentKnight(i)
      setFetchState(true)
      axios.post('https://chess-knight-server.herokuapp.com/getmoves',i).then(res=>{
       setPossibleMoves([...res.data])
       setFetchState(false)
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
    <div style= {{paddingRight:'200px',paddingLeft:'563px',paddingTop:'40px',paddingBottom:'96px',background:'brown'}}>
    <h1 style={{width:'50%'}}>Find out All positon where knight can move by clicking any square?</h1>
    {fetchState && <h1>fetching all possible moves</h1>}
    <div  style={{   width: '400px',
      height: '400px',
      border:'black solid 5px'
   }}>
{list}
    </div>
    </div>
  );
}

export default App;
