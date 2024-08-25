import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { log, time } from "console"

export default async function() {
    const session = await getServerSession(authOptions)
    const Todaydate=new Date()
    let istDateString = Todaydate.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
    let dateArr=istDateString.split(",")
    let timeArr:any=dateArr[1]?.split(" ")
    let hourArr=timeArr[1]?.split(':')
    let hour=Number(hourArr[0]) 
    //console.log(istDateString);
   
    
    const Todaytime=Todaydate.getHours()
    
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            {getTime(hour,timeArr[2])} , {session?.user?.name}
        </div>
    </div>
}

function getTime(hour:number,midday:string) {
  
    if(midday=='PM' && hour>=6){
        return <>
            Good Evening
        </>
    }
    else if(midday=='AM'){
        return <>
            Good Morning
        </>
    }
    else{
        return <>
            Good Afternoon 
        </>
    }
}