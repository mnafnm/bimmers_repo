import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import firebaseapp from '../utils/initfirebase'
import logo from '../assets/logo.png'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Toast } from '@chakra-ui/react';
const uniqueId = Math.random().toString(36).substr(2, 9);
const NewOrder = () => {
    const [loading, setLoading] = React.useState(false)
    const date = new Date();
    const [descriptions, setDescriptions] = React.useState([])
    // console.log(data)
    const [data, setData] = React.useState({});
    const navigate = useNavigate()
    const navigateToRepairOrder = (data, ind) => {
        navigate(`/RepairOrder?ind=${ind}`, { state: data })

    }
    useEffect(() => {
        const db = getFirestore(firebaseapp);
        const id = new URLSearchParams(window.location.search).get('id')
        const docRef = doc(db, "customers", id);
        const getData = async () => {
            const docSnap = await getDoc(docRef);
            setData(docSnap.data())
        }
        getData()
    }, [])
    console.log(data)
    const clickHandler = () => {
        setDescriptions([
            ...descriptions,
            ""
        ])
    }
    
    const saveHandler = async () => {
        setLoading(true)
        const db = getFirestore(firebaseapp);
        data.Orders.push({
            Descriptions: descriptions
        })
        try{
            await setDoc(doc(db, "customers", data.Id), data, { merge: true })
            Toast({
                title: "Order Created.",
                description: "We've created your order for you.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
        }
        catch(e){
            console.log(e)
        }
        navigateToRepairOrder(data, data.Orders.length - 1)
        setLoading(false)
        // window.print();
      }
    
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




                    <div className="relative p-6 flex-auto">
                        <div className="flex-col">
                            {descriptions.length > 0 ? descriptions.map((description, index) => (
                                <div className="flex-col flex gap-2" key={index}>
                                    <div className='flex justify-between'>
                                        <div className="text-left">Order Description {index + 1}:</div>
                                        <div className='bg-slate-500 px-3 py-1 rounded-md text-white hover:bg-slate-700 cursor-pointer' onClick={()=>setDescriptions((prev)=>prev.filter((_, i) => i !== index))}>X</div>
                                    </div>
                                    <textarea className="border-2 rounded-md shadow-sm p-3" value={descriptions[index]} placeholder={`Description #${index + 1}`} onChange={(e) => setDescriptions((prev) => prev.map((c, i) => i == index ? e.target.value : c))} />
                                </div>
                            )) : <div>No Descriptions.</div>}
                            <div className="flex justify-end">
                                <div onClick={clickHandler} className="bg-slate-400 rounded-md cursor-pointer hover:bg-slate-600 py-2 px-4 text-white font-medium w-fit">Add Description</div>
                            </div>
                        </div>
                    </div>

                    <div class="p-9">
                        <div class="flex flex-col mx-0 mt-8 text-sm font-normal text-slate-700">
                            Technician notes:
                            <div className='flex-col gap-10 flex pt-16'>
                                <div className='w-full border-slate-500 border'></div>
                                <div className='w-full border-slate-500 border'></div>
                                <div className='w-full border-slate-500 border'></div>
                                <div className='w-full border-slate-500 border'></div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end items-end px-7 gap-5'>
                        <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.print()}  >
                            Print
                        </button>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>saveHandler()} >
                            {!loading?"Create repair order":"Loading..."}
                        </button>
                    </div>



                    <div class="mt-48 p-9">
                        <div class="border-t pt-9 border-slate-200">
                            <div class="text-sm font-light text-slate-700">
                                <p>
                                I hereby authorize the above repair service to be done along with the necessary material, and hereby grant you/or your employees, permission to operate the car, truck, or vehicle herein described on streets, highways, or elsewhere for the purpose of testing and/or inspection. 
                                An express mechanic's lien is hereby acknowledged an above car, truck or vehicle to secure the number of repairs thereto. You will not be held responsible for loss or damage to vehicle or articles left in vehicle in case of fire, theft, accident, or any other cause beyond your control. 
                                In the event legal action is necessary to enforce this contract, I will pay reasonable attorney's fees and court coats.
                                <div>
                                AUTHORIZED BY: X ____________________________________________
                                </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>

    );
}

export default NewOrder