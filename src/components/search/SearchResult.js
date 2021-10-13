import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { findUsers } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import { List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { CardActionArea } from "@mui/material";
const SearchResult = (props) => {
  const { sendRequest, status, data } = useHttp(findUsers);

  useEffect(() => {
    if (props.query && props.search) {
      sendRequest(props.query);
      props.onEnd(false);
    }
  }, [sendRequest, props]);

  return status === "pending" ? (
    <LoadingSpinner />
  ) : (
    data && (
      <List>
        {data.map((user, index) => {
          const divider = index !== data.length - 1 ? <Divider /> : "";
          return (
            <CardActionArea key={user.id}>
              <Link to={`/${user.id}`}>
                <ListItem>
                  <h4>{user.username}</h4>
                </ListItem>
              </Link>

              {divider}
            </CardActionArea>
          );
        })}
      </List>
    )
  );
};

export default SearchResult;
