const fetch = require('node-fetch');
const CHECK_DELAY=30*1e3
const {from,to,days,month,checkPeriod}=require('./dates')
let idays=[]

if(checkPeriod && +from && +to){
	let i=+from
	while(i<=+to){idays.push(i);i++}
}else if(days && days.length){
	idays=[...days]
}



check=()=>{
console.log(`\nchecking dates`)
	idays.forEach((day,idx)=>{
	
	setTimeout(()=>	fetch(`https://www.webassessor.com/tda.do?tile=populateTimes&override=false&id=&timeZone=Africa/Douala&m=${month-1}&d=${day}&y=2020&containingPage=dateTimeSelection&regId=8499654`, {
  			"headers": {    
     			"cookie": "KRYTERIONID=AEAA132DA0CEFBC41DD4E1BD11718E8BEC66616636500CD4E7B454E41B82988B.PRD1-WATTA01"
  			}
		})
 		.then(res => res.text())
    	.then(body => {
    		console.log(`\nDisponibility for `+day)
    		for( let [,time] of body.matchAll(/value="(\d+:\d+)"/g)){
    			
    			console.log(time)
    		}
    		checkAgain(idx+1,idays.length)
    	}), 2e3)
   }) 	
}

checkAgain=(position,total)=>position==total?setTimeout(check,CHECK_DELAY)&&console.log(`\nWill check again in a moment`):null

check()
