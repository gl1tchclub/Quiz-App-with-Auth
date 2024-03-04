// ...

const createInstitution = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json",
        });
      }
      
      const { name, region, country } = req.body;
  
      // Get the authenticated user's id from the Request's user property
      const { id } = req.user;
  
      // Now you will know which authenticated user created which institution
      await prisma.institution.create({
        data: { name, region, country, userId: id },
      });
  
      const newInstitutions = await prisma.institution.findMany({
        include: {
          departments: true,
        },
      });
  
      return res.status(201).json({
        msg: "Institution successfully created",
        data: newInstitutions,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  
  // ...