import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/logo.png'
const uniqueId = Math.random().toString(36).substr(2, 9);
const EditOrders = () => {


    // get url params
  const params = useParams();
  const id = params.id;
  console.log(id)
    
  const inputValue = useRef("")
  const [repair, setRepair] = useState([])

  const [order,setOrder] = useState({})
  const navigate = useNavigate()

  const date = new Date();
  useEffect(()=>{
    const getData = async () => {
      const response = await fetch(`http://localhost:4000/orders/${id}`)
      const data = await response.json()
      console.log(data)
      setOrder(data[0])
      setRepair(JSON.parse(data[0].repair_items))
    }
    getData()
  },[id]) 
  const addRepair = async () => {
    const id = inputValue.current.value
    if (id === "") {
      alert("Please enter a valid part id")
      return;
    }
    // fetch inventory details
    const response = await fetch(`http://localhost:4000/inventory/${id}`)
    const data = await response.json()
    if (data.length === 0) {
      alert("No such part found")
      return;
    }
    // add quantity to inventory details with default value 1
    // data[0].quantity = 1;
    // check if part already exists in repair array
    const exists = repair.find((item) => item.OEM_PART_ID === id)
    if (exists) {
      alert("Part already exists in repair")
      return;
    }

    // add inventory details to repair array
    setRepair([...repair, ...data])
    // clear input field
    inputValue.current.value = ""


  }

  const removeFromRepair = (id) => {
    const newRepair = repair.filter((item) => item.OEM_PART_ID !== id)
    setRepair(newRepair)
  }

  const setQuantity = (id, value) => {
    const newRepair = repair.map((item) => {
      if (item.OEM_PART_ID === id) {
        return {
          ...item,
          quantity: value
        }
      }
      return item
    })
    setRepair(newRepair)
  }

  const handleSetHours = (val) => {
    if (val === "") val = 0
    setOrder({
      ...order,
      hour: parseInt(val),
    })
  }

  const setTowingcharge = (val) => {
    if (val === "") val = 0
    setOrder({
      ...order,
      towing_charge: Number(val),
      total: Number(order.subtotal) +Number(val) - Number(order.discount)
    })
  }
  const setDiscount = (val) => {
    if (val === "") val = 0
    setOrder({
      ...order,
      discount: val,
      total : parseFloat(Number(order.subtotal) + Number(order.towing_charge) - Number(val)).toFixed(2)
    })
  }
  useEffect(()=>{
    setOrder({
      ...order,
      subtotal: parseFloat((order.hour * order.rate)  + repair.reduce((acc, item) => acc + item.OEM_LIST_PRICE * item.quantity, 0)).toFixed(2),
      total : parseFloat((order.hour * order.rate) + order.towing_charge + repair.reduce((acc, item) => acc + item.OEM_LIST_PRICE * item.quantity, 0) - order.discount).toFixed(2)
    })

  },[repair,order.hour])

  const UpdateOrders = async () => {

    // create a object with id , name and quantity of each repair
    const repairItems = repair.map((item) => {
      return {
        OEM_PART_ID: item.OEM_PART_ID,
        OEM_PART_NAME: item.OEM_PART_NAME,
        quantity: item.quantity,
        OEM_LIST_PRICE : item.OEM_LIST_PRICE

      }
    })
    const orderData = {
      ...order,
      CUSTOMER_ID: order.CUSTOMER_ID,
      required_services: order.required_services,
      repair_items:repairItems
    }
    // patch request to update order
    const response = await fetch(`http://localhost:4000/orders/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    const data = await response.json()
    if (data.affectedRows === 1) {
        alert("Order updated successfully")
        navigate("/Orders")
    }
  }

  // console.log(data)
  // console.log(hours)
  console.log("Repair ", order)
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
                  <p>{order.CUSTOMER_FIRST_NAME} {order.CUSTOMER_LAST_NAME}</p>
                  <p>{order.CUSTOMER_STREET} {order.CUSTOMER_CITY} {order.CUSTOMER_STATE}</p>
                  <p>{order.CUSTOMER_ZIPCODE}</p>
                  <p>{order.CUSTOMER_PRIMARY_PHONE}</p>
                </div>
                <div class="text-sm font-light text-slate-500">
                  <p class="text-sm font-normal text-slate-700">Billed To</p>
                  <p>Bimmers R Us</p>
                </div>
                <div class="text-sm font-light text-slate-500">
                  <p class="text-sm font-normal text-slate-700">Invoice Number</p>
                  <p>{order?.invoice_number}</p>

                  <p class="mt-2 text-sm font-normal text-slate-700">
                    Date of Issue
                  </p>
                  <p>{new Date(order.order_date).toDateString()}</p>
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
                        <th scope="col" class=" px-6 py-4">Plate Number</th>
                        {/* <th scope="col" class=" px-6 py-4">Mileage</th> */}
                        <th scope="col" class=" px-6 py-4">Vin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b dark:border-neutral-500">
                        <td class="whitespace-nowrap  px-6 py-4">{order.COLOR}</td>
                        <td class="whitespace-nowrap  px-6 py-4">{order.PRODUCTION_DATE}</td>
                        <td class="whitespace-nowrap  px-6 py-4">{order.MAKE}</td>
                        <td class="whitespace-nowrap  px-6 py-4">{order.MODEL}</td>
                        <td class="whitespace-nowrap  px-6 py-4">{order.LICENSE_PLATE}</td>
                        <td class="whitespace-nowrap  px-6 py-4">{order.VIN}</td>
                      </tr>


                    </tbody>

                    <tfoot>
                    <tr>
                      <td>
                      <div className='pt-5'>
                        <strong>Mechanics Note</strong>
                        <div dangerouslySetInnerHTML={{ __html: order.mechanicNotes }} />
                        {/* {data.mechanicNotes} */}
                      </div>
                      </td>
                      <td>
                      {order.recommendedServices && 
                        <>
                         <div className='pt-5'>
                         <strong>Recommended Services</strong>
                        <div dangerouslySetInnerHTML={{ __html: order.recommendedServices }} />
                        {/* {data.mechanicNotes} */}
                      </div>
                        </>
                      }
                      </td>
                    </tr>
                    </tfoot>
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
                      {
                        order.required_services
                        && JSON.parse(order.required_services).map((str, index) => (
                          <p key={index}>{str}</p>
                        ))
                      }
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-right sm:table-cell">
                      <input
                        type="number"
                        min={0}
                        value={order.hour}
                        className="w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {handleSetHours(e.target.value) }}
                      />
                    </td>
                    <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                      $125.00
                    </td>
                    <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                      {/* TOTAL  */}

                      ${order.rate * order.hour}
                    </td>
                  </tr>
                  {
                    repair && repair.map((item, index) => (
                      <tr key={item.OEM_PART_ID} class="border-b border-slate-200">
                        <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0 flex items-center gap-x-2">

                          <span onClick={() => removeFromRepair(item.OEM_PART_ID)} className='text-md font-bold text-red-600 cursor-pointer'>X</span>
                          <div class="font-medium text-slate-700">
                            {item.OEM_PART_ID} - {item.OEM_PART_NAME}
                          </div>

                        </td>
                        <td class="hidden px-3 py-4 text-sm text-right sm:table-cell">
                          Quantity : &nbsp;
                          <input
                            min={1}
                            type="number"
                            className="w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={1}
                            value={item.quantity}
                            onChange={(e) => setQuantity(item.OEM_PART_ID, e.target.value)}
                          />
                        </td>
                        <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                          ${item.OEM_LIST_PRICE}
                        </td>
                        <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                          ${parseFloat(item.OEM_LIST_PRICE * item.quantity).toFixed(2)}
                        </td>

                      </tr>
                    ))
                  }
                  <tr class="border-b border-slate-200">
                    <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div class="font-medium text-slate-700 flex items-center gap-2">



                        <input
                          ref={inputValue}
                          type="text"
                          className="w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                        <button onClick={addRepair} type='button' className='shadow btn px-3 py-2 bg-slate-400 text-white rounded-md'>Add</button>


                      </div>

                    </td>

                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row" colSpan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Subtotal
                    </th>
                    <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      ${order.subtotal}

                    </td>
                  </tr>

                  <tr>
                    <th scope="row" colSpan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Towing Charge
                    </th>
                    <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      <input
                        type="number"
                        min={0}
                        value={order.towing_charge}
                        className="w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => { setTowingcharge(e.target.value) }}
                      />

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                      Discount
                    </th>
                    <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">

                      <input
                        type="number"
                        min={0}
                        value={order.discount}
                        className="w-1/4 p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {setDiscount(e.target.value) }}
                      />

                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                      Total
                    </th>

                    <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                      ${order?.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className='flex justify-end items-end px-7'>
            <button onClick={UpdateOrders} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
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

export default EditOrders