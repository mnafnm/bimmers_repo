import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

function Invoices(  ) {
  const location = useLocation()
  const data = location.state
  console.log(data)
  
  const date = new Date();
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
                  <p>{data.uniqueId}</p  >

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
                        <th scope="col" class=" px-6 py-4">Colour</th>
                        <th scope="col" class=" px-6 py-4">Year</th>
                        <th scope="col" class=" px-6 py-4">Care Make</th>
                        <th scope="col" class=" px-6 py-4">Car Model</th>
                        <th scope="col" class=" px-6 py-4">Licence</th>
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
                      {data.hours}
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                      $125.00
                    </td>
                    <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {/* TOTAL  */}

                      ${125 *data.hours}
                    </td>
                  </tr>
                  <tr class="border-b border-slate-200">
                    <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div class="font-medium text-slate-700">



                        {data.repair}


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

                      ${125 * data.hours}

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Discount
                    </th>
                    <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      
                      ${data.discount}

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Tax
                    </th>

                    <td class="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      
                      ${data.tax}

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                      Total
                    </th>

                    <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                      ${125 * data.hours - data.discount + data.tax}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>


          <div class="mt-48 p-9">
            <div class="border-t pt-9 border-slate-200">
              <div class="text-sm font-light text-slate-700">
                <p>
                  Payment terms are 14 days. Please be aware that according to the
                  Late Payment of Unwrapped Debts Act 0000, freelancers are
                  entitled to claim a 00.00 late fee upon non-payment of debts
                  after this time, at which point a new invoice will be submitted
                  with the addition of this fee. If payment of the revised invoice
                  is not received within a further 14 days, additional interest
                  will be charged to the overdue account and a statutory rate of
                  8% plus Bank of England base of 0.5%, totalling 8.5%. Parties
                  cannot contract out of the Act’s provisions.
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