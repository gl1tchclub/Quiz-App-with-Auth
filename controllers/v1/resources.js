/**
 * @file manages all CRUD operations related to the schema
 * @author Elizabeth Minty
 */

/**  Checks role of given user ID
 * @returns admin user data
 */
// const checkPrivilege = async (req, res) => {
//   try {
//     const { id } = req.id;
//     const user = await prisma.user.findUnique({ where: { id: id } });

//     if (user.role == "BASIC_USER") {
//       return res.json({errorStatus: res.status(403),
//         errorMsg: res.json({
//           msg: "Not authorized to access this route",
//         }),
//       });
//     }

//     return res.json({data: user});
//   } catch (err) {
//     res.status(500).json({
//       msg: err.message,
//     });
//   }
// };

//creates CRUD and exports it

// Create a GET route
const getAll = async (req, res, type, include) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 25;

    //Retrieve data from the specified type using Prisma.
    const typeModel = prisma[type];

    //Check if the given model exists; if not, return a 404 error.
    if (!typeModel) {
      return res
        .status(404)
        .json({ msg: `Endpoint for ${typeModel} does not exist` });
    }

    //Extract query parameters like filters
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
    const orderBy = req.query.orderBy;
    // //Define sorting parameters and a query object.
    // const sortBy = req.query.sortBy || "id"
    // const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc"

    const query = {
      where: filters,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
      include: include,
      skip: pageSize * (page - 1),
      take: pageSize,
    };

    //Retrieve objects from the typeModel based on the query.
    const objects = await typeModel.findMany(query);

    //If no objects are found, return a 404 error.
    if (typeModel.length === 0) {
      return res.status(404).json({ msg: `No ${type} found` });
    }

    //Return a JSON response containing the retrieved data.
    return res.json({ data: objects });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
// Export the get function
export { getAll, checkPrivilege };
