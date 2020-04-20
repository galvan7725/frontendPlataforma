import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';

class GroupsTabStudent extends Component {
    render() {

        const { groups } = this.props;
        const styles =  { 
            cardTitle:{
              display: "flex",
              alignItems:"center"
            },
            cardBody:{
              maxHeight: "400px",
              overflow:"auto"
            },
            imgGroup:{
              width:"100px"
            },
            separator:{
              border: "1px solid white"
            }
  
            
          };

        return (
           <>
            <div id="acordion">
            {groups.length === 0 ? (<>
                <small>
                    No perteneces a ningun grupo de trabajo
                </small>
            </>) : (<>
                <div className="card" style={{backgroundColor:"gray",color:"white"}}>
                  <div className="card-header" id="headingOne" style={styles.cardTitle}>
                    <h4>Todos los grupos.</h4>
                      <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </button>
                    
                  </div>

                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body" style={styles.cardBody}>
                     {groups.map((group,i)=>{
                       return(
                       <>
                         <hr style={styles.separator}/>

                        <Link to={`/Grupo/${group._id}`}>
                        <div className="row"  >
                         <div className="col-md-2">
                           <img style={styles.imgGroup} src={`${process.env.REACT_APP_API_URL}/group/photo/${group._id}`} onError={i => (i.target.src = `${logo}`)} alt="logo"/>
                         </div>
                         <div className="col-md-10">
                            <h6>{group.name}</h6>
                            <p>{group.description}</p>
                            <hr style={styles.separator}/>
                       <small>Docente:{" "}{group.teacher.name}</small>
                         </div>
                       </div>
                        </Link>

                       <hr style={styles.separator}/>                     
                       </>
                       )
                     })}
                    </div>
                  </div>
                </div>
            </>)}
            </div>
           </>
        )
    }
}


export default  GroupsTabStudent;