/**
 * @file Seeds data for the admin users and inserts it into the User table
 * @author Elizabeth Minty
 */
import axios from "axios";
const data = async () => {
  const res = await axios(
    "https://gist.githubusercontent.com/Grayson-Orr/693f8678c4cdca98c03a2729f8352ec5/raw",
  );
  const json = await res.json();
  return json;
};

export { data };
