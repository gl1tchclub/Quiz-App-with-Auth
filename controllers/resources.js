/**
 * @file manages all CRUD operations related to the schema
 * @author Elizabeth Minty
 */

//creates CRUD and exports it

// Create a GET route
const get = (req, res) => { 
    res.send('Hello, World!');
  };
  
  // Export the get function
  export { get };