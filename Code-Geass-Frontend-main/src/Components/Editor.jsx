import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = ({lang, setCode}) => {

	function onChange(newValue) {
		setCode(newValue);
	}	

	return (
		<div>
			<AceEditor
				mode={lang}
				theme="chrome"
				onChange={onChange}
				name="UNIQUE_ID_OF_DIV"
				fontSize={14}
				width="100%"
				height="55vh"

				setOptions={{
					enableBasicAutocompletion: false,
					enableLiveAutocompletion: false,
					enableSnippets: false,
					showLineNumbers: true,
					tabSize: 4,
				}}
			/>

		</div>
	)
}

export default Editor