import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";

const InputField = (props) => {
  return props.autoSize ? (
    <TextareaAutosize
      sx={{ width: 500, margin: 1 }}
      variant="filled"
      required
      minRows={4}
      placeholder={props.label}
      ref={props.inputref}
      type={props.type}
      id={props.id}
    />
  ) : (
    <TextField
      sx={{ width: 300, margin: 1 }}
      variant="filled"
      required
      label={props.label}
      inputRef={props.inputref}
      type={props.type}
      id={props.id}
    />
  );
};

export default InputField;
