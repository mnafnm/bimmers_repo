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


const CheckIn = () => {
  const [data, setData] = useState({
    CusFname: '',
    CusLname: '',
    PhoneNu: '',
    Street: '',
    City:'',
    ZipCode: '',
    StateName: '',
    CarMake: '',
    CarModel:'',
    CarYear:'',
    CarColor: '',
    PlateNum: '',
    Orders: [],
    Id: uuidv4(),
  })
  const [loading, setLoading] = useState(false)
  console.log(data)
  async function handleSubmit() {
    setLoading(true)
    const db = getFirestore(firebaseapp)
    setData({...data, Id: uuidv4()})
    try{
      await setDoc(doc(db, "customers", data.Id), data)
      console.log("Document written with ID: ")
    }
    catch(e) {
      console.error("Error adding document: ", e);
    }
    toast.success('Customer Added')
    setLoading(false)
  }



  return (
    <form className='w-full items-center flex-col justify-center py-10'>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">New Customer</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Hello there! We are excited to have you as a new customer. Please fill out the form below to get started.
          </p>

        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Customer Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Enter your personal details here.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, CusFname: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, CusLname: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, PhoneNu: e.target.value })}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, Street: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, City: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, StateName: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, ZipCode: e.target.value })}
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
                Car Make
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="car-make"
                  id="car-make"
                  autoComplete="car-make"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, CarMake: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="car-model" className="block text-sm font-medium leading-6 text-gray-900">
                Car Model
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="car-model"
                  id="car-model"
                  autoComplete="family-name"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, CarModel: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="car-color" className="block text-sm font-medium leading-6 text-gray-900">
                Car color
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="car-color"
                  id="car-color"
                  autoComplete="address-level2"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, CarColor: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="plate-number" className="block text-sm font-medium leading-6 text-gray-900">
                Plate Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="plate-number"
                  id="plate-number"
                  autoComplete="address-level1"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, PlateNum: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="car-year" className="block text-sm font-medium leading-6 text-gray-900">
                Car year
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="car-year"
                  id="car-year"
                  autoComplete="car-year"
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setData({ ...data, CarYear: e.target.value })}
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
          type="button"
          onClick={()=>handleSubmit()}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? 'loading' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default CheckIn
