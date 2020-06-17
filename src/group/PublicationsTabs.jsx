import React, { Component } from "react";
import { Link } from "react-router-dom";

 class PublicationsTabs extends Component {



  render() {

    const { publications } = this.props;
    console.log("Publications: ",publications);

    return (
      <>
        {publications.length === 0 ? (<>
            <div className="row text-center">
                <h2>Cargando...</h2>
            </div>
        </>):(<>
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
              {publications.map((publication, i)=>{
                  return (<>
                    <div className="row">
                        <div className="col-md-12">
                            <p>{publication.title},{publication.description}</p>
                        </div>
                    </div>
                  </>)
              })}
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
