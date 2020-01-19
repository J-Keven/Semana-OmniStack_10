import React ,{useState ,useEffect}from 'react';

import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Image, View, Text,TextInput, TouchableOpacity } from 'react-native'
import MapView , { Marker, Callout} from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, desconnect, subscribeToNewDev }  from '../services/socket'

function Main({ navigation }){
    const [currentRegion, setcurrentRegion] = useState(null);
    const [Devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('')

    useEffect( () =>{
        async function LoadInitialPosition(){
           const { granted } = await requestPermissionsAsync();
           if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: false,
                });
                const {latitude, longitude} = coords;
                setcurrentRegion({
                    latitude,
                    longitude, 
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }
        }
        LoadInitialPosition();
    }, []);

    useEffect(() =>{
        subscribeToNewDev(dev => setDevs([...Devs,dev]));
    }, [Devs]);
    function StartingWebSocket(){
        desconnect();

        const { latitude, longitude } = currentRegion;
        connect(
            latitude,
            longitude,
            techs,
        );
    }
    async function LoadDevs(){
        const {latitude, longitude } = currentRegion;

        const response = await api.get('/search',{
            params: {
                latitude,
                longitude,
                techs,

            }
        })

        setDevs(response.data);
        StartingWebSocket();
    }

    function setNewRegion(region){
        setcurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }

    return( 
        <>
            <MapView 
                onRegionChangeComplete={setNewRegion} 
                initialRegion={currentRegion} 
                style={style.map}
            >
                {Devs.map(dev =>(
                    <Marker 
                        key={dev._id}   
                        coordinate={{
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1], 
                        }}
                    >
                        <Image 
                            style={style.avatar} 
                                source={{
                                    uri: dev.avatar_url
                            }}
                        />

                        <Callout onPress={()=>{
                            navigation.navigate('Profile', { github_username: dev.github_username });
                        }}>
                            <View style={style.callout}>
                                <Text style={style.DevName}>{dev.name}</Text>
                                <Text style={style.DevBio}>{dev.bio}</Text>
                                <Text style={style.DevTchs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={style.Form}>
                <TextInput 
                    style={style.Input}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor='#999'
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={LoadDevs} style={style.Button}>
                    <MaterialIcons name='my-location' size={20} color='#FFF'/>
                </TouchableOpacity>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar: {
        height: 54,
        width: 54,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#666',
    },
    callout: {
        width: 260,
    },

    DevName: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },

    DevBio:{
        color: '#666',
        marginTop: 5,
    },

    DevTchs: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    Form:{
        position:"absolute",
        top: 20,
        left: 10,
        right: 20,
        zIndex: 5,
        flexDirection: "row",
    },
    Input:{
        flex: 1, 
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{  
            width: 4,
            height: 4,
        },
    },
    Button:{
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        marginLeft: 15,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default Main;