import styles from "../styles/EOM.module.css";
import { Toolbar } from "../components/toolbar";
const EOM = ({ employee }) => {
  return (
    <div className="page-container">
      <Toolbar/>
      <div className={styles.main}>
        <h1>About Me</h1>

        <div className={styles.aboutMe}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          <img src={employee.image} />
          <p> {employee.description} </p>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async (pageContext) => {
  const apiResponse = await fetch(
    "https://my-json-server.typicode.com/sildr/magzt/aboutMe"
  );
  const employee = await apiResponse.json();
  return {
    props: {
      employee: employee,
    },
  };
};
export default EOM;
