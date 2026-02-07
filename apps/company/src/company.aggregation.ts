import mongoose from "mongoose";

export class CompanyAggregation
{
    match(id:string)   // aggregation to match by id
    {
        return {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        }
    }

    search(search:string)
    {
        return {
            $match: {
                $or: [
                    { company_name: { $regex: search, $options: "i" } },
                    { company_industry: { $regex: search, $options: "i" } },
                    { company_size: { $regex: search, $options: "i" } },
                    { company_stage: { $regex: search, $options: "i" } },
                    { company_type: { $regex: search, $options: "i" } },
                ]
             }
         }
    }


    userLookUp()
    {
        return {
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        }
    }

    projection()
    {
        return {
            $project: {
                "user": 1,
                "company_name": 1,
                "company_description": 1,
                "company_logo": 1,
                "company_website": 1,
                "company_email": 1,
                "company_phone": 1,
                "company_address": 1,
                "company_city": 1,
                "company_industry": 1,
                "company_size": 1,
                "company_stage": 1,
                "company_type": 1
            }
        }
    }

    list()
    {
        try {
            return {
                $match: {
                
                }
            }
        }
        catch(error)
        {
            throw error;
        }
    }


    async face_set(option) {
        try {
            return {
                $facet: {
                    count: [
                        {
                            $count: "count"
                        },
                    ],
                    data: [
                        {
                            $sort: {
                                _id: -1 as 1 | -1
                            }
                        },
                        {
                            $skip: option.skip
                        },
                        {
                            $limit: option.limits
                        }
                    ]
                }
            }
        } catch (error) {

        }
    }






}