"use client"

import React, { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [transactionFailed,settransactionFailed]=useState(false)
    const handleSend = async () => {
        try {
            // Perform peer-to-peer transfer
            await p2pTransfer(number, Number(amount) * 100);
            // If the transfer is successful, set transactionSuccess to true
            setTransactionSuccess(true);
            settransactionFailed(false)
        } catch (e) {
            // Handle error if the transfer fails
            console.log("Transaction failed");
            settransactionFailed(true)
            setTransactionSuccess(false)
            
            // Optionally, you can also set a state to handle error messages
        }
    };
    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                            setNumber(value);
                        }} />
                        <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                            setAmount(value);
                        }} />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                        {transactionSuccess && (
                            <div className="text-green-600 font-bold text-center pt-4">
                                Transaction successful!
                            </div>
                        )}
                        {transactionFailed && (
                            <div className="text-red-600 font-bold text-center pt-4">
                                Transaction Failed
                            </div>
                        )}
                    </div>
                </Card>
            </Center>
        </div>
    );
}
