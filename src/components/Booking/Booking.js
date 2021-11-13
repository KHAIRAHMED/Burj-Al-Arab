import React , {useEffect ,useState , useContext} from "react"
import { userContext } from "../../App";

const Booking = ()=>{
    const [isLoggedIn , setLoggedIn] = useContext(userContext)
    const [bookings , setBookings] = useState([])

    useEffect(()=>{
        // Email validation with firebase jwt tokon . if we use it our authentication system more than before . 
        fetch("http://localhost:4000/getData?email="+isLoggedIn.email,{
            method : "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        
        })
        .then(res => res.json())
        .then(result => setBookings(result))
    },[isLoggedIn.email])

    return(
        <div>
            <h1>{bookings.length}</h1>
            {
                bookings.map(book => <li>Name : {book.name} From : {new Date(book.checkIn).toDateString('dd/MM/yyy')} To : {new Date(book.checkOut).toDateString('dd/MM/yyy')}</li>)
            }
        </div>
    );
};

export default Booking;
