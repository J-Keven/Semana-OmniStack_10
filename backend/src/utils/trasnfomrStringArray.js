module.exports = function TransfomStringArrey(ArreyString){
    return ArreyString.split(',').map(tech => tech.trim());
}