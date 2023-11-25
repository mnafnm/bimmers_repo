import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

import firebaseapp from '../utils/initfirebase'
const uniqueId = Math.random().toString(36).substr(2, 9);
const CreateInvoice = () => {

  const location = useLocation()
  const data = location.state

  const [repair, setRepair] = useState('')
  const [hours, setHours] = useState(0)
  const [discount, setDiscount] = useState(0)
  const navigate = useNavigate()

  const date = new Date();
  const handleClick = async () => {
    
    const db = getFirestore(firebaseapp);
    const price = 125 * hours - discount
    const ind = new URLSearchParams(window.location.search).get('ind')
    data.Orders[ind] = {
      ...data.Orders[ind],
      Repair: repair,
      Hours: hours,
      Price: price,
      Discount: discount,
      Total: price,
      Date: date
    }
    try{
      await setDoc(doc(db, "customers", data.Id), data)
      navigate(`/Invoices?ind=${ind}`, {state : {...data, repair, hours, discount, uniqueId, date}})
    }
    catch(e){
      console.log("Some Error Occured", e)
    }
    
  }

  console.log(data)
  console.log(hours)

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






          <div class="p-9">
            <div class="flex flex-col mx-0 mt-8">
              <table class="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                      Required Service/Repair Action
                    </th>
                    <th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                      Labour Hours
                    </th>
                    <th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                      Rate
                    </th>
                    <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-slate-200">
                    <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div class="font-medium text-slate-700">{data.Description1}</div>
                      <div class="font-medium text-slate-700">{data.Description2}</div>
                      <div class="font-medium text-slate-700">{data.Description3}</div>
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-right sm:table-cell">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => { var val = parseFloat(e.target.value); if (!isNaN(val)) setHours(val) }}
                      />
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                      $125.00
                    </td>
                    <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {/* TOTAL  */}

                      ${125 * hours}
                    </td>
                  </tr>
                  <tr class="border-b border-slate-200">
                    <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div class="font-medium text-slate-700">



                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          className="w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => { setRepair(e.target.value) }}
                        />


                      </div>

                    </td>

                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Subtotal
                    </th>
                    <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      ${125 * hours}

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Discount
                    </th>
                    <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => { var val = parseFloat(e.target.value); if (!isNaN(val)) setDiscount(val) }}
                      />

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                      Total
                    </th>

                    <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                      ${125 * hours - discount}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

<div className='flex justify-end items-end px-7'>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick} >
  Submit Invoice
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

export default CreateInvoice