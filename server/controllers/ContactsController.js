import User from "../models/UserModel.js";



export const  searchContacts= async (request, response, next) => {
    try {
        const {searchTerm} =request.body;
        if(searchTerm===undefined ||searchTerm===null){
            return response(400).send("serchTerm is required.");
        }
        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$g"
          );
      const regex=new RegExp(sanitizedSearchTerm,"i");
      const contacts =await User.find({
        $and: [{ _id:{ $ne: request.userId } },{
                $or: [{firstName:regex}, {lastName: regex}, {email:regex}],
                },
            ],
      });
      return response.status(200).json({contacts});
    
    } catch (err) {
      console.error("Internal Server Error:", err);
      return response.status(500).send("Internal Server Error");
    }
  };