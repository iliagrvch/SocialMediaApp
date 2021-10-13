import { Button, IconButton } from "@mui/material";
const ContainedButton = (props) => {
  let sx = {};
  if (props.sx) sx = props.sx;
  sx.borderRadius = "20px";

  const isIcon = typeof props.children !== "string";
  return isIcon ? (
    <IconButton variant="contained" sx={sx} onClick={props.onClick}>
      {props.children}
    </IconButton>
  ) : (
    <Button variant="contained" sx={sx} onClick={props.onClick}>
      {props.children}
    </Button>
  );
};

export default ContainedButton;
