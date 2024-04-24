import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CustomButton from "./controls/CustomButton";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	styled,
} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Cookies from "js-cookie";

const Navbar = () => {

	const { user, isLoggedIn, setToken } = useContext(UserContext);
	
	const [mobileMenu, setMobileMenu] = useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.type === "Tab" || event.type === "Shift")
		) {
			return;
		}

		setMobileMenu({ ...mobileMenu, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{["Problem Set", "Leader Board"].map(
					(text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					)
				)}
			</List>
		</Box>
	);

	const NavLink = styled(Typography)(({ theme }) => ({
		fontSize: "14px",
		color: "#fff",
		fontWeight: "bold",
		cursor: "pointer",
		"&:hover": {
			color: "#fff",
		},
	}));

	const NavbarLinksBox = styled(Box)(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: theme.spacing(3),
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	}));

	const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
		cursor: "pointer",
		display: "none",
		color: "#fff",
		marginRight: theme.spacing(2),
		[theme.breakpoints.down("md")]: {
			display: "block",
		},
	}));

	const NavbarContainer = styled(Box)(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		// backgroundColor: "#4F5361",
		backgroundColor: "#3c005a",
		padding: theme.spacing(2, 10),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(2, 5),
		},
	}));

	return (
		<NavbarContainer>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "2.5rem",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<CustomMenuIcon onClick={toggleDrawer("left", true)} />
					<Drawer
						anchor="left"
						open={mobileMenu["left"]}
						onClose={toggleDrawer("left", false)}
					>
						{list("left")}
					</Drawer>
					<Typography fontWeight="bold" component="h6" sx={{ cursor: "pointer", color: "#fff", fontSize: "24px" }}>
						<Link to="/" style={{ textDecoration: "none", color: "#fff" }}>Code Geass</Link>
					</Typography>
				</Box>

				<NavbarLinksBox>
					<NavLink variant="body2"><Link to="/" style={{ textDecoration: "none", color: "#fff" }}>Problem Set</Link></NavLink>
					<NavLink variant="body2"><Link to="/leader-board" style={{ textDecoration: "none", color: "#fff" }}>Leader Board</Link></NavLink>
					{
						user.role === "admin" && <NavLink variant="body2"><Link to="/admin/add-problem" style={{ textDecoration: "none", color: "#fff" }}>Add Problem</Link></NavLink>
					}
				</NavbarLinksBox>
			</Box>

			{
				isLoggedIn ?
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "1rem",
						}}
					>
						<NavLink variant="body2">{user.name}</NavLink>
						<Box onClick={() => {
							Cookies.remove('token');
							setToken('');
							window.location.href = '/';
						}}
						>
							<CustomButton
								backgroundColor="#fff"
								color="#0F1B4C"
								buttonText="Logout"
							/>
						</Box>
					</Box>
					:
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "1rem",
						}}
					>
						<NavLink variant="body2"><Link to="/login" style={{ textDecoration: "none", color: "#fff" }}>Login</Link></NavLink>
						<Link to="/signup" style={{ textDecoration: "none" }}>
							<CustomButton
								backgroundColor="#fff"
								color="#0F1B4C"
								buttonText="Sign Up"
							/>
						</Link>
					</Box>
			}

		</NavbarContainer>
	);
};

export default Navbar;