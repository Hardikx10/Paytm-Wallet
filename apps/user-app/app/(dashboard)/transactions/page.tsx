import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"

import { Card } from "@repo/ui/card"

export default async function() {
    const p2pTransactions=await getP2Pdetails()
    const session=await getServerSession(authOptions)
    return (
        <div className="w-screen">
    <Card title="Recent Transactions">
    <div className="pt-2">
        {p2pTransactions.reverse().map((t) => (<div className="flex justify-between border-b border-gray-300">

     
            <div>
                <div className="text-sm pt-2">
                    {t.fromUserId==session.user?.id ? 'Sent' : 'Received'}
                </div>
                <div className="text-slate-600 text-xs">
                    {t.timestamp.toDateString()}
                </div>
                <div className="flex items-center my-4">
                    
                </div>
            </div>
    
            <div className="flex flex-col justify-center text-sm">

                {/* {t.fromUserId==session.user?.id ? {toUserName(t.toUserId)} : {FromUserName( t.fromUserId)}} */}
                    {t.fromUserId==session.user?.id ? '   to   ':'   from   '}

                    {t.fromUserId==session.user?.id ? toUserName(t.toUserId) : FromUserName(t.fromUserId)}
            </div>
            <div className="flex flex-col justify-center">
                {t.fromUserId==session.user?.id ? '-' : '+'} Rs {t.amount / 100}
            </div>
           
               
        </div>)
    )
    }
    
    </div>
</Card>
</div>)

        
}
async function getP2Pdetails() {
    const session=await getServerSession(authOptions)
    const p2p=await prisma.p2pTransfer.findMany({
        where:{
            OR:[{
                fromUserId:Number(session.user?.id) 
            },{
                toUserId:Number(session.user?.id)
            }]
        }
    })
    return p2p.map(p => ({
        amount:p.amount ,
        fromUserId:p.fromUserId,
        toUserId:p.toUserId,
        timestamp:p.timestamp
    }))   
}
async function FromUserName(userid:number) {
    const user=await prisma.user.findFirst({
        where:{
            id:userid
        }
    })
    return user?.name
    
}
async function toUserName(userid:number) {
    const user=await prisma.user.findFirst({
        where:{
            id:userid
        }
    })
    return user?.name
}