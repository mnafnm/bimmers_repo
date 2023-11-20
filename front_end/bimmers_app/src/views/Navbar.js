import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar(){
    return (
        <nav className="nav">
        <Link to="/"className= "site-title">
           Bimmers R Us
        </Link>
       <ul>
        <CustomLink to="/CheckIn">Register</CustomLink>
        <CustomLink to="/LookUp">Look Up</CustomLink>
        {/* <CustomLink to="/repairOrder">Repair Orders</CustomLink> */}
        {/* <CustomLink to="/invoices">Invoices</CustomLink> */}
       </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}