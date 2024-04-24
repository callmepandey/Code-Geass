import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Paper from '@mui/material/Paper';
import { UserContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));


const ProblemSet = () => {

	const navigate = useNavigate();

	const [rows, setRows] = useState([]);
	const [loader, setLoader] = useState(false);
	const { token, isLoggedIn } = useContext(UserContext);
	const [pg, setpg] = useState(0);
	const [rpg, setrpg] = useState(10);

	if(!isLoggedIn) {
		navigate("/login");
	}

	useEffect(() => {
		(
			async () => {
				try {
					setLoader(true);
					//const GET_ALL_PROBLEMS_URL = `http://localhost:8000/api/problem`;
					const GET_ALL_PROBLEMS_URL = `https://code-geass-backend.onrender.com/api/problem`;
					const res = await axios.get(GET_ALL_PROBLEMS_URL, { headers: { Authorization: token } });
					if (res.status === 200) {
						setRows(res.data);
					}
					setLoader(false);
				} catch (error) {
					console.log(error);
					setLoader(false);
				}
			}
		)();
	}, []);
	
	function handleChangePage(event, newpage) {
		setpg(newpage);
	}

	function handleChangeRowsPerPage(event) {
		setrpg(parseInt(event.target.value, 10));
		setpg(0);
	}

	return (
		<TableContainer component={Paper} sx={{ m: "auto", width: "1200px", maxWidth: "90%", mt: "30px" }}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Title</StyledTableCell>
						<StyledTableCell>Difficulty</StyledTableCell>
						<StyledTableCell>Action</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.slice(pg * rpg, pg * rpg + rpg).map((row) => (
						<StyledTableRow
							key={row.title}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<StyledTableCell component="th" scope="row">
								<Link to={isLoggedIn ? `/problem/${row.slug}` : `/login`} style={{textDecoration: "none", color: "#000" }}>{row.title}</Link>
							</StyledTableCell>
							<StyledTableCell>{row.difficulty}</StyledTableCell>
							<StyledTableCell>{row.action}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[10, 50, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rpg}
				page={pg}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			{
				loader &&
				<Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
					<ColorRing
						visible={true}
						height="80"
						width="80"
						ariaLabel="blocks-loading"
						wrapperStyle={{}}
						wrapperClass="blocks-wrapper"
						colors={['#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF']}
					/>
				</Box>
			}
		</TableContainer>

	);
}

export default ProblemSet;