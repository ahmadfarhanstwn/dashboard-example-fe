import { useDispatch } from "react-redux"
import { useTheme, AppBar, Toolbar, IconButton, InputBase, Button, Box, Typography, Menu, MenuItem } from "@mui/material"
import FlexBetween from "./FlexBetween"
import { Search, Menu as MenuIcon, DarkModeOutlined, LightModeOutlined, SettingsOutlined, ArrowDropDownOutlined } from "@mui/icons-material"
import { setMode } from "../state"
import { useState } from "react"
import profileImage from '../assets/jokowi_profile.jpg';

interface NavbarProps{
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: any
}

const Navbar: React.FC<NavbarProps> = ({
    isSidebarOpen,
    setIsSidebarOpen,
    user
}) => {
    const dispatch = useDispatch()
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: any) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar sx={{position: "static", background: "none", boxShadow: "none"}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween 
                        bgcolor={theme.palette.background.default}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1 rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/*  RIGHT SIDE */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{fontSize: "25px"}} />) :
                            (<LightModeOutlined sx={{fontSize: "25px"}}/>
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined />
                    </IconButton>
                    <FlexBetween>
                        <Button
                        onClick={handleClick}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textTransform: "none",
                            gap: "1rem",
                        }}
                        >
                        <Box
                            component="img"
                            alt="profile"
                            src={profileImage}
                            height="32px"
                            width="32px"
                            borderRadius="50%"
                            sx={{ objectFit: "cover" }}
                        />
                        <Box textAlign="left">
                            <Typography
                                fontWeight="bold"
                                fontSize="0.85rem"
                                sx={{ color: theme.palette.secondary.main }}
                            >
                            {user.name}
                            </Typography>
                            <Typography
                                fontSize="0.75rem"
                                sx={{ color: theme.palette.secondary.main }}
                            >
                            {user.occupation}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined
                            sx={{ color: theme.palette.secondary.main, fontSize: "25px" }}
                        />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={handleClose}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar