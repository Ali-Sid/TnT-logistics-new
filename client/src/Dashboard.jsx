import { Typography } from '@mui/material'
import React from 'react'
import { AppView } from './overview/view'

const Dashboard = () => {
  return (
    <div style={{ overflowY: 'auto', height: '100vh' }}>
        {/* <Typography variant='h5' color="#5c5c5c">Dashboard</Typography> */}
        <AppView />
    </div>
  )
}

export default Dashboard