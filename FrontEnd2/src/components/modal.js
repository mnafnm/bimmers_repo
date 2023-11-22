import React, { useEffect } from "react";

export default function Modal({ data, saveHandler, loading }) {
  const [showModal, setShowModal] = React.useState(false);
  const [descriptions, setDescriptions] = React.useState([])
  // console.log(data)
  useEffect(() => {
    setDescriptions(data.Descriptions)
  }, [data])
  const clickHandler = () => {
    setDescriptions([
      ...descriptions,
      ""
    ])
  }
  console.log(descriptions)
 
  

  return (
    <>
      <button
        className="bg-transparent hover:bg-black text-black-700 font-semibold hover:text-white py-2 px-4 border border-black-500 hover:border-transparent rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Check Orders
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto w-[80%] md:w-[40%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    Orders
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-70 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-70 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex-col">
                    {descriptions.length>0 ? descriptions.map((description, index) => (
                      <div className="flex-col flex gap-2" key={index}>
                        <div className="text-left">Order {index+1} Description:</div>
                        <textarea className="border-2 rounded-md shadow-sm p-3" value={descriptions[index]} placeholder="Description #1" onChange={(e)=>setDescriptions((prev)=>prev.map((c, i)=>i==index ? e.target.value : c))}  />
                    </div>
                    )) : <div>No orders yet.</div>}
                    <div className="flex justify-end">
                      <div onClick={clickHandler} className="bg-slate-400 rounded-md cursor-pointer hover:bg-slate-600 py-2 px-4 text-white font-medium w-fit">Add Order</div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => saveHandler(data.Id, descriptions, data)}
                  >
                    Save
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
