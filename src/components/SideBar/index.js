import  { useState } from 'react';
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {Link,withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BiTransferAlt} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'
import {CgProfile} from 'react-icons/cg'
import "./index.css"

const availableComponents = {
  dashboard: "Dashboard",
  profile: "Profile",
  transactions: "Transactions"
}

const id = Cookies.get("user_id")
const role = id==="3"? "admin": "user"
const transactions = role==="admin" ? "All Transactions" : "Transactions"

const SideBar = props =>{
  const [activeComp, setActiveComp] = useState(availableComponents.dashboard);

  const onDashBoardClicked  =() =>{
    setActiveComp(availableComponents.dashboard)
  }

  const onTransClicked  =() =>{
    setActiveComp(availableComponents.transactions)
  }

  const onLoggingOut = () =>{ 
    const {history} = props
    Cookies.remove('user_id')
    history.replace('/login')
  }

  const onProfileClicked =() =>{
    setActiveComp(availableComponents.profile)
  }

  const onLogoClicked = () =>{
    setActiveComp(availableComponents.dashboard)
  }

  const dashLink = activeComp==="Dashboard"? "active" : "link-cont"
  const transactionsLink = activeComp==="Transactions"? "active" : "link-cont"
  const profileLink = activeComp==="Profile"? "active" : "link-cont"
  
  return(
  <div className='sidebar-container'>
    <div className='side-cont'>
    <Link className='link' onClick={onLogoClicked} to="/">
      <div className='logo-container'>
        <img src="https://res.cloudinary.com/dyal335uz/image/upload/v1690613470/Group_rzu5bl.svg" alt="websiteLogo" className='logo' />
        <p className='website-name'>Money <span className='money-span'>Matters</span></p>
      </div>
    </Link>
    
      <div className='routing-cont'>
        <Link  to="/" onClick={onDashBoardClicked} className={dashLink}>
          <AiFillHome size={25} className="route-img" />
          <p className='route-name'>Dashboard</p>
        </Link>
        <Link  to="/transactions" onClick={onTransClicked} className={transactionsLink}>
          <BiTransferAlt size={25} className="route-img" />
          <p className='route-name'>{transactions}</p>
        </Link>
        <Link  to="/profile" onClick={onProfileClicked} className={profileLink}>
          <CgProfile size={25} className="route-img" />
          <p className='route-name'>Profile</p>
        </Link>
      </div>
      
      
    </div>
    <div className='user-log-cont'>
        <img src="https://res.cloudinary.com/dyal335uz/image/upload/v1690826081/Avatar_xl51tv.jpg" alt="profile" className='proile' />
        <div className='name-det'>
          <p className='email-side'>Rhye</p>
          <p className='email-side'>Olivia@gmail.com</p>
        </div>
  
                  <Popup
                    modal
                    trigger={<FiLogOut size={20} color='blue' />}
                  >
                    {close => (
                      <div className='pop-up-cont'>
                        <div className='inner-pop-cont'>
                          <FiLogOut size={20} className='logout-icon' />
                          <div className='matter-cont'>
                            <h1 className='pop-head'>Are you sure, you want to logout?</h1>
                            <p className='pop-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed </p>
                          </div>
                        </div>
                        <div className='btns-cont'>
                        <button className='trigger-button' onClick={onLoggingOut}>
                            Yes,Logout
                          </button>
                          <button 
                            type="button"
                            className="trigger-button"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          
                        </div>
                      </div>
                    )}
                  </Popup>

      </div>
  </div>
  )
}
export default withRouter(SideBar)