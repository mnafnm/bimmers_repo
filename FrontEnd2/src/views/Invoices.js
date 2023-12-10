import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

function Invoices() {
  const location = useLocation()
  const data = location.state
  console.log(data)
  const ind = new URLSearchParams(window.location.search).get('ind')
  const date = new Date();
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
                  <p>{data.CusFname} {data.CusLname}</p>
                  <p>{data.Street} {data.City} {data.StateName}</p>
                  <p>{data.ZipCode}</p>
                  <p>{data.PhoneNum}</p>
                </div>
                <div className="text-sm font-light text-slate-500">
                  <p className="text-sm font-normal text-slate-700">Billed To</p>
                  <p>Bimmers R Us</p>
                </div>
                <div className="text-sm font-light text-slate-500">
                  <p className="text-sm font-normal text-slate-700">Invoice Number</p>
                  <p>{data.uniqueId}</p  >

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
                        <th scope="col" className=" px-6 py-4">License</th>
                        <th scope="col" className=" px-6 py-4">Mileage</th>
                        <th scope="col" className=" px-6 py-4">Vin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap  px-6 py-4">{data.CarColor}</td>
                        <td className="whitespace-nowrap  px-6 py-4">{data.CarYear}</td>
                        <td className="whitespace-nowrap  px-6 py-4">{data.CarMake}</td>
                        <td className="whitespace-nowrap  px-6 py-4">{data.CarModel}</td>
                        <td className="whitespace-nowrap  px-6 py-4">{data.PlateNum}</td>
                      </tr>


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>






          <div className="p-9">
            <div className="flex flex-col mx-0 mt-8">
              <table className="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                      Required Service/Repair Action
                    </th>
                    <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                      Labour Hours
                    </th>
                    <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                      Rate
                    </th>
                    <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      {data.Orders[ind].Descriptions.map((c) => <div className="font-medium text-slate-700">{c}</div>)}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-right sm:table-cell">
                      {data.hours}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                      $125.00
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {/* TOTAL  */}

                      ${125 * data.hours}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div className="font-medium text-slate-700">



                        {data.repair}


                      </div>

                    </td>

                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" colspan="3" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Subtotal
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      ${125 * data.hours}

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="3" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Discount
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">


                      ${data.discount}

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="3" className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                      Total
                    </th>

                    <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                      ${125 * data.hours - data.discount}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.print()}  >
                        Print
                      </button>

                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
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

export default Invoices