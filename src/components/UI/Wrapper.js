import { Box } from "@mui/system";

const Wrapper = (props) => {
  return (
    <Box
      className={props.centered ? "centered" : ""}
      sx={{
        minHeight: "50px",
        width: "100%",
        backgroundColor: "white",
        borderStyle: "groove",
        borderColor: "rgb(0,0,0,0.1)",
        borderWidth: 1,
      }}
    >
      {props.children}
    </Box>
  );
};

export default Wrapper;
