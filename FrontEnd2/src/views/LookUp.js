import React, { useEffect, useState } from 'react'
import firebaseapp from '../utils/initfirebase'
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Modal from '../components/modal';
import { useNavigate } from 'react-router-dom';
const columnHelper = createColumnHelper()

const handleDelete = (data) => {
  const db = getFirestore(firebaseapp);
  console.log(data.Id)
  const deleteData = async () => {
    try {
      await deleteDoc(doc(db, "customers", data.Id))
      window.location.reload()
    }
    catch (e) {
      console.log("Some Error Occured", e)
    }
  }
  deleteData()
}

const LookUp = () => {
  const columns = [
    columnHelper.accessor('CusFname', {
      header: () => <span>First Name</span>,
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('CusLname', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor('CarModel', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Car Model</span>,
    }),
    columnHelper.accessor('CarMake', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Car Make</span>,
    }),
    columnHelper.accessor('CarYear', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Car Year</span>,
    }),
    columnHelper.accessor('CarColor', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Car Color</span>,
    }),
    columnHelper.accessor('PlateNum', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Plate Number</span>,
    }),
    columnHelper.accessor('PhoneNu', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Phone Number</span>,
    }),
    columnHelper.accessor('Street', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Street</span>,
    }),
    columnHelper.accessor('City', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>City</span>,
    }),
    columnHelper.accessor('StateName', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>State</span>,
    }),
    columnHelper.accessor('ZipCode', {
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Zip Code</span>,
    }),
    columnHelper.display({
      id: "Description",
      cell: info => 
      <button className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded" onClick={()=>{navigate(`../neworder?id=${info.row.original.Id}`, {state: info.row.original})}}>Create new order</button>,
      header: "Orders",
    }),
    // columnHelper.display({
    //   id: "goto",
    //   cell: info => <button className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded" onClick={() => handleClick(info.row.original)}>Go</button>,
    //   header: "Invoice"
    // }),
    columnHelper.display({
      id: "Delete",
      cell: info => <button className="bg-transparent hover:bg-red-200 text-red-700 font-semibold hover:text-red-500 py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => handleDelete(info.row.original)}>Delete</button>,
      header: "Delete",
    })
  ]
  {/*<Modal data={info.row.original} saveHandler={saveHandler} setData={setData} />*/}

  const navigate = useNavigate()
  const handleClick = (props) => {
    // console.log("Hello", dataToSend)
    toast.success("Data Saved Successfully")
    navigate("/RepairOrder", { state: props })

  }
  const saveHandler = async (id, descriptions, row) => {
    const db = getFirestore(firebaseapp);
    // row.Orders descriptions
    await setDoc(doc(db, "customers", id), row, { merge: true })
    // window.print();
  }


  const [data, setData] = React.useState([])







  const [columnFilters, setColumnFilters] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(loading)
  useEffect(() => {
    setLoading(true)
    const db = getFirestore(firebaseapp);
    const docRef = collection(db, "customers");
    const getData = async () => {
      const data = await getDocs(docRef);
      setData(data.docs.map(doc => doc.data()))
    }
    getData()
    setLoading(false)
  }, [])
  console.log(data)

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: columnFilters,
    },
    onGlobalFilterChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // console.log(data)


  return (
    <>

      <div class="flex flex-col pt-5">

        <div class='w-[40vw] mx-auto'>
          <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div class="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <input
              class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
              value={columnFilters}
              onChange={e => setColumnFilters(e.target.value)}
            />
          </div>
        </div>

        <div class="pt-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-auto max-h-[80vh]">
              <table class="min-w-full text-center text-sm font-light">
                <thead
                  class="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  {/* <tr> */}
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </th>
                      ))}
                    </tr>
                  ))}

                </thead>
                <tbody>
                  {loading ? <div className='text-center p-5 animate-pulse'>loading</div> : table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </>
  )
}

export default LookUp
