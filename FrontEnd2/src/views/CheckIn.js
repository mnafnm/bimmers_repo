/*export default function About() {
    return <h1>Check in</h1>
  }*/
import React, { useState } from 'react'
import firebaseapp from '../utils/initfirebase'
import { getFirestore, addDoc, collection, setDoc, doc } from "firebase/firestore";
// get uuid
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Help from '../components/Help';

const CheckIn = () => {

  const [customerInfo, setCustomerInfo] = useState({
    CUSTOMER_LAST_NAME: '',
    CUSTOMER_FIRST_NAME: '',
    CUSTOMER_COMPANY_NAME: '',
    CUSTOMER_STREET: '',
    CUSTOMER_CITY: '',
    CUSTOMER_STATE: '',
    CUSTOMER_ZIPCODE: '',
    CUSTOMER_PRIMARY_PHONE: '',
    ALTERNATE_PHONE: '',
    WORK_PHONE: '',
    EXTENSION: '',
    ADDITIONAL_CONTACT: '',
    ADDITIONAL_CONTACT_PHONE: '',
    CUSTOMER_EMAIL: '',
    TAX_EXEMPT_NOTES: '',
    CUSTOMER_NOTES: '',
  })

  const [vehicleInfo, setVehicleInfo] = useState({
    VIN: '',
    CUSTOMER_ID: '',
    MAKE: '',
    MODEL: '',
    PRODUCTION_DATE: '',
    COLOR: '',
    LICENSE_PLATE: '',
    RADIO_CODE: '',
  })

  const [loading, setLoading] = useState(false)
  //console.log(data)
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
console.log(customerInfo)
console.log(vehicleInfo)


const postData = {
  customerInfo: customerInfo,
  vehicleInfo: vehicleInfo
};




    const response = await axios.post("http://localhost:4000/registerCustomer",postData)
    //const db = getFirestore(firebaseapp)
    //setData({...data, Id: uuidv4()})
    // try{
    //   await setDoc(doc(db, "customers", data.Id), data)
    //   console.log("Document written with ID: ")
    // }
    // catch(e) {
    //   console.error("Error adding document: ", e);
    // }
    if(response.data.message == "")
    {
      toast.success('Customer Added')
      
      window.location.reload()
    }
    else{
      toast.error('Unable to add customer')
    }
    
    setLoading(false)
  }



  return (
    <form onSubmit={(e)=>handleSubmit(e)} className='w-full items-center flex-col justify-center py-10'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">New Customer</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Hello there! Please fill out the form below to register a new customer
          </p>

        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Customer Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Enter customer's details here</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCustomerInfo({ ...customerInfo, CUSTOMER_FIRST_NAME: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCustomerInfo({ ...customerInfo, CUSTOMER_LAST_NAME: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  required
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCustomerInfo({ ...customerInfo, CUSTOMER_PRIMARY_PHONE: e.target.value })}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCustomerInfo({ ...customerInfo, CUSTOMER_STREET: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCustomerInfo({ ...customerInfo, CUSTOMER_CITY: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCustomerInfo({ ...customerInfo, CUSTOMER_STATE: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setCustomerInfo({ ...customerInfo, CUSTOMER_ZIPCODE: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Vehicle information</h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            Please provide the following information about your vehicle.
          </p> */}

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="car-make" className="block text-sm font-medium leading-6 text-gray-900">
              VIN
              </label>
              <div className="mt-2">
                <input
                  maxlength="7"
                  required
                  type="text"
                  name="vin"
                  id="vin"
                  autoComplete="vin"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, VIN: e.target.value })}
                />
              </div>
            </div>
            </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="car-make" className="block text-sm font-medium leading-6 text-gray-900">
                Car Make
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="car-make"
                  id="car-make"
                  autoComplete="car-make"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, MAKE: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="car-model" className="block text-sm font-medium leading-6 text-gray-900">
                Car Model
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="car-model"
                  id="car-model"
                  autoComplete="family-name"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, MODEL: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="car-color" className="block text-sm font-medium leading-6 text-gray-900">
                Car color
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="car-color"
                  id="car-color"
                  autoComplete="address-level2"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, COLOR: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="plate-number" className="block text-sm font-medium leading-6 text-gray-900">
                Plate Number
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  name="plate-number"
                  id="plate-number"
                  autoComplete="address-level1"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, LICENSE_PLATE: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="car-year" className="block text-sm font-medium leading-6 text-gray-900">
                Car year
              </label>
              <div className="mt-2">
                <input
                  required
                  type="number"
                  name="car-year"
                  id="car-year"
                  autoComplete="car-year"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setVehicleInfo({ ...vehicleInfo, PRODUCTION_DATE: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"

          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? 'loading' : 'Save'}
        </button>
      </div>
      <Help link="#"/>
    </form>
  );
}

export default CheckIn
