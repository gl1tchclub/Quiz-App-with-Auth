/**
 * @file Seeds data for the admin users and inserts it into the Category table
 * @author Elizabeth Minty
 */
const name = "category";
const data = async () => {
  let res = await fetch("https://opentdb.com/api_category.php");
  let json = await res.json();
  return json.trivia_categories;
};

export { name, data };
