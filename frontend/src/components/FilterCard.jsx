import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        items : ["Delhi" , "Banglore" , "Hyderabad" , "Pune" ,"Chennai" , "Mumbai"]
     },
    {
        filterType: "Industry",
        items : ["Frontend Developer" , "Backend Developer" , "Full Stack Developer" , "Data Analyst"]
    },
    {
        filterType: "Salary",
        items : ["0-59k" , "50-1 Lakh" , "1-2.5Lakh" , "2.5Lakh+" ]
     },
]


const FilterCard = () => {
  const [selectedValue ,setSelectedValue]  = useState("")
  const dispatch = useDispatch()

  const handleChangeValue = (value) =>{
   setSelectedValue(value)
  }

  useEffect(()=>{
   dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])

  return (
    <div className='w-full rounded-md p-3 bg-white'>
        <h1>Filters</h1>
    <hr  className='mt-2'/>
    <RadioGroup  value ={selectedValue} onValueChange = {handleChangeValue} >
        {
            filterData.map((data ,index)=>{
                return(
                    <div key = {index}>
                        <h2 className='font-bold text-lg'>{data.filterType}</h2>
                        {
                          data.items.map((item,id) =>{
                            const itemId = `JID${index} - ${id}`
                            return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value = {item}  id ={itemId}/>
                                         <Label htmlFor = {itemId} >{item}</Label>
                                    </div>
                            )
                          })
                        }
                    </div>
                )
            })
        }
    </RadioGroup>
    </div>
  )
}

export default FilterCard