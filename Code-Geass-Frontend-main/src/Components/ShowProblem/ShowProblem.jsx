import "./ShowProblem.css";
import { useContext, useEffect, useState } from "react"
import Editor from "../Editor"
import { Box, Button, FormControl, InputLabel, NativeSelect, Paper, TextField} from '@mui/material'
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../App"
import axios from "axios"
import { ColorRing } from 'react-loader-spinner'
import ResultComponent from './ResultComponent'

function decode(bytes) {
	var escaped = escape(atob(bytes || ""));
	try {
		return decodeURIComponent(escaped);
	} catch {
		return unescape(escaped);
	}
}

const judge= async(code,input)=> {
	var postObj={
		"source_code": code,
		"language_id": "52",
		"number_of_runs": null,
		"stdin": input,
		"expected_output": null,
		"cpu_time_limit": null,
		"cpu_extra_time": null,
		"wall_time_limit": null,
		"memory_limit": null,
		"stack_limit": null,
		"max_processes_and_or_threads": null,
		"enable_per_process_and_thread_time_limit": null,
		"enable_per_process_and_thread_memory_limit": null,
		"max_file_size": null
	};

	const RUN_CODE_URL=`http://164.92.255.194:2358/submissions`;
	const res = await axios.post(RUN_CODE_URL, postObj, { headers: { pandey: "dipanshu" } });
	
	const GET_OUTPUT_URL=RUN_CODE_URL+"/"+res.data.token;
	var data;
	var status;
	while(true){
		data= await axios.get(GET_OUTPUT_URL, {params: {
			base64_encoded: true,
		}})
		status=data.data.status.description
		if(status==="In Queue" || status==="Processing") continue;
		break;
	}
	return data;
}

const ShowProblem = () => {

	const [loader, setLoader] = useState(false);
	const { isLoggedIn, token } = useContext(UserContext);
	const { problemSlug } = useParams();
	const [problemDescriptionHTML, setProblemDescriptionHTML] = useState("");

	const [code, setCode] = useState("");
	const [lang, setLang] = useState("c_cpp");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [status, setStatus] = useState("");
	// var status="";

	const navigate = useNavigate();

	if(!isLoggedIn) {
		navigate("/");
	}

	const handleLanguageChange = (event) => {
		setLang(event.target.value);
	};

	useEffect(() => {
		(
			async () => {
				try {
					setLoader(true);
					// const PROBLEM_URL = `http://localhost:8000/api/problem/${problemSlug}`;
					const PROBLEM_URL = `https://code-geass-backend.onrender.com/api/problem/${problemSlug}`;
					const res = await axios.get(PROBLEM_URL, { headers: { Authorization: token } });
					if (res.status === 200) {
						setProblemDescriptionHTML(res.data.description)
					}
					setLoader(false);
				} catch (error) {
					console.log(error);
					setLoader(false);
				}  
			}
		)();
	}, []);

	const handleCodeRun = async () => {
		try {
			setLoader(true);
			let language;
			if(lang==="c_cpp") {
				language = "cpp";
			}
			else if(lang==="python") {
				language = "py";
			}
			// const RUN_CODE_URL = `http://localhost:8000/api/run`;
			const RUN_CODE_URL = `https://code-geass-backend.onrender.com/api/run`;
			const res = await axios.post(RUN_CODE_URL, {lang: language, code, input}, { headers: { Authorization: token } });
			console.log(res);
			if(res.status===200) {
				setOutput(res.data);
			}
			setLoader(false);
			
		}catch(error) {
			
			if(error.response.data.stderr!=""){
				setOutput(error.response.data.stderr);
				setLoader(false);
			}
			else{
				setStatus("Time Limit Exceeded");
				setLoader(false);
			}
		}
	}

	const handleSubmit = async() => {
		try {
			setLoader(true);
			let language;
			if(lang==="c_cpp") {
				language = "cpp";
			}
			else if(lang==="python") {
				language = "py";
			}
			// const RUN_CODE_URL = `http://localhost:8000/api/check/${problemSlug}`;
			const RUN_CODE_URL = `https://code-geass-backend.onrender.com/api/check/${problemSlug}`;
			// https://code-geass-backend.onrender.com/
			const res = await axios.post(RUN_CODE_URL, {lang: language, code, input}, { headers: { Authorization: token } });
			if(res.status===200) {
				if(res.data==="All Test Case Passed"){
					setStatus("Accepted");
				}
				else setStatus("Wrong Answer");
			}
			setLoader(false);
		} catch(error) {
			if(error.response.data.stderr!=""){
				setOutput(error.response.data.stderr);
				setLoader(false);
			}
			else{
				setStatus("Time Limit Exceeded");
				setLoader(false);
			}
		}
	}

	return (
		<Box>
			<div dangerouslySetInnerHTML={{ __html: problemDescriptionHTML }} />


			{/* <div class="outer-container">
				<h1 class="problem-heading">Two Sum</h1>
				<div class="chip-container">
					<div class="chip-content">Easy</div>
				</div>
				<div class="problem-paragraph">
					<p>Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
					<br />

					<p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
					<br />

					<p>You can return the answer in any order.</p>

					<div>
						<div class="example">
							<p class="example-heading">Example 1:</p>
							<div class="example-content">
								<div>
									<span class="example-heading">Input: </span><p class="example-p">nums = [2,7,11,15], target = 9</p>
								</div>
								<div>
									<span class="example-heading">Output: </span><p class="example-p">[0,1], target = 9</p>
								</div>
								<div>
									<span class="example-heading">Explanation: </span><p class="example-p">Because nums[0] + nums[1] == 9, we return [0, 1].</p>
								</div>
							</div>
						</div>

						<div class="example">
							<p class="example-heading">Example 1:</p>
							<div class="example-content">
								<div>
									<span class="example-heading">Input: </span><p class="example-p">nums = [2,7,11,15], target = 9</p>
								</div>
								<div>
									<span class="example-heading">Output: </span><p class="example-p">[0,1], target = 9</p>
								</div>
								<div>
									<span class="example-heading">Explanation: </span><p class="example-p">Because nums[0] + nums[1] == 9, we return [0, 1].</p>
								</div>
							</div>
						</div>

					</div>

					<div class="constrain-container">
						<p class="constrain-p">Constraints:</p>
						<ul>
							<li>2 &#x2264; nums.length &#x2264; 10<sup>4</sup></li>
							<li>-10<sup>9</sup> &#x2264; nums[i] &#x2264; 10<sup>9</sup></li>
							<li>-10<sup>9</sup> &#x2264; target &#x2264; 10<sup>9</sup></li>
						</ul>
					</div>
				</div>
			</div> */}
			<Box sx={{ width: "50%", position: "fixed", right: "0", top: "100px" }}>
				<Box>
					<Box sx={{ minWidth: 50 }}>
						<FormControl fullWidth>
							<InputLabel variant="standard" htmlFor="uncontrolled-native">
								Lang
							</InputLabel>
							<NativeSelect
								defaultValue="c_cpp"
								inputProps={{
									name: 'lang',
									id: 'uncontrolled-native',
								}}
								onChange={handleLanguageChange}
							>
								<option value="c_cpp">C++</option>
								<option value="java">Java</option>
								<option value="python">Python</option>
							</NativeSelect>
						</FormControl>
					</Box>
				</Box>
				<Editor lang={lang} setCode={setCode} />
				<Box sx={{ display: "flex", gap: 3, mt: 2 }}>
					<Box>
						<Paper>
							<TextField
								id="outlined-multiline-static"
								label="Input"
								multiline
								fullWidth
								rows={4}
								value={input}
								onChange={(e) => {setInput(e.target.value)}}
							/>
						</Paper>
						<Button variant="contained" color="error" sx={{ display: "block", mt: 1 }} onClick={handleCodeRun}>Run Code</Button>
					</Box>
					<Box>
						<Paper>
							<TextField
								id="outlined-multiline-static"
								label="Output"
								multiline
								fullWidth
								rows={4}
								value={output}
							/>
						</Paper>
						<Box>
							<ResultComponent status={status} />
						</Box>
					</Box>
					<Box sx={{ml: "auto", mr: 3}}>
						<Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
					</Box>
					
				</Box>
			</Box>
			
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
			
		</Box >
		
	)
}

export default ShowProblem