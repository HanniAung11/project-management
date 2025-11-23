import { Priority } from '@/state/api'
import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage'

const Backlog = () => {
  return (
    <ReusablePriorityPage priority={Priority.Backlog}/>
  )
}

export default Backlog