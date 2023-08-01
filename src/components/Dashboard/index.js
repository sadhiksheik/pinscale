import { Component } from "react";
import Loader from 'react-loader-spinner'
import Cookies from "js-cookie";
import SideBar from "../SideBar";
import LastThreeTransactions from "../LastThreeTransactions"
import LastSevenDaysGraph  from "../LastSevenDaysGraph"

import "./index.css";

const stateConstatnts = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const id = Cookies.get("user_id");
const role = id === "3" ? "admin" : "user";

class Dashboard extends Component {
  state = { dashboardState: stateConstatnts.initial, debitCredits: [] };

  componentDidMount() {
    this.getCrediDebitTotals()
  }

  getCrediDebitTotals = async() =>{
    this.setState({dashboardState:stateConstatnts.loading})
    const url = role === "admin"? "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin" : "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals"

    const headers = role === "admin" ? {
      "content-type":"application/json",
      "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role":"admin",
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
    console.log(response)
    role === "user" ?
    (this.setState({dashboardState:stateConstatnts.success,debitCredits:fetchedData.totals_credit_debit_transactions})):(this.setState({dashboardState:stateConstatnts.success,debitCredits:fetchedData.transaction_totals_admin}))

  }
  
  renderTotalsLoadingView = () =>(
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderTotals = () =>{
    const {debitCredits} = this.state
    console.log(debitCredits)
    return(
      <div className="totals-cont">
          <div className="credit-cont">
              <div className="amount-cont">
                {debitCredits.length >= 2 && (<h1 className="amount">${debitCredits[1].sum}</h1>)}
                
                <p className="type">credit</p>
              </div>
              <img src="https://res.cloudinary.com/dyal335uz/image/upload/v1690791157/Group_tjytb3.jpg" alt="creditImage" className="credi-image" />
          </div>

          <div className="credit-cont">
              <div className="amount-cont">
              {debitCredits.length >= 2 && (<h1 className="amount">${debitCredits[0].sum}</h1>) } 
                <p className="type">debit</p>
              </div>
              <img src="https://res.cloudinary.com/dyal335uz/image/upload/v1690791544/Group_1_gtpuqi.svg" alt="creditImage" className="credi-image" />
          </div>

          
      </div>
    )
  }


  getSwitchedDetails = () => {
    const {dashboardState} = this.state
    switch (dashboardState) {

      case stateConstatnts.success:
        return this.renderTotals()
      case stateConstatnts.failure:
        return this.renderFailureView()
      case stateConstatnts.loading:
        return this.renderTotalsLoadingView()
      default:
        return null
    }
  }

  

  render() {
    
    return (
      <div className="dash-bg-container">
        <SideBar />

        <div className="dash-container">
          <div className="dash-header-cont">
            <p className="accounts">Accounts</p>
            {role === "user" && (
              <button className="add-button"> + Add Transaction</button>
            )}
          </div>

          {this.getSwitchedDetails()}

          <h1 className="last-tans">Last Transaction</h1>
          <LastThreeTransactions />
          <h1 className="last-tans">Credi & Debit Overview </h1>
          <LastSevenDaysGraph />

        </div>
      </div>
    );
  }
}
export default Dashboard;
