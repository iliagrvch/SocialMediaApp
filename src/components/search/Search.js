import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";

const Search = () => {
  const [enteredQuery, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  useEffect(() => {
    const identifier = setTimeout(() => {
      setSearch(true);
    }, 1000);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredQuery]);

  function inputHandler(event) {
    setQuery(event.target.value);
  }
  return (
    <div style={{ maxWidth: 300 }}>
      <TextField
        onChange={inputHandler}
        sx={{ width: "100%", maxWidth: 300 }}
        label="Search.."
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
        }}
      ></TextField>
      <SearchResult query={enteredQuery} search={search} onEnd={setSearch} />
    </div>
  );
};

export default Search;
