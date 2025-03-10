import React from 'react'
import CherryEditor from '../components/CherryEditor'
const DashBoard = () => {
  return (
    <div>
      <CherryEditor initialValue="[toc]\n" isPreview={false} />
    </div>
  )
}

export default DashBoard
