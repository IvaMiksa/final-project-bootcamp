import styled from "styled-components";
import {MdOutlineFileUpload} from "react-icons/md";
import {useRef} from "react";

const StyledButtonUpload = styled.button`
    border: 1px solid black;
    border-radius: 30px;
    padding: ${p => p.theme.spaces.base};
    background: none;
    cursor: pointer;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled(MdOutlineFileUpload)`
  color: white; // Set the color to white
  font-size: 2rem; // Adjust size if needed
`;

const HiddenInput = styled.input`
  display: ${props => (props.hidden ? "none" : "block")};
`;

const FileUpload = ({onClick, label, file, name, hidden = true, fileRef}) => {
    const internalFileRef = useRef(fileRef || null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && onClick) {
            onClick(selectedFile);
        }
    };

    return (
        <div>
            <StyledButtonUpload onClick={() => internalFileRef.current?.click()}>
                <Icon/>
                {label}
            </StyledButtonUpload>

            <HiddenInput
                type="file"
                name={name}
                hidden={hidden}
                ref={internalFileRef}
                onChange={handleFileChange}
            />

            {file && <p>Selected file: {file.name}</p>}
        </div>
    );
};

export default FileUpload;
