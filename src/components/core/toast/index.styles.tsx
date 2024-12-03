'use client'
import { StyledToastContainer } from '@/styles/global/index.styles'
import React from 'react'

const CustomToastContainer = () => {
  return (
    <StyledToastContainer
    position="top-right"
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
  )
}

export default CustomToastContainer
