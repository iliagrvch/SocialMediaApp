import TweetList from "../tweets/TweetList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../UI/TabPanel";
import { useState } from "react";
import { Fragment } from "react";
function AccountActivity(props) {
  const [tabVal, setTabVal] = useState(0);
  function tabsHandler(event, newValue) {
    setTabVal(newValue);
  }

  return (
    <Fragment>
      <Tabs
        value={tabVal}
        onChange={tabsHandler}
        aria-label="basic tabs example"
      >
        <Tab label="Tweets" />
        <Tab label="Tweets and Replies" />
      </Tabs>
      <TabPanel value={tabVal} index={0}>
        <TweetList tweets={props.tweets.filter((tweet) => !tweet.replyTo)} />
      </TabPanel>
      <TabPanel value={tabVal} index={1}>
        <TweetList tweets={props.tweets} />
      </TabPanel>
    </Fragment>
  );
}

export default AccountActivity;
