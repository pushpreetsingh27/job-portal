import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType: "Location",
        items : ["Delhi" , "Bamglore" , "Hyderabad" , "Pune" ,"Chennai" , "Mumbai"]
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
  return (
    <div className='w-full rounded-md p-3 bg-white'>
        <h1>Filters</h1>
    <hr  className='mt-2'/>
    <RadioGroup>
        {
            filterData.map((data ,index)=>{
                return(
                    <div>
                        <h2 className='font-bold text-lg'>{data.filterType}</h2>
                        {
                          data.items.map((item,index) =>{
                            return (
                                    <div className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value = {item}/>
                                         <Label>{item}</Label>
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