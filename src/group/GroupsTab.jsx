import React, { Component } from 'react';

 class GroupsTab extends Component {
    
  
    render() {
        const { groupsISC,groupsTICS,groupsII,groupsIIA,groupsIGE,groupsG } = this.props;
        console.log("Props:",this.props);

        const styles =  { 
          cardTitle:{
            display: "flex",
            alignItems:"center"
          },
          cardBody:{
            maxHeight: "400px"
          }
          
        };
        
        
        return (
            <>
              <div id="accordion">
                {groupsISC.length == 0 ? (<></>) : (<>
                  <div className="card">
                  <div className="card-header" id="headingOne" style={styles.cardTitle}>
                    <h4>I.S.C.</h4>
                      <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </button>
                    
                  </div>

                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body" style={styles.cardBody}>
                     {groupsISC.map((group,i)=>{
                       return(
                       <>{JSON.stringify(group)}</>
                       )
                     })}
                    </div>
                  </div>
                </div>
                </>)}
                
                {groupsTICS.length == 0 ? (<></>) : (<>
                  <div className="card">
                  <div className="card-header" id="headingTwo" style={styles.cardTitle}>
                    <h4 className="mb-0">T.I.C.S.</h4>
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </button>
                    
                  </div>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div className="card-body" style={styles.cardBody}>
                      {groupsTICS.map((group,i)=>{
                        return(
                        <>{JSON.stringify(group)}</>
                        )
                      })}                    </div>
                  </div>
                </div>
                </>)}


                {groupsII.length == 0 ? (<></>) : (<>
                  <div className="card">
                  <div className="card-header" id="headingThree" style={styles.cardTitle}>
                    <h4 className="mb-0">I.Industrial</h4>
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </button>
                    
                  </div>
                  <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body" style={styles.cardBody}>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                  </div>
                </div>
                </>)}

                {groupsIIA.length == 0 ? (<></>) : (<>
                  <div className="card">
                  <div className="card-header" id="headingFour" style={styles.cardTitle}>
                    <h4 className="mb-0">I.I.Alimantarias</h4>
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                          <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </button>
                    
                  </div>
                  <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                    <div className="card-body" style={styles.cardBody}>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                  </div>
                </div>
                </>)}


                {groupsIGE.length == 0 ? (<></>) : (<>
                  <div className="card">
                  <div className="card-header" id="headingFive" style={styles.cardTitle}>
                    <h4 className="mb-0">I.G.E</h4>
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                          <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </button>
                    
                  </div>
                  <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                    <div className="card-body" style={styles.cardBody}>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                  </div>
                </div>
                </>)}

                {groupsG.length == 0 ? (<></>) : (<>
                  <div className="card">
                  <div className="card-header" id="headingSix" style={styles.cardTitle}>
                    <h4 className="mb-0">Gastronomia</h4>
                      <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseThree">
                          <i className="fa fa-plus-circle" aria-hidden="true"></i>
                      </button>
                    
                  </div>
                  <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                    <div className="card-body" style={styles.cardBody}>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                  </div>
                </div>
                </>)}

              </div>
            </>
        )
    }
}


export default GroupsTab;