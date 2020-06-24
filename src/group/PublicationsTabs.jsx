import React, { Component } from "react";
import { Link } from "react-router-dom";

 class PublicationsTabs extends Component {

  constructor() {
    super();
    this.state = {
        publications:[],
        error: "",
        loading: false,
        todo:true,
        act:false,
        aviso:false,
        apoyo:false,
        idGroup:"",
        groupName:""
    }
}

componentDidMount = () => {
  const { publications,idGroup,groupName } = this.props;
 
  this.setState({publications:publications.reverse(),idGroup,groupName});
}

handleChange = name => event => {
  this.setState({[name] : event.target.value});
  console.log("Event:",event.target.value);
  switch(name){
      case "todo":
          if(event.target.value == "true"){
              this.setState({todo:false});
          }else{
              this.setState({todo:true, act:false,aviso:false,apoyo:false});
          }
      break;
      case "act":
          if(event.target.value == "true"){
              this.setState({act:false});
          }else{
              this.setState({todo:false, act:true,aviso:false,apoyo:false});
          }
      break;
      case "aviso":
          if(event.target.value == "true"){
              this.setState({aviso:false});
          }else{
              this.setState({todo:false, act:false,aviso:true,apoyo:false});
          }
      break;
      case "apoyo":
          if(event.target.value == "true"){
              this.setState({apoyo:false});
          }else{
              this.setState({todo:false, act:false,aviso:false,apoyo:true});
          }
      break;
      default:
      break
  }
}

renderSwitch = (publications)=>{
  const {todo,act,aviso,apoyo,idGroup,groupName} = this.state;
  let aux1 = [];
  if(todo){
     aux1 = publications;
      return(
          aux1.map((publication, i)=>{
              return (<>
                <div className="row">
                    <div className="col-md-12">
                    <div className={this.getColorLink(publication.mode)} role="alert">
                              <Link to={{
                              pathname:`/Grupo/publicaciones/publicacion/`,
                              state:{params:{idPublication:publication._id,idGroup:idGroup,groupName:groupName}}
                              
                      }} style={{color:"black"}} > <p>{publication.title},{publication.description}</p> </Link> 
                          </div>
                       
                    </div>
                </div>
              </>)
          })
         
      )
  }else if(act){
      aux1 = this.organiceGroups(publications,"activity");
      return(
          aux1.map((publication, i)=>{
              return (<>
                <div className="row">
                    <div className="col-md-12">
                    <div className={this.getColorLink(publication.mode)} role="alert">
                              <Link to={{
                              pathname:`/Grupo/publicaciones/publicacion/`,
                              state:{params:{idPublication:publication._id,idGroup:idGroup,groupName:groupName}}
                              
                      }} style={{color:"black"}} > <p>{publication.title},{publication.description}</p> </Link> 
                          </div>
                       
                    </div>
                </div>
              </>)
          })
         
      )
  }else if(aviso){
      aux1 = this.organiceGroups(publications,"notice");
      return(
          aux1.map((publication, i)=>{
              return (<>
                <div className="row">
                    <div className="col-md-12">
                    <div className={this.getColorLink(publication.mode)} role="alert">
                              <Link to={{
                              pathname:`/Grupo/publicaciones/publicacion/`,
                              state:{params:{idPublication:publication._id,idGroup:idGroup,groupName:groupName}}
                              
                      }} style={{color:"black"}} > <p>{publication.title},{publication.description}</p> </Link> 
                          </div>
                       
                    </div>
                </div>
              </>)
          })
         
      )
  }else{
      aux1 = this.organiceGroups(publications,"apoyo");
      return(
          aux1.map((publication, i)=>{
              return (<>
                <div className="row">
                    <div className="col-md-12">
                    <div className={this.getColorLink(publication.mode)} role="alert">
                              <Link to={{
                              pathname:`/Grupo/publicaciones/publicacion/`,
                              state:{params:{idPublication:publication._id,idGroup:idGroup,groupName:groupName}}
                              
                      }} style={{color:"black"}} > <p>{publication.title},{publication.description}</p> </Link> 
                          </div>
                       
                    </div>
                </div>
              </>)
          })
         
      )
  }
  

} 
organiceGroups = (publications,mode)=>{
  console.log("Publications",publications,mode);
  let aux = [];
  for (let index = 0; index < publications.length; index++) {
      if(publications[index].mode == mode){
          aux.push(publications[index]);
      }            
  }
  console.log("Aux:",aux);
  return aux;
}


  getColorLink =(mode) => {
    switch(mode){
      case "activity":
        return "alert alert-primary";
      break;
      case "notice":
        return "alert alert-danger";
      break;
      default:
       return "alert alert-dark"
        break  
    }
  }

  render() {

    const { publications,idGroup,groupName, } = this.props;
    const { todo, act,aviso,apoyo } = this.state;
        if(todo === false && act === false && aviso === false && apoyo === false){
            this.setState({todo: true});
        }
    return (
      <>
      
        {publications.length === 0 ? (<>
            <div className="row text-center">
                <h2>Cargando...</h2>
            </div>
        </>):(<>
        <br/>
        <div className="row" style={{width:"-webkit-fill-available"}}>
                    <div className="col-md-3">
                        <label htmlFor="act">Todo</label> <input type="checkbox" checked={todo} onChange={this.handleChange("todo")} value={todo} name="todo" id="todo"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="act">Actividades</label> <input type="checkbox" checked={act} onChange={this.handleChange("act")} value={act} name="act" id="act"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="aviso">Avisos</label> <input type="checkbox" checked={aviso} onChange={this.handleChange("aviso")} value={aviso} name="aviso" id="aviso"/>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="apoyo">M.Apoyo</label> <input type="checkbox" checked={apoyo} onChange={this.handleChange("apoyo")} value={apoyo} name="apoyo" id="apoyo"/>
                    </div>
                </div>
          
            <div className="tabs">
          <div className="tab-2">
            <label style={{ color: "black" }} htmlFor="tab2-1">
              Todas
            </label>
            <input
              id="tab2-1"
              name="tabs-two"
              type="radio"
              defaultChecked={true}
            />
            <div>
              {this.renderSwitch(publications)}
            </div>
          </div>
          <div className="tab-2">
            <label style={{ color: "black" }} htmlFor="tab2-2">
              Realizadas
            </label>
            <input id="tab2-2" name="tabs-two" type="radio" />
            <div>
              <h4>Tab Two</h4>
              <p>
                Quisque sit amet turpis leo. Maecenas sed dolor mi. Pellentesque
                varius elit in neque ornare commodo ac non tellus. Mauris id
                iaculis quam. Donec eu felis quam. Morbi tristique lorem eget
                iaculis consectetur. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Aenean at
                tellus eget risus tempus ultrices. Nam condimentum nisi enim,
                scelerisque faucibus lectus sodales at.
              </p>
            </div>
          </div>
        </div>
        </>)}
      </>
    );
  }
}

export default PublicationsTabs;
