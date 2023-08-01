import { Component } from "react";
import Cookies from "js-cookie";
import Loader from 'react-loader-spinner'
// import { format } from 'date-fns';
import { BarChart, XAxis, YAxis, Legend, Bar } from 'recharts';
import { format, parseISO } from 'date-fns';


import "./index.css"

const stateConstatnts = {
  initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};
const id = Cookies.get("user_id");
const role = id === "3" ? "admin" : "user";


class LastSevenDaysGraph extends Component{
  state = {apiState:stateConstatnts.initial,sevenDaysData:[]}

  componentDidMount() {
    this.getSevenDaysData()
  }

  getSevenDaysData = async () =>{
    this.setState({apiState:stateConstatnts.loading})
    const url = role==="admin"? "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin":"https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days"

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
    role === "user" ?
    (this.setState({apiState:stateConstatnts.success,sevenDaysData:fetchedData.last_7_days_transactions_credit_debit_totals})):(this.setState({apiState:stateConstatnts.success,sevenDaysData:fetchedData.last_7_days_transactions_totals_admin}))
  }

  getLastSevenDays = () =>{
    const {sevenDaysData} = this.state
    const data = sevenDaysData
    
    const formattedData = data.map((item) => ({
      ...item,
      date: format(parseISO(item.date), 'EEE'),
    }));

    const getFinalDebits = each =>{
      const {date,sum} = each
      const obj = {date:date,debit:sum}
      return obj
    }
    const getFinalCredits = each =>{
      const {date,sum} = each
      const obj = {date:date,credit:sum}
      return obj
    }

    const finalData = formattedData.map(each=>(
      each.type==="debit"? getFinalDebits(each):getFinalCredits(each)
    ))

    console.log(finalData)
    return(
      <div>
        <BarChart width={800} height={331} className="bar-chart" data={finalData}>
      <XAxis
        dataKey="date"
        tick={{
          stroke: 'black',
          strokeWidth: 0.2,
          fontSize: 12,
          fontFamily: 'Roboto',
        }}
      />
      <YAxis
      dataKey="credit"
        tick={{
          stroke: 'black',
          strokeWidth: 0.2,
          fontSize: 12,
          fontFamily: 'Roboto',
        }}
      />

      <Legend />
      <Bar
        dataKey="credit"
        fill="#4D78FF" 
        label={{ position: 'top', color: 'black' }}
        radius={[10, 10, 0, 0]}
        barSize="10%"
      />
      <Bar
        dataKey="debit"
        fill="#FCAA0B"
        label={{ position: 'top', color: 'yellow' }}
        radius={[10, 10, 0, 0]}
        barSize="10%"
      />
    </BarChart>
    </div>
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
        return this.getLastSevenDays()
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

export default LastSevenDaysGraph