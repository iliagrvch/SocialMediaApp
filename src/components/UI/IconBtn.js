import { ToggleButton } from "@mui/material";
import { useState, useEffect } from "react";
import { Fragment } from "react";
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
    <ToggleButton
      sx={{ height: 30, margin: 1, borderWidth: 0 }}
      value="check"
      selected={selected}
      onClick={selectHandler}
    >
      {[
        <Fragment key={0}>{props.icon}</Fragment>,
        <Fragment key={1}> {count}</Fragment>,
      ]}
    </ToggleButton>
  );
}

export default IconBtn;
