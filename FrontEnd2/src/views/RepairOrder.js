import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

import firebaseapp from '../utils/initfirebase'
const uniqueId = Math.random().toString(36).substr(2, 9);
const RepairOrder = () => {

    const location = useLocation()
    const data = location.state
    const [mechanicNotes, setMechanicNotes] = useState("")
    const [recommendedServices, setRecommendedServices] = useState([])
    const navigate = useNavigate()

    const ind = new URLSearchParams(window.location.search).get('ind')
    const date = new Date();
    const handleClick = async () => {

        const db = getFirestore(firebaseapp);
        data.Orders[ind] = {
            ...data.Orders[ind],
            mechanicNotes,
            recommendedServices
        }
        try {
            await setDoc(doc(db, "customers", data.Id), data)
            navigate(`/CreateInvoice?ind=${ind}`, { state: { ...data,  } })
        }
        catch (e) {
            console.log("Some Error Occured", e)
        }

    }

    console.log(mechanicNotes)


    return (

        <div class="max-w-5xl mx-auto py-16 bg-white">
            <article class="overflow-hidden">
                <div class="bg-[white] rounded-b-md">
                    <div class="p-9">
                        <div class="space-y-6 text-slate-700">
                            <img class="object-cover h-12" src={logo} alt="" />

                            <p class="text-xl font-extrabold tracking-tight uppercase font-body">
                                Bimmers R Us
                            </p>
                        </div>
                    </div>
                    <div class="p-9">
                        <div class="flex w-full">
                            <div class="grid grid-cols-4 gap-12">
                                <div class="text-sm font-light text-slate-500">
                                    <p class="text-sm font-normal text-slate-700">
                                        Invoice Detail:
                                    </p>
                                    <p>{data.CusFname} {data.CusLname}</p>
                                    <p>{data.Street} {data.City} {data.StateName}</p>
                                    <p>{data.ZipCode}</p>
                                    <p>{data.PhoneNum}</p>
                                </div>
                                <div class="text-sm font-light text-slate-500">
                                    <p class="text-sm font-normal text-slate-700">Billed To</p>
                                    <p>Bimmers R Us</p>
                                </div>
                                <div class="text-sm font-light text-slate-500">
                                    <p class="text-sm font-normal text-slate-700">Invoice Number</p>
                                    <p>{uniqueId}</p>

                                    <p class="mt-2 text-sm font-normal text-slate-700">
                                        Date of Issue
                                    </p>
                                    <p>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="overflow-x-auto md:-mx-8">
                            <div class="inline-block min-w-full py-2 sm:px-6 md:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-center text-sm font-light">
                                        <thead
                                            class="border-b bg-neutral-800 font-small text-white dark:border-neutral-500 dark:bg-neutral-900">
                                            <tr>
                                                <th scope="col" class=" px-6 py-4">Color</th>
                                                <th scope="col" class=" px-6 py-4">Year</th>
                                                <th scope="col" class=" px-6 py-4">Make</th>
                                                <th scope="col" class=" px-6 py-4">Model</th>
                                                <th scope="col" class=" px-6 py-4">Licence</th>
                                                <th scope="col" class=" px-6 py-4">Mileage</th>
                                                <th scope="col" class=" px-6 py-4">Vin</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-b dark:border-neutral-500">
                                                <td class="whitespace-nowrap  px-6 py-4">{data.CarColor}</td>
                                                <td class="whitespace-nowrap  px-6 py-4">{data.CarYear}</td>
                                                <td class="whitespace-nowrap  px-6 py-4">{data.CarMake}</td>
                                                <td class="whitespace-nowrap  px-6 py-4">{data.CarModel}</td>
                                                <td class="whitespace-nowrap  px-6 py-4">{data.PlateNum}</td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <div class="overflow-x-auto md:-mx-8">
                            <div class="inline-block min-w-full py-2 sm:px-6 md:px-8">
                                <div class="overflow-hidden flex gap-5">
                                    <div className='p-1'>
                                        <div className='text-md font-normal text-slate-700 mb-2'>Mechanic Notes:</div>
                                        <textarea className='border rounded focus:border-blue-500 p-2' cols={50} rows={8} onChange={(e)=>setMechanicNotes(e.target.value)} />
                                    </div>
                                    <div className='flex flex-col gap-3 text-md font-normal text-slate-700'>
                                        <div className='text-slate-800'>Recommended services:</div>
                                        <textarea className='border rounded focus:border-blue-500 p-2' cols={50} rows={8} onChange={(e)=>setMechanicNotes(e.target.value)} />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>








                    <div className='flex justify-end items-end px-7'>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick} >
                            Go to Invoice
                        </button>

                    </div>



                    <div class="mt-48 p-9">
                        <div class="border-t pt-9 border-slate-200">
                            <div class="text-sm font-light text-slate-700">
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