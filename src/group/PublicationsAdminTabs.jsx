import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 class PublicationsAdminTabs extends Component {
    render() {
        const { publications } = this.props;


        return (
            <div className="col-md-12 text-center">
                <h2>Actividades</h2>
            <div>
              {publications.map((publication, i)=>{
                  return (<>
                    <div className="row">
                        <div className="col-md-12">
                           <Link to={{
                               pathname:`/Grupo/publicaciones/publicacion/`,
                               state:{params:{idPublication:publication._id}}
                            
                        }} style={{color:"black"}} > <p>{publication.title},{publication.description}</p> </Link> 
                        </div>
                    </div>
                  </>)
              })}
            </div>
            </div>
        )
    }
}


export default PublicationsAdminTabs;