import { Component } from "react";
import Cookies from "js-cookie";
import SideBar from "../SideBar";
import EachTransaction from "../EachTransaction";
import "./index.css"

const id = Cookies.get("user_id");
const role = id === "3" ? "admin" : "user";

const stateConstatnts = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

class Transactions extends Component{
  state = {allTransData: [],apiState: stateConstatnts.initial}

  componentDidMount(){
    this.getAllTransData()
  }

  getAllTransData = async()=>{
    this.setState({apiState:stateConstatnts.loading})
    const url = "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=20&&offset=0"

    const headers = role === "admin" ? {
      "content-type":"application/json",
      "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role":"admin",
      "x-hasura-user-id":"3"
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
    this.setState({apiState:stateConstatnts.success,allTransData:fetchedData.transactions})
  }

  

  


  render(){
    const {allTransData} = this.state
    
    return(
      <div className="trans-bg-cont">
      <SideBar />
      <div className="trans-container">
        <div className="trans-header-cont">
          <div className="heading-cont">
            <h1 className="trans-head">Transactions</h1>
            <div className="filters-cont">
              <button  className="filter-btn">All Transactions</button>
              <button  className="filter-btn">Debit</button>
              <button  className="filter-btn">Credit</button>
            </div>
          </div>
          {role === "user" && (
              <button className="add-button-trans"> + Add Transaction</button>
            )}
        </div>
        
        <ul className="transactions-ul-element">
          <li className="transactions-li-elemet">
              <p className="column-name">Transaction name</p>
              <p className="column-name">Category</p>
              <p className="column-name">Date</p>
              <p className="column-name"> Amount</p>
          </li>
          {allTransData.map(each=>(
            <EachTransaction key={each.id} details={each} role={role} />
          ))}
        </ul>

      </div>
    </div>
    )
  }
}
  
  
   
  
export default Transactions