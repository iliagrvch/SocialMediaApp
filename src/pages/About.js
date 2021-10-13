import PageContent from "../components/UI/PageContent";

const projectDescription = (
  <div key={0} style={{ padding: "20px" }}>
    <p>This is a social media app, very similar to twitter</p>
    <p>
      You can: Create an account, post tweets, follow people, like tweets,
      comment tweets
    </p>
    <br />
    <p>Technologies i used </p>
    <li>JavaScript</li>
    <li>React: including React Router, Context API</li>
    <li>CSS: including CSS grid, CSS flex box</li>
    <li>HTML</li>
    <li>
      Other tools: Material UI, Firebase REST API, Firebase Authentication,
      Firebase Realtime DB
    </li>
  </div>
);
const AboutPage = () => {
  return (
    <PageContent centered={false} header="About the project">
      {[projectDescription]}
    </PageContent>
  );
};

export default AboutPage;
