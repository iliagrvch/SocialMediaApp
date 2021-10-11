import axios from "axios";
const FIREBASE_DOMAIN = "https://server-aa3f7-default-rtdb.firebaseio.com/";

export async function getFollowingTweets(userId) {
  const userData = await getUserData(userId);
  const following = userData.following;
  let tweets = [];
  for (let i = 0; i < following.length; i++) {
    const userTweets = await getAllUserTweets(following[i]);
    tweets = tweets.concat(userTweets);
  }
  return tweets;
}
export async function getAllUserTweets(userId) {
  const userData = await getUserData(userId);
  if (userData) {
    const username = userData.username;

    const response = await axios.get(
      `${FIREBASE_DOMAIN}/tweets/${userId}.json`
    );
    const transformedTweets = [];

    for (const key in response.data) {
      let replyToTweet = "";
      if (response.data[key].replyTo) {
        const replyTo = response.data[key].replyTo;
        replyToTweet = await getTweet({
          authorId: replyTo.authorId,
          id: replyTo.tweetId,
        });
      }
      const tweetObj = {
        id: key,
        authorId: userId,
        author: username,
        ...response.data[key],
        replyTo: replyToTweet,
        comments: JSON.parse(response.data[key].comments),
        likes: JSON.parse(response.data[key].likes),
      };

      transformedTweets.push(tweetObj);
    }
    return transformedTweets;
  } else {
    throw new Error("User not found");
  }
}

export function sortTweets(tweets) {
  let res = [...tweets];
  res.sort((a, b) => {
    const aDate = new Date(...a.time.split(":"));
    const bDate = new Date(...b.time.split(":"));
    return bDate - aDate;
  });

  return res;
}
export async function getTweet(tweetData) {
  const userData = await getUserData(tweetData.authorId);
  const username = userData.username;
  const response = await axios.get(
    `${FIREBASE_DOMAIN}/tweets/${tweetData.authorId}/${tweetData.id}.json`
  );

  const loadedtweet = {
    id: tweetData.id,
    authorId: tweetData.authorId,
    author: username,
    ...response.data,
    comments: JSON.parse(response.data.comments),
    likes: JSON.parse(response.data.likes),
  };
  return loadedtweet;
}

export async function getTweetComments(commentsArr) {
  let tweetsArr = [];
  for (let i = 0; i < commentsArr.length; i++) {
    const tweet = await getTweet({
      authorId: commentsArr[i].authorId,
      id: commentsArr[i].tweetId,
    });
    tweetsArr.push(tweet);
  }

  return tweetsArr;
}
async function addComment(commentData) {
  const tweet = await getTweet({
    authorId: commentData.replyTo.authorId,
    id: commentData.replyTo.tweetId,
  });
  let comments = tweet.comments;
  comments.push({
    authorId: commentData.authorId,
    tweetId: commentData.tweetId,
  });
  try {
    await axios.patch(
      `${FIREBASE_DOMAIN}/tweets/${commentData.replyTo.authorId}/${commentData.replyTo.tweetId}.json`,
      {
        comments: JSON.stringify(comments),
      },
      {
        "Content-Type": "application/json",
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function addTweet(tweetData) {
  const today = new Date();
  const replyTo = tweetData.replyTo ? tweetData.replyTo : "";

  try {
    const response = await axios.post(
      `${FIREBASE_DOMAIN}/tweets/${tweetData.userId}.json`,
      JSON.stringify({
        body: tweetData.text,
        comments: "[]",
        likes: "[]",
        replyTo: replyTo,
        time: `${today.getFullYear()}:${today.getMonth()}:${today.getDate()}:${today.getHours()}:${today.getMinutes()}`,
      }),
      {
        "Content-Type": "application/json",
      }
    );
    if (replyTo)
      addComment({
        replyTo: tweetData.replyTo,
        authorId: tweetData.userId,
        tweetId: response.data.name,
      });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserData(userId) {
  const response = await axios.get(`${FIREBASE_DOMAIN}/users/${userId}.json`);
  if (!response.data) throw new Error("User not found");
  const user = {
    id: userId,
    ...response.data,
    following: JSON.parse(response.data.following),
  };

  return user;
}

export async function toggleLike(tweetData) {
  const tweet = await getTweet({
    id: tweetData.id,
    authorId: tweetData.authorId,
  });
  const likes = tweet.likes;

  const includes = likes.includes(tweetData.userId);
  if (!includes) {
    likes.push(tweetData.userId);
  } else {
    const index = likes.indexOf(tweetData.userId);
    likes.splice(index, 1);
  }

  try {
    const response = await axios.patch(
      `${FIREBASE_DOMAIN}/tweets/${tweetData.userId}/${tweetData.id}.json`,
      {
        likes: JSON.stringify(likes),
      },
      {
        "Content-Type": "application/json",
      }
    );
  } catch (error) {
    console.log(error);
  }

  return includes;
}

export async function toggleFollow(followData) {
  const userData = await getUserData(followData.currentUserId);
  const following = userData.following;
  let followDelta = 0;
  if (!following.includes(followData.idToFollow)) {
    following.push(followData.idToFollow);
    followDelta = 1;
  } else {
    const index = following.indexOf(followData.idToFollow);
    following.splice(index, 1);
    followDelta = -1;
  }
  try {
    await axios.patch(
      `${FIREBASE_DOMAIN}/users/${followData.currentUserId}.json`,
      {
        following: JSON.stringify(following),
      },
      {
        "Content-Type": "application/json",
      }
    );

    updateFollowers(followData.idToFollow, followDelta);
  } catch (error) {
    console.log(error);
  }
}

async function updateFollowers(userId, followDelta) {
  const userData = await getUserData(userId);
  const followers = userData.followers + followDelta;
  try {
    await axios.patch(
      `${FIREBASE_DOMAIN}/users/${userId}.json`,
      {
        followers: followers,
      },
      {
        "Content-Type": "application/json",
      }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function addUser(userData) {
  try {
    await axios.put(
      `${FIREBASE_DOMAIN}/users/${userData.id}.json`,
      {
        username: userData.name,
        city: userData.city,
        description: userData.description,
        following: "[]",
        followers: 0,
        bookmarks: "[]",
        likes: "[]",
      },
      {
        "Content-Type": "application/json",
      }
    );
  } catch (error) {
    console.log(error);
  }
}
