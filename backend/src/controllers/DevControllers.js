const axios = require("axios");
const Dev = require('../models/Dev');
Dev.createIndexes({  location  :  "2dsphere"  } );
const TrasnfStringArray = require('../utils/trasnfomrStringArray');
const { filterCoonnections, CommitMessenge } = require('../WebSocket');

module.exports = {
    async index(request,response){
        const devs =await Dev.find();
        return response.json(devs);
    },
    
    async storeBD(request, response){
        const {github_username, techs, latitude, longitude} = request.body;
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const {name = login,avatar_url, bio} = apiResponse.data;
            
            const techsArray = TrasnfStringArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev =  await Dev.create({
                name,
                github_username,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            // filtrar os novos devs que estao a no maximo 10km e que utilizam as msms techs
            const SocketMessengeTo = filterCoonnections(
                {latitude, longitude}, 
                techsArray,
            );
            
            CommitMessenge(SocketMessengeTo, 'NewDev', dev);
        }
        return response.json(dev);
        // o async e o await é para que a aolicaçao espera a resposta da api.
    }
};