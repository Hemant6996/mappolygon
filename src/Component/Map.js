import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup, LayersControl } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import osm from './osm-provider';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function Mapgis() {

       const location = useLocation()
       const data = location.state.lat
       const data1 = location.state.lng
       const data2 = location.state.jobid

       const [center, setCenter] = useState({
              lat: data,
              lng: data1,
       })

       const [centerid, setCenterid] = useState(data2)



       const { BaseLayer, Overlay } = LayersControl;

       //28.501034998557003, 77.41005372172295
       const zoom_level = 25
       const navigate = useNavigate();
       const mapref = useRef()

       delete L.Icon.Default.prototype._getIconUrl;
       L.Icon.Default.mergeOptions({
              iconRetinaUrl:
                     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
              iconUrl:
                     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
              shadowUrl:
                     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
       });

       const HandleHome = () => {
              console.log("myjob hitted")
              navigate('/')
       }

       const drawOptions1 = {
              position: 'topright',
              draw: {
                     polygon: {
                            allowIntersection: false,
                            drawError: {
                                   color: '#0037ff',
                                   message: '<strong>Oh no!</strong> You can\'t draw that!',
                            },
                            shapeOptions: {
                                   color: '#0037ff', // Color for the first set of polygons
                            },
                     },

              }
       }

       const drawOptions2 = {
              position: 'topleft',
              draw: {
                     polygon: {
                            allowIntersection: false,
                            drawError: {
                                   color: '#e1e100',
                                   message: '<strong>Oh no!</strong> You can\'t draw that!',
                            },
                            shapeOptions: {
                                   color: '#ff0000', // Color for the second set of polygons
                            },
                     },
                     polyline: false,
                     circle: false,
                     rectangle: false,
                     marker: false,
                     circlemarker: false,
                     edit:false

              }
       }



       return (
              <>
                     <div> <h1><b><center>WORKFLOW MANAGER</center></b></h1> </div>
                     <button onClick={HandleHome}>My Job</button>

                     <div>
                            <MapContainer center={center} zoom={zoom_level} ref={mapref} >
                                   <FeatureGroup >
                                          <EditControl position='topright' showArea="true" {...drawOptions1} />
                                          <EditControl {...drawOptions2} />


                                   </FeatureGroup>

                                   {/* <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/> */}

                                   <LayersControl position="topright">
                                          <BaseLayer checked name="Satellite view">
                                                 <TileLayer url={osm.maptiler.url1} attribution={osm.maptiler.attribution} />
                                          </BaseLayer>
                                          <BaseLayer checked name="Open Street map">
                                                 <TileLayer url={osm.maptiler.url2} attribution={osm.maptiler.attribution} />
                                          </BaseLayer>

                                          <BaseLayer name="Basemap">
                                                 <TileLayer url={osm.maptiler.url3} attribution={osm.maptiler.attribution} />
                                          </BaseLayer>

                                          <BaseLayer name="Opentopo map">
                                                 <TileLayer url={osm.maptiler.url4} attribution={osm.maptiler.attribution} />
                                          </BaseLayer>
                                   </LayersControl>
                                   <Marker position={center}>
                                          <Popup>
                                                 <b>JOB_ID:{centerid}</b>
                                          </Popup>
                                   </Marker>



                            </MapContainer>



                     </div>

              </>
       )
}

export default Mapgis