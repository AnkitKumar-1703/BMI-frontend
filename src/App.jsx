import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Heading } from './components/Heading'
import { Input } from './components/Inupt'
import { Button1, Button2 } from './components/Button'
import { Bottomheading } from './components/Bottomheading'
// import { calculate } from './components/function'
import axios from "axios"
import { Verdict } from './components/Verdict'
import Loder from './components/Loder'

function App() {
  const [weight,setWeight]=useState(0);
  const [height,setHeight]=useState(0);
  const [value,setValue]=useState("");
  const [text,setText]=useState("");
  const [loder,setLoder]=useState(false);

  return (
    <>
    <div data-theme="light" className='bg-blue-400 h-screen flex justify-center items-center'> 
      <div className='bg-white p-10 flex flex-col gap-2 rounded-md w-96'>
        <Heading/>
        <Input id="weight" onchange={(e)=>{setWeight(e.target.value)}} label='Weight (kg)' placeholder='Enter weight value'/>
        <Input id="height" onchange={(e)=>{setHeight(e.target.value)}} label='Height (cm)' placeholder='Enter height value'/>
        
        <Button1 onclick={async()=>{
          // setValue(calculate(weight,height))
          // console.log((weight));
          setLoder(true);
          const response = await axios.get("https://bmi-backend-i76l.onrender.com/calculate", {
              params: {
                weight,
                height
              }
            });
            if(response.status!==200){
              alert("Error in fetching data")
              setLoder(false);
            }
            else{
            setLoder(false);
            setValue(response.data.bmi);
            setText(response.data.text);
            }
          
          
        }}/>
        <Button2 onclick={()=>{
          document.getElementById("weight").value="";
          document.getElementById("height").value="";
          setWeight("");
          setHeight("");
          setValue("");
          setText("");
        
          console.log(value);
        }}/>
        <Bottomheading label={value}/>
        <Verdict text={text}/>
        <div className='flex justify-center'>
        {loder && <Loder/>}

        </div>
      </div>
    </div>
      
    </>
  )
}

export default App
