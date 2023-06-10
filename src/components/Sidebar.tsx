import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme, Box, Drawer, Typography, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ChevronLeft, ChevronRightOutlined } from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { SidebarElements } from '../constants/SidebarElements'

interface SidebarProps {
    isNonMobile: boolean,
    drawerWidth: string,
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = (
    {
        isNonMobile,
        drawerWidth,
        isSidebarOpen,
        setIsSidebarOpen
    }
) => {
    const { pathname } = useLocation();
    const [ activePage, setActivePage ] = useState('')
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(() => {
        setActivePage(pathname.substring(1))
    }, [pathname])

    return (
        <Box>
            {isSidebarOpen && (
                <Drawer 
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            color: theme.palette.secondary.main[200],
                            backgroundColor: theme.palette.background.default,
                            boxSizing: 'border-box',
                            borderWidth: isNonMobile? 0 : '2px',
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h4' fontWeight='bold'>
                                        NAONWAEPOS
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {SidebarElements.map(({ text, icon }) => {
                                if(!icon) {
                                    return (
                                        <Typography key={text} sx={{m: "2.25rem 0 1rem 3rem"}}>
                                            {text}
                                        </Typography>
                                    )
                                }
                                const lcText = text.toLowerCase()
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton 
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActivePage(lcText)
                                            }}
                                            sx={{
                                                backgroundColor: activePage === lcText ? theme.palette.secondary.main : 'transparent',
                                                color: activePage === lcText ? theme.palette.primary.main : theme.palette.secondary.main
                                            }}
                                        >
                                            <ListItemIcon 
                                                sx={{
                                                    ml: "2rem", 
                                                    color: activePage === lcText ? theme.palette.primary.main : theme.palette.secondary.main
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text}>
                                                {activePage === lcText && (
                                                    <ChevronRightOutlined sx={{ml: "auto"}} />
                                                )}
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar