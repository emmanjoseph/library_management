"use client"
import {HexColorInput, HexColorPicker} from 'react-colorful'
import React, { useState } from 'react'


interface Props{
    value?:string,
    onPickerChange:(color:string)=> void;
    
}
const ColorPicker = ({value,onPickerChange}:Props) => {
    const [isOpen,setIsOpen] = useState(false)
  return (
    <div className="relative">
       
        <div className="flex flex-row items-center gap-1">
             <p>#</p>
         <HexColorInput 
         color={value} 
         onChange={onPickerChange} 
         className='hex-input'/>
        </div>
         <HexColorPicker color={value} onChange={onPickerChange}/>

    </div>
  )
}

export default ColorPicker