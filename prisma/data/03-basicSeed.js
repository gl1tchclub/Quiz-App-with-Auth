/**
 * @file Holds fetch function that retrieves data for the basic users
 * @author Elizabeth Minty
 */
import axios from "axios";
const data = async () => {
  const res = await axios(
    "https://gist.githubusercontent.com/Grayson-Orr/693f8678c4cdca98c03a2729f8352ec5/raw",
  );
  return res.data;
};

export { data };
