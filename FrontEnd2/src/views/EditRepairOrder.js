import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/logo.png'
import Help from '../components/Help';
const uniqueId = Math.floor(Math.random() * 100000) + 1;
const EditRepairOrder = () => {

        // get url params
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate()
    const [data, setData] = React.useState({});
    const agreeRef = useRef();
    // console.log(data)
    useEffect(()=>{
        const getData = async () => {
          const response = await fetch(`http://localhost:4000/orders/${id}`)
          const data = await response.json()
          console.log(data)
          if(data[0]?.recommendedServices?.length > 0){
            agreeRef.current.checked = true
          }
          setData(data[0])
 
        }
        getData()
      },[id]) 
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

       
        data.agree = agreeRef.current.checked
    
      
    
        const postData = {
            order: data,
          };
        console.log(data)
        // const response = await axios.post("http://localhost:4000/saveRepairOrder", postData)
        navigate(`/Orders/edit/${id}`, { state: { obj: JSON.stringify(data) } })

    }

    const updateRepairData = async () => {
        data.agree = agreeRef.current.checked
        const postData = {
            id: id,
            agree: data.agree,
            mechanicNotes: data.mechanicNotes,
            recommendedServices: data.recommendedServices,
          };
        console.log(postData)
        const response = await fetch(`http://localhost:4000/repair-order/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          })
          const res = await response.json()
          console.log(res)
          if(res.affectedRows > 0){
            navigate(`/Orders/edit/${id}`)
          }
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
                            {data.required_services && data.required_services.map((description, index) => (
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
                                        <textarea className='border rounded focus:border-blue-500 p-2' cols={50} rows={8} onChange={(e)=>setData({
                                            ...data,
                                            mechanicNotes: e.target.value
                                        })} value={data?.mechanicNotes} />
                                    </div>
                                    <div className='flex flex-col gap-3 text-md font-normal text-slate-700'>
                                        <div className='text-slate-800 flex gap-2 items-center'>Recommended services:  <input ref={agreeRef}
                                        type="checkbox" name="agree" id="agree" checked={data.agree} onChange={()=>{setData({
                                            ...data,
                                            agree: !data.agree
                                        })}} /> <label htmlFor="agree">I agree</label> </div>
                                        <textarea value={data?.recommendedServices} className='border rounded focus:border-blue-500 p-2' cols={50} rows={8} onChange={(e)=>setData({
                                            ...data,
                                            recommendedServices: e.target.value
                                        })} />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>








                    <div className='flex justify-end items-end px-7 gap-4'>
                      
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={updateRepairData} >
                            Update & Go to Invoice
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
            <Help link="https://drive.google.com/file/d/1pUwtgtqWZrii_sz_Jn8EFDZ_z-ZN_LGO/view?usp=drive_link"/>
        </div>

    );


}

export default EditRepairOrder