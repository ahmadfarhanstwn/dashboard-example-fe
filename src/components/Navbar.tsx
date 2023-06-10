import { useDispatch } from "react-redux"
import { useTheme, AppBar, Toolbar, IconButton, InputBase } from "@mui/material"
import FlexBetween from "./FlexBetween"
import { Search, Menu as MenuIcon, DarkModeOutlined, LightModeOutlined, SettingsOutlined } from "@mui/icons-material"
import { setMode } from "../state"

interface NavbarProps{
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const dispatch = useDispatch()
    const theme = useTheme()

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
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar