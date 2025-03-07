// import React, { useState, useEffect } from "react";
// import { useHistory, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
// import { Col, Row, Form, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
// import BgImage from "../../assets/img/illustrations/signin.svg";
// import { BASE_URL } from "../../config/config";
// import './signIn.css'; // Import custom CSS file

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageColor, setMessageColor] = useState("");
//   const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
// const navigate = useNavigate();

//   useEffect(() => {
//     // Check if rememberMe is enabled, if yes, retrieve saved email and password from localStorage
//     const storedRememberMe = localStorage.getItem("rememberMe");
//     if (storedRememberMe === "true") {
//       const storedEmail = localStorage.getItem("rememberedEmail");
//       const storedPassword = localStorage.getItem("rememberedPassword");
//       if (storedEmail && storedPassword) {
//         setEmail(storedEmail);
//         setPassword(storedPassword);
//         setRememberMe(true);
//       }
//     }
//   }, []);

//   const handleRememberMeChange = (e) => {
//     setRememberMe(e.target.checked);
//     if (!e.target.checked) {
//       // If Remember Me is unchecked, clear saved email and password from localStorage
//       localStorage.removeItem("rememberedEmail");
//       localStorage.removeItem("rememberedPassword");
//     }
//     // Save Remember Me state in localStorage
//     localStorage.setItem("rememberMe", e.target.checked);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email_id: email, password: password })
//       });
//       const data = await response.json();
//       setMessage(data.message);
//       setMessageColor(data.success ? "success" : "danger");
//       if (data.success) {
//         setMessage("Login successful!"); // Show success message
//         setTimeout(() => {
//           history.push("/dashboard"); // Redirect to dashboard after successful login
//         }, 2000);
//       } else {
//         setTimeout(() => {
//           setMessage(""); // Clear message after 3 seconds for unsuccessful login
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("Error occurred. Please try again.");
//       setMessageColor("danger");
//       setTimeout(() => {
//         setMessage(""); // Clear message after 3 seconds for error
//       }, 3000);
//     }
//   };

//   return (
//     <main>
//       <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
//         <Container>
//           <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
//             <Col xs={8} className="d-flex align-items-center justify-content-center">
//               <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
//                 <div className="text-center text-md-center mb-4 mt-md-0">
//                   <h3 className="mb-0">Sign in to our platform</h3>
//                 </div>
//                 <div className={`fade-in-out ${message ? 'show' : ''}`}>
//                   <div className={`alert alert-${messageColor} alert-dismissible fade show`} role="alert">
//                     {message}
//                   </div>
//                 </div>
//                 <Form className="mt-4" onSubmit={handleSubmit}>
//                   <Form.Group id="email_id" className="mb-4">
//                     <Form.Label>Your Email</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text>
//                         <FontAwesomeIcon icon={faEnvelope} />
//                       </InputGroup.Text>
//                       <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     </InputGroup>
//                   </Form.Group>
//                   <Form.Group id="password" className="mb-4">
//                     <Form.Label>Your Password</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text>
//                         <FontAwesomeIcon icon={faUnlockAlt} />
//                       </InputGroup.Text>
//                       <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     </InputGroup>
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Check type="checkbox" label="Remember me" checked={rememberMe} onChange={handleRememberMeChange} />
//                   </Form.Group>
//                   <Button variant="primary" type="submit" className="w-100">
//                     Sign in
//                   </Button>
//                 </Form>
//                 <div className="text-center mt-3">
//                   <Link to="/examples/forgot-password">Forgot Password?</Link>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </main>
//   );
// };
// export default SignIn;



import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup, Spinner } from '@themesberg/react-bootstrap';
import BgImage from "../../assets/img/illustrations/signin.svg";
import { BASE_URL } from "../../config/config";
import './signIn.css'; // Import custom CSS file

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ Fix: useNavigate for navigation

  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe");
    if (storedRememberMe === "true") {
      const storedEmail = localStorage.getItem("rememberedEmail");
      const storedPassword = localStorage.getItem("rememberedPassword");
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    }
  }, []);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
    localStorage.setItem("rememberMe", e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_id: email, password: password })
      });
      const data = await response.json();
      setMessage(data.message);
      setMessageColor(data.success ? "success" : "danger");

      if (data.success) {
        setMessage("Login successful!");
        setTimeout(() => {
          navigate("/dashboard"); // ✅ Fixed navigation
        }, 2000);
      } else {
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred. Please try again.");
      setMessageColor("danger");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={8} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                {message && (
                  <div className={`alert alert-${messageColor} alert-dismissible fade show`} role="alert">
                    {message}
                  </div>
                )}
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email_id" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Remember me" checked={rememberMe} onChange={handleRememberMeChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Sign in'}
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <Link to="/examples/forgot-password">Forgot Password?</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default SignIn;
