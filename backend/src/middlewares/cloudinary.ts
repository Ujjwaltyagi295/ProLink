import { INTERNAL_SERVER_ERROR } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const cloudWare = catchErrors(async (req, res) => {
   
    
    const cloudinaryUrls = req.body.cloudinaryUrls;
    appAssert(cloudinaryUrls || cloudinaryUrls.length > 0, INTERNAL_SERVER_ERROR, 'No Cloudinary URLs found');
  
    return res.status(200).json({ url: cloudinaryUrls });
  });
  