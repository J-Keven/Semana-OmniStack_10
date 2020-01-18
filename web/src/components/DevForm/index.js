import React, { useState , useEffect} from 'react'

function DevForm({onSubmit}){
    const [github_username, setgithub_username] = useState('');
    const [techs, settechs] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (Position)=>{
            // console.log(position);
            const { latitude, longitude } = Position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) =>{
    
          },
          {
            timeout:3000,
          }
        );
    }, []);

    async function devSubmit(e){
        e.preventDefault();
        await onSubmit({
                github_username,
                techs,
                latitude,
                longitude,
            }
        );
        
        setgithub_username('');
        settechs('');
    }

    return(
        <form onSubmit={devSubmit}>
          <div className='input-block'>
            <label htmlFor="github_username">Usuário do Github</label>
            <input 
              name="github_username" 
              id="github_username" 
              required 
              value={github_username}
              onChange={e => setgithub_username(e.target.value)}
            />
          </div>
                    
          <div className='input-block'>
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required 
              value={techs}
              onChange={e => settechs(e.target.value)}
            />
          </div>  

          <div className="input-group">
            <div className='input-block'>
              <label htmlFor="latitude">Latitude</label>
              <input 
                type='number' 
                name="latitude" 
                id="latitude" 
                required 
                value={latitude} 
                onChange={e => setLatitude(e.target.value)}
              />
            </div>


            <div className='input-block'>
              <label htmlFor="longitude">Longitude</label>
              <input 
                type='number' 
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>

        </form>
    );
}

export default DevForm;