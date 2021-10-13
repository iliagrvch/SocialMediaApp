import { useState, useEffect } from "react";

import { IconButton } from "@mui/material";

function IconBtn(props) {
  const [selected, setSelected] = useState(props.selected);
  const [count, setCount] = useState(props.count);
  function selectHandler() {
    if (props.toToggle) {
      setSelected(!selected);
      setCount(selected ? count - 1 : count + 1);
    }
    props.onClick();
  }

  useEffect(() => {}, [selected]);
  return (
    <div className="horizontal centered-wrapper">
      <IconButton
        sx={{ height: 30, margin: 1, borderWidth: 0 }}
        value="check"
        selected={selected}
        color={selected ? "secondary" : "default"}
        onClick={selectHandler}
      >
        {props.icon}
      </IconButton>
      <div>{count}</div>
    </div>
  );
}

export default IconBtn;
