import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
    state = {
      email: '',
      password: '',
      showSubmitError: false,
      errorMsg: '',
    }

    onChangeEmail = event => {
      this.setState({email: event.target.value})
    }
  
    onChangePassword = event => {
      this.setState({password: event.target.value})
    }
  
    onSubmitSuccess = jwtToken => {
      const {history} = this.props
  
      Cookies.set('user_id', jwtToken, {
        expires: 30,
      })
      history.replace('/')
    }
  
    onSubmitFailure = errorMsg => {
      this.setState({showSubmitError: true, errorMsg})
    }
  
      submitForm = async event => {
      event.preventDefault()
    //   const {history} = this.props
  
    //   Cookies.set('user_id', "1", {
    //     expires: 30,
    //   })
    //   history.replace('/')
    // }
      const {email, password} = this.state
      const userDetails = {email, password}
      const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id"

      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
        headers:{
          "content-type":"application/json",
          "x-hasura-admin-secret":"g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        }
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      if (response.ok === true) {
        this.onSubmitSuccess(data.get_user_id[0].id)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    }
  
     renderPasswordField = () => {
      const {password} = this.state
  
      return (
        <>
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />
        </>
      )
    }
  
     renderEmailField = () => {
      const {email} = this.state
  
      return (
        <>
          <label className="input-label" htmlFor="email">
            E-MAIL
          </label>
          <input
            type="email"
            id="username"
            className="username-input-field"
            value={email}
            onChange={this.onChangeEmail}
            placeholder="e-mail"
          />
        </>
      )
    }
  
  render(){
    const token = Cookies.get('user_id')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return(
      <div className="login-form-container">
      <form className="form-container" onSubmit={this.submitForm}>
        <div className='website-name-cont'>
        <img
          src="https://res.cloudinary.com/dyal335uz/image/upload/v1690613470/Group_rzu5bl.svg"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <p className='website-name-login'>Money <span className='login-span'>Matters</span></p>
        </div>
        <div className="input-container">{this.renderEmailField()}</div>
        <div className="input-container">{this.renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {/* {showSubmitError && <p className="error-message">*{errorMsg}</p>} */}
      </form>
    </div>
    )
  }
  
}
  

  
export default Login