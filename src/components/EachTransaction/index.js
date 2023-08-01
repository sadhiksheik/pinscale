import { format } from 'date-fns';
import {AiTwotoneEdit,AiTwotoneDelete} from "react-icons/ai"
import "./index.css"

const EachTransaction = props =>{
  const {details,role} = props
  const {amount,category,date,transaction_name,type} = details
  const money = type==="credit"? "+$" : "-$"

  const newDate = new Date(date);
  const formattedDate = format(newDate, 'dd MMM, hh:mm aa');
  
  
  const icon = type==="credit" ? "https://res.cloudinary.com/dyal335uz/image/upload/v1690798579/Group_326_jdqqjd.svg" : "https://res.cloudinary.com/dyal335uz/image/upload/v1690798526/Group_328_pdwkkz.svg"

  return(
    <li className="trans-li-ele">
      <img src={icon} alt="type" className="type-icon" />
      <p className="name">{transaction_name}</p>
      <p className="category" >{category}</p>
      <p className='category'>{formattedDate}</p>
      <p className='money'>{money}{amount}</p>
     {role==="user"&&( <AiTwotoneEdit size={20} color="blue" />)}
     {role==="user"&&(<AiTwotoneDelete size={20} color ="#FE5C73" />)}
    </li>
  )
}
export default EachTransaction