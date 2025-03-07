// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faCog, faHome, faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
// import { BASE_URL } from "../config/config";
// import * as XLSX from 'xlsx';


// const CustomersTable = () => {
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const searchInputRef = useRef(null);

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setSearchTerm("");
//         searchInputRef.current.blur();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/vcustomers`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // Add any necessary authorization headers here if required
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setCustomers(data);
//       } else {
//         console.error("Failed to fetch customers");
//       }
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//     }
//   };

//   const highlightText = (text, highlight) => {
//     if (!highlight) return text;
//     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
//     return parts.map((part, index) =>
//       part.toLowerCase() === highlight.toLowerCase() ? <mark key={index} style={{ backgroundColor: 'yellow' }}>{part}</mark> : part
//     );
//   };

//   const filteredCustomers = customers.filter(customer =>
//     customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.email_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.phone_number.includes(searchTerm)
//   );

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const exportToExcel = () => {
//     const fileName = "customers.xlsx";
//     const data = filteredCustomers.map(customer => ({
//       "Customer ID": customer.id,
//       "Full Name": customer.full_name,
//       "Email Address": customer.email_address,
//       "Phone Number": customer.phone_number
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
//     XLSX.writeFile(workbook, fileName);
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-md-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>CrazeeCook</Breadcrumb.Item>
//             <Breadcrumb.Item active>Customers</Breadcrumb.Item>
//           </Breadcrumb>
//           <h4 className="mt-3">Customer Transactions</h4>
//           {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
//         </div>
//         <div className="btn-toolbar mb-2 mb-md-0">
//           <ButtonGroup>
//             <Button variant="outline-primary" size="sm">Share</Button>
//             <Button variant="outline-primary" size="sm" onClick={exportToExcel}><FontAwesomeIcon icon={faFileExcel} /> Export</Button>
//           </ButtonGroup>
//         </div>
//       </div>

//       <div className="table-settings mb-4">
//         <Row className="justify-content-between align-items-center">
//           <Col xs={8} md={6} lg={3} xl={4}>
//             <InputGroup>
//               <InputGroup.Text>
//                 <FontAwesomeIcon icon={faSearch} />
//               </InputGroup.Text>
//               <Form.Control 
//                 type="text" 
//                 placeholder="Search" 
//                 value={searchTerm} 
//                 onChange={handleSearchChange} 
//                 ref={searchInputRef}
//               />
//             </InputGroup>
//           </Col>
//         </Row>
//       </div>

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Customer ID</th>
//             <th>Full Name</th>
//             <th>Email Address</th>
//             <th>Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCustomers.map(customer => (
//             <tr key={customer.id}>
//               <td>{customer.id}</td>
//               <td>{highlightText(customer.full_name, searchTerm)}</td>
//               <td>{highlightText(customer.email_address, searchTerm)}</td>
//               <td>{highlightText(customer.phone_number, searchTerm)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default CustomersTable;






// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faCog, faHome, faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
// import { BASE_URL } from "../config/config";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';


// const CustomersTable = () => {
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const searchInputRef = useRef(null);

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setSearchTerm("");
//         searchInputRef.current.blur();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/vcustomers`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // Add any necessary authorization headers here if required
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         // Sort customers by ID in ascending order
//         data.sort((a, b) => a.id - b.id);
//         setCustomers(data);
//       } else {
//         console.error("Failed to fetch customers");
//       }
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, [searchTerm]);

//   const highlightText = (text, highlight) => {
//     if (!highlight) return text;
//     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
//     return parts.map((part, index) =>
//       part.toLowerCase() === highlight.toLowerCase() ? <mark key={index} style={{ backgroundColor: 'yellow' }}>{part}</mark> : part
//     );
//   };

//   const filteredCustomers = customers.filter(customer =>
//     customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.email_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     customer.phone_number.includes(searchTerm)
//   );

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const exportToExcel = () => {
//     const fileName = "customers.xlsx";
//     const data = filteredCustomers.map(customer => ({
//       "Customer ID": customer.id,
//       "Full Name": customer.full_name,
//       "Email Address": customer.email_address,
//       "Phone Number": customer.phone_number
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//     saveAs(excelBlob, fileName);
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-md-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>CrazeeCook</Breadcrumb.Item>
//             <Breadcrumb.Item active>Customers</Breadcrumb.Item>
//           </Breadcrumb>
//           <h4 className="mt-3">Customer Transactions</h4>
//           {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
//         </div>
//         <div className="btn-toolbar mb-2 mb-md-0">
//           <ButtonGroup>
//             <Button variant="outline-primary" size="sm">Share</Button>
//             <Button variant="outline-primary" size="sm" onClick={exportToExcel}><FontAwesomeIcon icon={faFileExcel} /> Export</Button>
//           </ButtonGroup>
//         </div>
//       </div>

//       <div className="table-settings mb-4">
//         <Row className="justify-content-between align-items-center">
//           <Col xs={8} md={6} lg={3} xl={4}>
//             <InputGroup>
//               <InputGroup.Text>
//                 <FontAwesomeIcon icon={faSearch} />
//               </InputGroup.Text>
//               <Form.Control 
//                 type="text" 
//                 placeholder="Search" 
//                 value={searchTerm} 
//                 onChange={handleSearchChange} 
//                 ref={searchInputRef}
//               />
//             </InputGroup>
//           </Col>
//         </Row>
//       </div>

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Customer ID</th>
//             <th>Full Name</th>
//             <th>Email Address</th>
//             <th>Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCustomers.map(customer => (
//             <tr key={customer.id}>
//               <td>{customer.id}</td>
//               <td>{highlightText(customer.full_name, searchTerm)}</td>
//               <td>{highlightText(customer.email_address, searchTerm)}</td>
//               <td>{highlightText(customer.phone_number, searchTerm)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default CustomersTable;








// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';
// import { BASE_URL } from "../config/config";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';


// const CustomersTable = () => {
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [customersPerPage] = useState(8); // Number of customers per page
//   const searchInputRef = useRef(null);

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setSearchTerm("");
//         searchInputRef.current.blur();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/vcustomers`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // Add any necessary authorization headers here if required
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         // Sort customers by ID in ascending order
//         data.sort((a, b) => a.id - b.id);
//         setCustomers(data);
//       } else {
//         console.error("Failed to fetch customers");
//       }
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, [searchTerm]);

//   const highlightText = (text, highlight) => {
//     if (!highlight) return text;
//     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
//     return parts.map((part, index) =>
//       part.toLowerCase() === highlight.toLowerCase() ? <mark key={index} style={{ backgroundColor: 'yellow' }}>{part}</mark> : part
//     );
//   };

//   const filteredCustomers = customers.filter(customer =>
//     Object.values(customer).some(field =>
//       String(field).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );  

//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1); 
//   };
  

//   const exportToExcel = () => {
//     const fileName = "customers.xlsx";
//     const data = currentCustomers.map(customer => ({
//       "Customer ID": customer.id,
//       "Full Name": customer.full_name,
//       "Email Address": customer.email_address,
//       "Phone Number": customer.phone_number
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//     saveAs(excelBlob, fileName);
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-md-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>CrazeeCook</Breadcrumb.Item>
//             <Breadcrumb.Item active>Customers</Breadcrumb.Item>
//           </Breadcrumb>
//           <h4 className="mt-3">Customer Transactions</h4>
//           {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
//         </div>
//         <div className="btn-toolbar mb-2 mb-md-0">
//           <ButtonGroup>
//             <Button variant="outline-primary" size="sm">Share</Button>
//             <Button variant="outline-primary" size="sm" onClick={exportToExcel}><FontAwesomeIcon icon={faFileExcel} /> Export</Button>
//           </ButtonGroup>
//         </div>
//       </div>

//       <div className="table-settings mb-4">
//         <Row className="justify-content-between align-items-center">
//           <Col xs={8} md={6} lg={3} xl={4}>
//             <InputGroup>
//               <InputGroup.Text>
//                 <FontAwesomeIcon icon={faSearch} />
//               </InputGroup.Text>
//               <Form.Control 
//                 type="text" 
//                 placeholder="Search" 
//                 value={searchTerm} 
//                 onChange={handleSearchChange} 
//                 ref={searchInputRef}
//               />
//             </InputGroup>
//           </Col>
//         </Row>
//       </div>

//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Customer ID</th>
//             <th>Full Name</th>
//             <th>Email Address</th>
//             <th>Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentCustomers.map(customer => (
//             <tr key={customer.id}>
//               <td>{customer.id}</td>
//               <td>{highlightText(customer.full_name, searchTerm)}</td>
//               <td>{highlightText(customer.email_address, searchTerm)}</td>
//               <td>{highlightText(customer.phone_number, searchTerm)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <nav>
//         <ul className="pagination justify-content-center">
//           {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }, (_, index) => (
//             <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
//               <button className="page-link" onClick={() => paginate(index + 1)} style={index + 1 === currentPage ? { backgroundColor: '#388377', color: '#fff' } : {}}>
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//     </>
//   );
// };

// export default CustomersTable;









import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';
import { BASE_URL } from "../config/config";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(8); 
  const searchInputRef = useRef(null);
  const [error, setError] = useState(null); // ✅ Declare setError state

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchTerm("");
        searchInputRef.current.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/vcustomers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" // Bypass Ngrok warning page
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch customers. Please try again.");
      }
  
      const data = await response.json();
  
      // Sort customers by ID in ascending order
      const sortedCustomers = data.sort((a, b) => a.id - b.id);
      setCustomers(sortedCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(error.message || "Network error. Please try again.");
    }
  };
  

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm]);

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? <mark key={index} style={{ backgroundColor: 'yellow' }}>{part}</mark> : part
    );
  };

  const filteredCustomers = customers.filter(customer =>
    Object.values(customer).some(field =>
      String(field).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );  

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };  
  
  
  const exportToExcel = () => {
    const fileName = "customers.xlsx";
    const data = currentCustomers.map(customer => ({
      "Customer ID": customer.id,
      "Full Name": customer.full_name,
      "Email Address": customer.email_address,
      "Phone Number": customer.phone_number
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(excelBlob, fileName);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>CrazeeCook</Breadcrumb.Item>
            <Breadcrumb.Item active>Customers</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className="mt-3">Customer Transactions</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">Share</Button>
            <Button variant="outline-primary" size="sm" onClick={exportToExcel}><FontAwesomeIcon icon={faFileExcel} /> Export</Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={handleSearchChange} 
                ref={searchInputRef}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th style={{width:'10%', textAlign: 'center'}}> Customer ID</th>
            <th style={{width:'25%', textAlign: 'center'}}> Full Name</th>
            <th style={{width:'30%', textAlign: 'center'}}> Email Address</th>
            <th style={{width:'25%', textAlign: 'center'}}> Phone Number</th>
            <th style={{width:'10%', textAlign: 'center'}}> Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(customer => (
            <tr key={customer.id}>
              <td style={{width:'10%', textAlign: 'center'}}> {customer.id}</td>
              <td style={{width:'25%', textAlign: 'center'}}> {highlightText(customer.full_name, searchTerm)}</td>
              <td style={{width:'30%', textAlign: 'center'}}> {highlightText(customer.email_address, searchTerm)}</td>
              <td style={{width:'25%', textAlign: 'center'}}> {highlightText(customer.phone_number, searchTerm)}</td>
              <td style={{width:'20%', textAlign: 'center'}}> {formatDate(customer.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)} style={index + 1 === currentPage ? { backgroundColor: '#388377', color: '#fff' } : {}}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </>
  );
};

export default CustomersTable;
