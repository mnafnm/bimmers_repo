/*export default function About() {
    return <h1>Check in</h1>
  }*/
  import React, {Component} from 'react'

  class Check_in extends Component {

    constructor (prop) {
      super(prop)

      this.state = {
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
        Description1: '',
        Description2: '',
        Description3: '',
        VIN_Number: '',
      }

    }
  
    handleCusFnamechange = (event ) => {
      this.setState({
           CusFname: event.target.value,


          })

    }

    handleCusLnamechange = (event ) => {
      this.setState({
           CusLname: event.target.value,


          })

    }


    handlePhoneNuchange = (event ) => {
      this.setState({
        PhoneNu: event.target.value,


          })

    }

    handleStreetchange = (event ) => {
      this.setState({
        Street: event.target.value,


          })

    }

    handleCitychange = (event ) => {
      this.setState({
        City: event.target.value,


          })

    }

    handleStateNamechange = (event ) => {
      this.setState({
        StateName: event.target.value,


          })

    }

    handleZipCodechange = (event ) => {
      this.setState({
        ZipCode: event.target.value,


          })

    }

    handleCarMakechange = (event ) => {
      this.setState({
        CarMake: event.target.value,


          })

    }

    handleCarModelchange = (event ) => {
      this.setState({
        CarModel: event.target.value,


          })

    }

    handleCarYearchange = (event ) => {
      this.setState({
        CarYear: event.target.value,


          })

    }

    handleCarColorchange = (event ) => {
      this.setState({
        CarColor: event.target.value,


          })

    }

    handlePlateNumchange = (event ) => {
      this.setState({
        PlateNum: event.target.value,


          })

    }

    handlePlateNumchange = (event ) => {
      this.setState({
        PlateNum: event.target.value,


          })

    }

    handleDescription1change = (event ) => {
      this.setState({
        Description1: event.target.value,


          })

    }

    handleDescription2change = (event ) => {
      this.setState({
        Description2: event.target.value,


          })

    }

    handleDescription3change = (event ) => {
      this.setState({
        Description3: event.target.value,


          })

    }

    handleVin_Numberchange = (event ) => {
      this.setState({
        Description3: event.target.value,


          })

    }

    handleSubmit = event =>{
        alert(`
        ${this.state.CusFname} ${this.state.CusLname} ${this.state.PhoneNu} 
        ${this.state.Street} ${this.state.City} ${this.state.StateName} ${this.state.ZipCode} 
        ${this.state.CarMake} ${this.state.CarModel} ${this.state.CarYear} ${this.state.CarColor}
        ${this.state.PlateNum}

        ${this.state.Description1}
        ${this.state.Description2}
        ${this.state.Description3}
        `)
    }

    render () {
      return (
        
      <form onSubmit={this.handleSubmit}>
        <h1>Check in</h1>
        <label>Customer Information </label>
        <div>
          <label>First Name: </label>
          <input 
          type = "text" value={this.state.CusFname} 
          onChange={this.handleCusFnamechange} 
          />
        </div>
        <div>
        <label>Last Name: </label>
        <input 
        type = "text" value={this.state.CusLname} 
        onChange={this.handleCusLnamechange}
        />
        </div>

      <div>
      <label>Phone Number: </label>
        <input 
        type = "text" value={this.state.PhoneNu} 
        onChange={this.handlePhoneNuchange}
        />
        </div>

        <br></br>
        <label>Customer Address </label>
        <div>
      <label>Street: </label>
        <input 
        type = "text" value={this.state.Street} 
        onChange={this.handleStreetchange}
        />
        </div>

        <div>
      <label>City: </label>
        <input 
        type = "text" value={this.state.City} 
        onChange={this.handleCitychange}
        />
        </div>

        <div>
      <label>State: </label>
        <input 
        type = "text" value={this.state.StateName} 
        onChange={this.handleStateNamechange}
        />
        </div>

        <div>
      <label>Zip Code: </label>
        <input 
        type = "text" value={this.state.ZipCode} 
        onChange={this.handleZipCodechange}
        />
        </div>

        <br></br>
        <label>Vehicle Information </label>

        <div>
      <label>Make: </label>
        <input 
        type = "text" value={this.state.CarMake} 
        onChange={this.handleCarMakechange}
        />
        </div>

        <div>
      <label>Model: </label>
        <input 
        type = "text" value={this.state.CarModel} 
        onChange={this.handleCarModelchange}
        />
        </div>

        <div>
      <label>Year: </label>
        <input 
        type = "text" value={this.state.CarYear} 
        onChange={this.handleCarYearchange}
        />
        </div>

        <div>
      <label>Color: </label>
        <input 
        type = "text" value={this.state.CarColor} 
        onChange={this.handleCarColorchange}
        />
        </div>

        <div>
      <label>Plate Number: </label>
        <input 
        type = "text" value={this.state.PlateNum} 
        onChange={this.handlePlateNumchange}
        />
        </div>

        <div>
      <label>VIN Number: </label>
        <input 
        type = "text" value={this.state.VIN_Number} 
        onChange={this.handleVIN_Numberchange}
        />
        </div>

        <br></br>
      <label>Repair Description #1: </label>
        <div>
        <textarea 
        value={this.state.Description1} 
        onChange={this.handleDescription1change} 
        />
        </div>

        <label>Repair Description #2: </label>
        <div>
        <textarea 
        value={this.state.Description2} 
        onChange={this.handleDescription2change} 
        />
        </div>
        
        <label>Repair Description #3: </label>
        <div>
        <textarea 
        value={this.state.Description3} 
        onChange={this.handleDescription3change} 
        />
        </div>
        


        <button type="submit">Register New</button>
      </form>
      )
    }
  }

export default Check_in