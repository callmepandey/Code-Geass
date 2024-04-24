import { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import axios from "axios";
import { ColorRing } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

const AddProblem = () => {

	const [addProblemError, setAddProblemError] = useState("");
	const [loader, setLoader] = useState(false);
	const { user, token } = useContext(UserContext);
	const navigate = useNavigate();

	if (!user) {
		navigate("/");
	}
	if (user.role !== "admin") {
		navigate("/");
	}

	const [difficulty, setDifficulty] = useState("");
	const [data, setData] = useState({});

	const difficulties = ["Easy", "Medium", "Hard"];
	const handleSelectChange = (event) => {
		const { name, value } = event.target;
		setDifficulty(event.target.value);
		setData({ ...data, [name]: event.target.value });
	};


	const handleChange = (event) => {
		const { name, value } = event.target;
		setData({ ...data, [name]: value });
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setLoader(true);
			//const ADD_PROBLEM_URL = "http://localhost:8000/admin/problem";
			const ADD_PROBLEM_URL = "https://code-geass-backend.onrender.com/admin/problem";
			const successMessage = await axios.post(ADD_PROBLEM_URL, data, { headers: { Authorization: token } });
			if (successMessage.data === "success") {
				alert("Problem Added Successfully");
				setData({});
				navigate("/");
			}
			else {
				setAddProblemError(successMessage.message);
			}
			setLoader(false);
		} catch (err) {
			setLoader(false);
			console.log(err);
		}
	}


	return (
		<>
			<Paper elevation={3} sx={{ mr: "15%", ml: "15%", mt: "50px", mb: "50px" }}>
				<Box sx={{ padding: 5 }}>
					<Typography variant="h6" gutterBottom sx={{ paddingBottom: 5, textAlign: "center" }}>
						Add Problem
					</Typography>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={2}>
								<InputLabel
									sx={{
										display: "flex",
										justifyContent: "center",
										fontWeight: 700
									}}
								>
									Title
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={10}>
								<TextField
									required
									id="title"
									name="title"
									label="Title"
									fullWidth
									size="small"
									autoComplete="off"
									variant="outlined"
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<InputLabel
									sx={{
										display: "flex",
										justifyContent: "center",
										fontWeight: 700
									}}
								>
									Difficulty
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={10}>
								<FormControl fullWidth size="small">
									<InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
									<Select
										name='difficulty'
										required
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={difficulty}
										label="Difficulty"
										onChange={handleSelectChange}
									>
										{difficulties.map((item) => (
											<MenuItem value={item}>{item}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={2}>
								<InputLabel
									sx={{
										display: "flex",
										justifyContent: "center",
										fontWeight: 700
									}}
								>
									Description HTML
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={10}>
								<TextField
									name='description'
									required
									id="outlined-multiline-static"
									label="Description HTML"
									multiline
									fullWidth
									rows={4}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<InputLabel
									sx={{
										display: "flex",
										justifyContent: "center",
										fontWeight: 700
									}}
								>
									Input
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={10}>
								<TextField
									name='input'
									required
									id="outlined-multiline-static"
									label="Input"
									multiline
									fullWidth
									rows={4}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<InputLabel
									sx={{
										display: "flex",
										justifyContent: "center",
										fontWeight: 700
									}}
								>
									Output
								</InputLabel>
							</Grid>
							<Grid item xs={12} sm={10}>
								<TextField
									name='output'
									required
									id="outlined-multiline-static"
									label="Output"
									multiline
									fullWidth
									rows={4}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
						<Box display="flex" alignItems="center" justifyContent="center" gap={3}>
							<Box>
								<Link to='/' style={{textDecoration: "none"}}><Button variant='contained' color='primary' sx={{ display: "block", m: "auto", mt: "10px" }}>Cancel</Button></Link>
							</Box>
							<Box>
								<Button type='submit' variant='contained' color='primary' sx={{ display: "block", m: "auto", mt: "10px" }}>Submit</Button>
							</Box>
						</Box>
					</form>
				</Box>
			</Paper>
			{loader &&
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
				</Box>}
		</>
	);
}


export default AddProblem