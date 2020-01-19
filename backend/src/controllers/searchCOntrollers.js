const axios = require("axios");
const Dev = require('../models/Dev');
const TrasnfStringArray = require('../utils/trasnfomrStringArray');
Dev.createIndexes({  location  :  "2dsphere"  } );

module.exports = {
    async index(request, response){
        // buscar programers no raio de 10 km
        // buscar programers por techs

        const {latitude, longitude, techs} = request.query;
        const techsArrey = TrasnfStringArray(techs);
        const devs = await Dev.find({
            techs:{
                $in: techsArrey
            },
            location: {
                $near: {
                    $geometry: {
                        type : "Point",
                        coordinates: [longitude,latitude]
                    },
                    $maxDistance: 100000,
                }
            }
        });
        // console.log(latitude, longitude, techsArrey);
        return response.json(devs);
    },
};