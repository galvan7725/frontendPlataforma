import React, { Component } from 'react';
import NavBar from '../core/NavBar';
import '../App.css';
import $ from 'jquery';
import SideBar from '../core/SideBar';
import Hammer from 'hammerjs';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { groupsByUser, groupsByTeacher } from './apiGroup';
import GroupsTab from './GroupsTab';
import GroupsTabStudent from './GroupsTabStudent';

 class GropusByUser extends Component {

    constructor(){
        super();
        this.state = {
            error:"",
            groups:[],
            groupsISC:[],
            groupsTICS:[],
            groupsII:[],
            groupsIIA:[],
            groupsIGE:[],
            groupsG:[],
            loading:false
        }
    }

    componentDidMount = async() =>{
        this.setState({loading:true});
        let window = document.querySelector('#contenedor');
        //console.log(window);
        let hammer = new Hammer(window);
        hammer.get('swipe').set({direction:Hammer.DIRECTION_RIGHT});
        hammer.on('swipe',()=>{
            $(".wrapper").toggleClass("active")
            //this.setState({redirectLogin:true});
            console.log("swipe");
        });
        console.log(this.props.location.pathname);
        $("#link_grupos").addClass('active');
        const user = isAuthenticated().user;

        if(user.role == "admin" || user.role == "teacher"){
           await this.init("teacher");
           
        }else{
            await this.init("student");
        }

        

    }

    init = async (role) =>{
        console.log(role);
        const token = isAuthenticated().token;

        try {

            if(role === "teacher"){
                const {result} = await groupsByTeacher(token,isAuthenticated().user._id);
                    if(result.error){
                        console.log(result.error);
                        this.setState({loading: false});

                    }else{
                        this.setState({groups:result});
                        this.organiceGroups(result);
                        this.setState({loading: false});
                        console.log(result);
                    }

            }else{
                const {result} = await groupsByUser(token,isAuthenticated().user._id);
                
                    if(result.error){
                        console.log(result.error);
                        this.setState({loading: false});

                    }else{
                        this.setState({groups:result});
                        this.organiceGroups(result);
                        this.setState({loading: false});
                        console.log(result);
                    }


            }
            
            
        } catch (error) {
            console.log(error);
            this.setState({loading: false});

        }

    }

    organiceGroups = (groups) =>{
        const {groupsISC,groupsTICS,groupsII,groupsIGE,groupsIIA,groupsG } = this.state;

        groups.map((group,i)=>{
            switch (group.career) {
                case 'ISC':
                    groupsISC.push(group);
                break;
                case 'TICS':
                    groupsTICS.push(group);
                break;
                case 'II':
                    groupsII.push(group);
                break;
                case 'IGE':
                    groupsIGE.push(group);
                break;
                case 'IIA':
                    groupsIIA.push(group);
                break;
                case 'GASTRONOMIA':
                    groupsG.push(group);
                break;
            }
        });
        this.setState({groupsISC,groupsTICS,groupsII,groupsIGE,groupsIIA,groupsG});



    }

    render() {
        const { error, groups,groupsISC,groupsTICS,groupsII,groupsIGE,groupsIIA,groupsG,loading } = this.state;

        //console.log("State:",this.state);
        

        return (
            <>
            <div className="wrapper active">

            <NavBar />

            <div className="main_body">

           <SideBar/>

        <div className="container" id="contenedor">

            {loading ? (<>
                <div className="row">
                <div className="col-md-12" style={{color:"black"}}>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
            </>) : (<>
                <div className="row">
               <div className="col-md-10">
                <h4>Grupos</h4>
               </div>
               <div className="col-md-2">
                   {isAuthenticated().user.role == "teacher" || isAuthenticated().user.role == "admin" ? (<>
                    <Link to={`/Grupo/nuevo`} className="btn btn-raised btn-block btn-success">Nuevo <i className="fa fa-plus-circle" aria-hidden="true"></i></Link>
                   </>) :(<></>)}
               </div>
            </div>
            <div className="row">
                
                <div className="col-md-12">
                    {isAuthenticated().user.role == "admin" || !isAuthenticated().user.role == "teacher" ? (<>
                        <GroupsTab groupsISC={groupsISC} groupsTICS={groupsTICS} groupsII={groupsII} groupsIIA={groupsIIA} groupsIGE={groupsIGE} groupsG={groupsG} />
                    </>) : (<>
                        <GroupsTabStudent groups={groups} />
                    </>)}
                </div>
                
            </div>
            </>)}



            
            
        </div>
</div>
</div>
            
        </>
        )
    }
}

export default GropusByUser;