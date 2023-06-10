import React, {useState} from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { useMediaQuery } from "@mui/material"
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import { GlobalState } from '../..'
import { useGetUserQuery } from '../../state/api'

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const userId = useSelector((state : GlobalState) => state.global.userId)

  const { data } = useGetUserQuery(userId)

  return (
    <Box display={isNonMobile ? "flex" : "block"} height="100%" width="100%">
      <Sidebar isNonMobile={isNonMobile} drawerWidth='250px' isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={data || {}} />
      <Box flexGrow={1}>
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} user={data || {}} />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout