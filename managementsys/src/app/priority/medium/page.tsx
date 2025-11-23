import { Priority } from '@/state/api'
import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage'


const Medium = () => {
  return (
    <ReusablePriorityPage priority={Priority.Medium}/>
  )
}

export default Medium