import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import firebaseapp from '../utils/initfirebase'
import logo from '../assets/logo.png'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Toast } from '@chakra-ui/react';
const uniqueId = Math.random().toString(36).substr(2, 9);
const NewOrder = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(false)
    const date = new Date();
    const [descriptions, setDescriptions] = React.useState([])
    // console.log(data)
    const [data, setData] = React.useState({});
    const navigate = useNavigate()
    const navigateToRepairOrder = (data) => {
        navigate('/RepairOrder', { state: { obj: JSON.stringify(data) } })

    }
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
    console.log(data)
    const clickHandler = () => {
        setDescriptions([
            ...descriptions,
            ""
        ])
    }
  
    
    const saveHandler = async () => {
        setLoading(true)
        //const db = getFirestore(firebaseapp);
        
        data.descriptions = descriptions
        // try{
        //     await setDoc(doc(db, "customers", data.Id), data, { merge: true })
        //     Toast({
        //         title: "Order Created.",
        //         description: "We've created your order for you.",
        //         status: "success",
        //         duration: 9000,
        //         isClosable: true,
        //     })
        // }
        // catch(e){
        //     console.log(e)
        // }
        navigateToRepairOrder(data)
        setLoading(false)
        // window.print();
      }
    
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
                                    <p>{data.VIN}</p>
                                    <p>{data.LICENSE_PLATE}</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">Billed To</p>
                                    <p>Bimmers R Us</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">Invoice Number</p>
                                    <p>{uniqueId}</p>

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

                    <div className="p-9">
                        <div className="flex flex-col mx-0 mt-8 text-sm font-normal text-slate-700">
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
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.print()}  >
                            Print
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>saveHandler()} >
                            {!loading?"Create repair order":"Loading..."}
                        </button>
                    </div>



                    <div className="mt-48 p-9">
                        <div className="border-t pt-9 border-slate-200">
                            <div className="text-sm font-light text-slate-700">
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