import { Component } from "react";
import Loader from 'react-loader-spinner'
import Cookies from "js-cookie";
import EachTransaction from "../EachTransaction"

import "./index.css"

const stateConstatnts = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};
const id = Cookies.get("user_id");
const role = id === "3" ? "admin" : "user";


class LastThreeTransactions extends Component{
  state = {apiState:stateConstatnts.initial,lastThree:[]}

  componentDidMount() {
    this.getLastThree()
  }

  getLastThree = async () =>{
    this.setState({apiState:stateConstatnts.loading})
    const url = "https://bursting-gelding-24.hasura.app/api/rest/all-transactions/?limit=3&&offset=7"
    const headers = role === "admin" ? {
      "content-type":"application/json",
      "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role":"admin",
      "x-hasura-user-id":`${id}`,
    } : {
      "content-type":"application/json",
      "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role":"user",
      "x-hasura-user-id":`${id}`,
    }

    const options = {
      headers:headers,
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    this.setState({apiState:stateConstatnts.success,lastThree:fetchedData.transactions})
  }

  getLastThreeTransView = () =>{
    const {lastThree} = this.state
    
    return(
      <ul className="three-ul-element">
        {lastThree.map(each=>(
          <EachTransaction key={each.id} role={role} details={each} />
        ))}
      </ul>
    )
  }

  renderTotalsLoadingView = () =>(
    <div className="loader-cont">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )


  getSwitchedResults = () =>{
    const {apiState} = this.state
    switch (apiState) {
      case stateConstatnts.success:
        return this.getLastThreeTransView()
      case stateConstatnts.failure:
        return this.renderFailureView()
      case stateConstatnts.loading:
        return this.renderTotalsLoadingView()
      default:
        return null
    }
  }

  render(){
    
    return(this.getSwitchedResults())
  }
}

export default LastThreeTransactions