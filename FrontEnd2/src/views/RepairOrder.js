import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import axios from 'axios'
import firebaseapp from '../utils/initfirebase'
const uniqueId = Math.floor(Math.random() * 100000) + 1;
const RepairOrder = () => {

    const location = useLocation()
    const data2 = location.state
    const [mechanicNotes, setMechanicNotes] = useState("")
    const [recommendedServices, setRecommendedServices] = useState("")
    const navigate = useNavigate()
    const [data, setData] = React.useState({});
    const agreeRef = useRef();
    // console.log(data)
    useEffect(() => {
        //const db = getFirestore(firebaseapp);
        const serializedObj = location.state?.obj;
        const data = JSON.parse(serializedObj);
        //const docRef = doc(db, "customers", id);
        const getData = async () => {
            
            setData(data)
        }
        getData()
    }, [])
    const date = new Date();
    const handleClick = async () => {

        // const db = getFirestore(firebaseapp);
        // data.Orders[ind] = {
        //     ...data.Orders[ind],
        //     mechanicNotes,
        //     recommendedServices
        // }
        // try {
        //     await setDoc(doc(db, "customers", data.Id), data)
           
        // }
        // catch (e) {
        //     console.log("Some Error Occured", e)
        // }

        data.mechanicNotes = mechanicNotes
        data.agree = agreeRef.current.checked
        data.recommendedServices = recommendedServices
        data.invoiceNumber = Math.floor(Math.random() * 100000) + 1
    
        const postData = {
            order: data,
          };
        console.log(data)
        // const response = await axios.post("http://localhost:4000/saveRepairOrder", postData)
        navigate('/CreateInvoice', { state: { obj: JSON.stringify(data) } })

    }
// console.log(data)
   


    return (

        <div className="max-w-5xl mx-auto py-16 bg-white">
            <article className="overflow-hidden">
                <div className="bg-[white] rounded-b-md">
                    <div className="p-9">
                        <div className="space-y-6 text-slate-700">
                            <img className="object-cover h-12" src={logo} alt="" />

                            <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                                Bimmers R Us
                            </p>
                        </div>
                    </div>
                    <div className="p-9">
                        <div className="flex w-full">
                            <div className="grid grid-cols-4 gap-12">
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">
                                        Invoice Detail:
                                    </p>
                                    <p>{data.CUSTOMER_FIRST_NAME} {data.CUSTOMER_LAST_NAME}</p>
                                    <p>{data.CUSTOMER_STREET} {data.CUSTOMER_CITY} {data.CUSTOMER_STATE}</p>
                                    <p>{data.CUSTOMER_ZIPCODE}</p>
                                    <p>{data.CUSTOMER_PRIMARY_PHONE}</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">Billed To</p>
                                    <p>Bimmers R Us</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">Invoice Number</p>
                                    <p>{data.invoice_number}</p>

                                    <p className="mt-2 text-sm font-normal text-slate-700">
                                        Date of Issue
                                    </p>
                                    <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto md:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 md:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full text-center text-sm font-light">
                                        <thead
                                            className="border-b bg-neutral-800 font-small text-white dark:border-neutral-500 dark:bg-neutral-900">
                                            <tr>
                                                <th scope="col" className=" px-6 py-4">Color</th>
                                                <th scope="col" className=" px-6 py-4">Year</th>
                                                <th scope="col" className=" px-6 py-4">Make</th>
                                                <th scope="col" className=" px-6 py-4">Model</th>
                                                <th scope="col" className=" px-6 py-4">Licence</th>
                                                <th scope="col" className=" px-6 py-4">Vin</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap  px-6 py-4">{data.COLOR}</td>
                                                <td className="whitespace-nowrap  px-6 py-4">{data.PRODUCTION_DATE}</td>
                                                <td className="whitespace-nowrap  px-6 py-4">{data.MAKE}</td>
                                                <td className="whitespace-nowrap  px-6 py-4">{data.MODEL}</td>
                                                <td className="whitespace-nowrap  px-6 py-4">{data.LICENSE_PLATE}</td>
                                                <td className="whitespace-nowrap  px-6 py-4">{data.VIN}</td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto md:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 md:px-8">
                                <div className="overflow-hidden flex gap-5">
                            Repair Descriptions:
                            <ul>
                        {data.descriptions && data.descriptions.map((description, index) => (
                            <li key={index}>{description.description}</li>
                        ))}
                        </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="overflow-x-auto md:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 md:px-8">
                                <div className="overflow-hidden flex gap-5">
                                    <div className='p-1'>
                                        <div className='text-md font-normal text-slate-700 mb-2'>Mechanic Notes:</div>
                                        <textarea className='border rounded focus:border-blue-500 p-2' cols={50} rows={8} onChange={(e)=>setMechanicNotes(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col gap-3 text-md font-normal text-slate-700'>
                                        <div className='text-slate-800 flex gap-2 items-center'>Recommended services:  <input ref={agreeRef} type="checkbox" name="agree" id="agree" /> <label htmlFor="agree">I agree</label> </div>
                                        <textarea className='border rounded focus:border-blue-500 p-2' cols={50} rows={8} onChange={(e)=>setRecommendedServices(e.target.value)} />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>








                    <div className='flex justify-end items-end px-7'>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick} >
                            Go to Invoice
                        </button>

                    </div>



                    <div className="mt-48 p-9">
                        <div className="border-t pt-9 border-slate-200">
                            <div className="text-sm font-light text-slate-700">
                                <p>
                                   Display a message
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>

    );


}

export default RepairOrder