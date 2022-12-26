import {createContext,useState} from "react"

const EventsCards = createContext();

const EventContext = ({children}) => {
    const [seats,setSeats] = useState([]);
    const [occupied,setOccupied] = useState([]);
    const [ticket,setTicket] = useState([]);
    
    return (
        <EventsCards.Provider value={{seats,setSeats,occupied,setOccupied,ticket,setTicket}}>
            {children}
        </EventsCards.Provider>
    )
}

export {EventsCards,EventContext};