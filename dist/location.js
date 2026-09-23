// Coordinates remain in memory; nearby.js sends rounded coordinates to Overpass for café lookup.
export function createLocationService({geo,secure=true,onChange=()=>{}}={}) {
  let state={status:'idle',coordinates:null,message:''},generation=0;
  const publish=patch=>{state={...state,...patch};onChange({...state});return state};
  return {
    getState:()=>({...state}),
    useDemo(){generation++;return publish({status:'demo',coordinates:null,message:'Sample neighborhood selected. Device location is not being used.'})},
    request(){
      if(state.status==='loading')return;
      const requestId=++generation;
      if(!secure||!geo)return publish({status:'unavailable',coordinates:null,message:'Location is unavailable here. Open JavaMile in your browser over HTTPS, or continue with the sample neighborhood.'});
      publish({status:'loading',coordinates:null,message:'Finding your location… Allow location access if your browser asks.'});
      const failure=error=>{if(requestId!==generation)return;publish({status:error.code===1?'denied':'unavailable',coordinates:null,message:error.code===1?'Location access is blocked. Allow location for this site in your browser settings, then retry. You can also keep exploring the sample neighborhood.':error.code===3?'Location took too long. Try again, or continue with the sample neighborhood.':'Your device couldn’t find its location. Check location services, then retry or use the sample neighborhood.'})};
      try{geo.getCurrentPosition(position=>{
        if(requestId!==generation)return;
        const {latitude,longitude,accuracy}=position.coords;
        if(!Number.isFinite(latitude)||!Number.isFinite(longitude)||!Number.isFinite(accuracy)||accuracy<0||Math.abs(latitude)>90||Math.abs(longitude)>180){failure({code:2});return}
        publish({status:'ready',coordinates:{latitude,longitude,accuracy,timestamp:position.timestamp},message:'Your location is ready. Searching nearby café listings.'});
      },failure,{enableHighAccuracy:false,timeout:12000,maximumAge:60000})}catch{failure({code:2})}
    }
  }
}
export function locationLabel(state){return {idle:'Use my location',loading:'Finding your location…',ready:'Your location detected',denied:'Location blocked',unavailable:'Location unavailable',demo:'Demo neighborhood'}[state.status]}
