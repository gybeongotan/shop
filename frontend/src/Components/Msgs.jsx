import axios from "axios"

const Msgs = ()=>{
    axios.get('http://localhost:8000/api/inbox').then(console.log).catch(console.error)
    return (<div>MSGS</div>)
}

export default Msgs