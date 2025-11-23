import { Priority } from '@/state/api'
import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage'

const High = () => {
  return (
    <ReusablePriorityPage priority={Priority.High}/>
  )
}

export default High