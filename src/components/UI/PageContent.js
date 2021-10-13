import styles from "./PageContent.module.css";
import Wrapper from "./Wrapper";
function PageContent(props) {
  return (
    <div className={`${styles.container}`}>
      <Wrapper centered={false}>
        <h2 className={styles.header}>
          {props.header ? props.header : <br />}
        </h2>
      </Wrapper>
      {props.children &&
        (Array.isArray(props.children) ? (
          props.children.map((element, index) => {
            return (
              <Wrapper centered={props.centered} key={index}>
                {element}
              </Wrapper>
            );
          })
        ) : (
          <Wrapper centered={props.centered}>{props.children}</Wrapper>
        ))}
    </div>
  );
}

export default PageContent;
