import React, { useEffect } from "react";

export default function Modal({ data, saveHandler, loading }) {
  const [showModal, setShowModal] = React.useState(false);
  const [orders, setOrders] = React.useState([])
  // console.log(data)
  useEffect(() => {
    setOrders(data.Orders)
  }, [data])
  const clickHandler = () => {
    setOrders([
      ...orders,
      ""
    ])
  }
  console.log(orders)



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
                  <div className="divide-y-2">
                    {
                      orders.map((order, index) =>
                        <div>
                          <div>
                            Order {index + 1}
                          </div>
                          {/* Date: {order && order.Date.toDate().toLocaleDateString()}
                          {order && order.Date.toDate().toLocaleTimeString()} */}
                          <br/>
                          Repair: {order && order.Repair}
                          <br/>
                          Hours: {order && order.Hours}
                          <br/>
                          Discount: {order && order.Discount}
                          <br/>
                          Tax: {order && order.Tax}
                          <br/>
                          {order && order.Descriptions.map((item, index) => <div>
                            Description {index+1}: {item}
                          </div>
                          )}
                          Total: {order && order.Total}
                          
                        </div>
                      )
                    }
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

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
