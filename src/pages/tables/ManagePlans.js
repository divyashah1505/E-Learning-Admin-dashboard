// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form, Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
// import { BASE_URL } from "../../config/config";

// function ManagePlans() {
//   const [showModal, setShowModal] = useState(false);
//   const [planName, setplanName] = useState('');
//   const [planDescription, setplanDescription] = useState('');
//   const [plansThumbnail, setplansThumbnail] = useState(null);
//   const [planPrice, setplanPrice] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [plans, setplans] = useState([]);
//   const [editplans, setEditplans] = useState({
//     id: '',
//     name: '',
//     description: '',
//     thumbnail: null,
//     price: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [plansToDelete, setplansToDelete] = useState(null);

//   useEffect(() => {
//     fetchplans();
//   }, []);

//   const fetchplans = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/vplans`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch plans. Please try again.');
//       }
//       const data = await response.json();
//       setplans(data);
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       console.error('Error fetching plans:', error);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetMessages();
//     resetForm();
//   };

//   const handleShow = () => setShowModal(true);

//   const resetForm = () => {
//     setplanName('');
//     setplanDescription('');
//     setplansThumbnail(null);
//     setplanPrice('');
//     setEditplans({
//       id: '',
//       name: '',
//       description: '',
//       thumbnail: null,
//       price: ''
//     });
//     setIsEditing(false);
//   };

//   const resetMessages = () => {
//     setMessage('');
//     setError('');
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('planname', planName);
//     formData.append('description', planDescription);
//     formData.append('planprice', planPrice);
//     if (plansThumbnail) {
//       formData.append('plansthumbnail', plansThumbnail);
//     }
  
//     try {
//       const response = await fetch(`${BASE_URL}/aplans`, {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setMessage('plans added successfully.');
//         fetchplans();
//         handleClose();
//       } else {
//         setError(result.error || 'Failed to add plans. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error adding plans:', error);
//     }
//   };

//   const handleEdit = (plans) => {
//     setIsEditing(true);
//     setEditplans({
//       id: plans.planid,
//       name: plans.planname,
//       description: plans.description,
//       thumbnail: plans.plansthumbnail,
//       price: plans.planprice
//     });
//     handleShow();
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditplans(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleEditThumbnailChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setEditplans(prevState => ({
//         ...prevState,
//         thumbnail: e.target.files[0],
//       }));
//     }
//   };

//   const handleEditSubmit = async () => {
//     const formData = new FormData();
//     formData.append('planname', editplans.name);
//     formData.append('description', editplans.description);
//     formData.append('planprice', editplans.price);
//     if (editplans.thumbnail) {
//       formData.append('plansthumbnail', editplans.thumbnail); // Adjust this line if needed
//     }

//     // Ensure the request includes 'Content-Type': 'multipart/form-data'
//     try {
//       const response = await fetch(`${BASE_URL}/editplans/${editplans.id}`, { // Make sure this URL matches your actual API endpoint
//         method: 'PUT',
//         body: formData,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setMessage(result.message || 'plans updated successfully.');
//         fetchplans();
//         handleClose();
//       } else {
//         setError(result.error || 'Failed to update plans. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error updating plans:', error);
//     }
//   };

//   const handleDelete = (planid) => {
//     setplansToDelete(planid);
//     setShowDeleteConfirmation(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/dplans/${plansToDelete}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setMessage('plans deleted successfully.');
//         fetchplans();
//         setShowDeleteConfirmation(false);
//       } else {
//         setError('Failed to delete plans. Please try again.');
//         setShowDeleteConfirmation(false);
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       setShowDeleteConfirmation(false);
//       console.error('Error deleting plans:', error);
//     }
//   };

//   const DeleteConfirmationModal = () => (
//     <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Are you sure you want to delete this plans?</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
//         <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   return (
//     <div>
//       <div className='mt-4'>
//         <Button variant="primary" size="sm" onClick={handleShow}>
//           <FontAwesomeIcon icon={faPlus} className="me-2" /> Add plans
//         </Button>
//       </div>

//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
//             {isEditing ? 'Edit plans' : 'Add plans'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//         {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//           <Form>
//             <Form.Group className="mb-3" controlId="formplanName">
//               <Form.Label>plans Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter plans name" name="name" value={isEditing ? editplans.name : planName} onChange={isEditing ? handleEditInputChange : (e) => setplanName(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formplanDescription">
//               <Form.Label>plans Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter plans description" name="description" value={isEditing ? editplans.description : planDescription} onChange={isEditing ? handleEditInputChange : (e) => setplanDescription(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formplanPrice">
//               <Form.Label>plans Price</Form.Label>
//               <Form.Control type="text" placeholder="Enter plans price" name="price" value={isEditing ? editplans.price : planPrice} onChange={isEditing ? handleEditInputChange : (e) => setplanPrice(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formplansThumbnail">
//               <Form.Label>plans Thumbnail</Form.Label>
//               <Form.Control type="file" onChange={isEditing ? handleEditThumbnailChange : (e) => setplansThumbnail(e.target.files[0])} />
//             </Form.Group>
//             <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit}>
//               {isEditing ? 'Save Changes' : 'Add plans'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <Table striped bordered hover className="mt-4">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Thumbnail</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//         {plans.map(plans => (
//             <tr key={plans.planid}>
//               <td>{plans.planid}</td>
//               <td>{plans.planname}</td>
//               <td>{plans.description}</td>
//               <td>{plans.planprice}</td>
//               <td>
//                 {plans.plansthumbnail ? (
//                   <img src={plans.plansthumbnail} alt="plans Thumbnail" style={{ width: '80px', height: '80px' }} />
//                 ) : (
//                   'No Thumbnail'
//                 )}
//               </td>
//               <td>
//                 <Button variant="info" size="sm" onClick={() => handleEdit(plans)}>
//                   <FontAwesomeIcon icon={faEdit} />
//                 </Button>{' '}
//                 <Button variant="danger" size="sm" onClick={() => handleDelete(plans.planid)}>
//                   <FontAwesomeIcon icon={faTrash} />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <DeleteConfirmationModal />
//     </div>
//   );
// }

// export default ManagePlans;

import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../../config/config";

function ManagePlans() {
  const [showModal, setShowModal] = useState(false);
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [plansThumbnail, setPlansThumbnail] = useState(null);
  const [planPrice, setPlanPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [plans, setPlans] = useState([]);
  const [editPlans, setEditPlans] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${BASE_URL}/vplans`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      if (!response.ok) throw new Error("Failed to fetch plans. Please try again.");

      const data = await response.json();
      const sortedPlans = data.sort((a, b) => b.planid - a.planid);
      setPlans(sortedPlans);
    } catch (error) {
      setError(error.message || "Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setPlanName('');
    setPlanDescription('');
    setPlansThumbnail(null);
    setPlanPrice('');
    setEditPlans(null);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
    setError('');
    setMessage('');
  };

  const handleShow = () => {
    resetForm();
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!planName || !planDescription || !planPrice) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('planname', planName);
    formData.append('description', planDescription);
    formData.append('planprice', planPrice);
    if (plansThumbnail) formData.append('plansthumbnail', plansThumbnail);

    try {
      const response = await fetch(`${BASE_URL}/aplans`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage('Plan added successfully.');
        fetchPlans();
        handleClose();
      } else {
        setError(result.error || 'Failed to add plan.');
      }
    } catch (error) {
      setError('Network error.');
    }
  };

  const handleEdit = (plan) => {
    setEditPlans({
      id: plan.planid,
      name: plan.planname,
      description: plan.description,
      price: plan.planprice,
      thumbnail: null
    });
    setShowModal(true);
  };

  const handleEditSubmit = async () => {
    if (!editPlans.name || !editPlans.description || !editPlans.price) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('planname', editPlans.name);
    formData.append('description', editPlans.description);
    formData.append('planprice', editPlans.price);
    if (editPlans.thumbnail) formData.append('plansthumbnail', editPlans.thumbnail);

    try {
      const response = await fetch(`${BASE_URL}/editplans/${editPlans.id}`, {
        method: 'PUT',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message || 'Plan updated successfully.');
        fetchPlans();
        handleClose();
      } else {
        setError(result.error || 'Failed to update plan.');
      }
    } catch (error) {
      setError('Network error.');
    }
  };

  const handleDelete = (id) => {
    setPlanToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dplans/${planToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Plan deleted successfully.');
        fetchPlans();
      } else {
        setError('Failed to delete plan.');
      }
    } catch (error) {
      setError('Network error.');
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const DeleteConfirmationModal = () => (
    <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this plan?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="mt-4">
      <Button variant="primary" size="sm" onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Plan
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#2CA58D' }}>
          <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
            {editPlans ? 'Edit Plan' : 'Add Plan'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                value={editPlans ? editPlans.name : planName}
                onChange={(e) => editPlans ? setEditPlans({ ...editPlans, name: e.target.value }) : setPlanName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plan Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editPlans ? editPlans.description : planDescription}
                onChange={(e) => editPlans ? setEditPlans({ ...editPlans, description: e.target.value }) : setPlanDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plan Price</Form.Label>
              <Form.Control
                type="text"
                value={editPlans ? editPlans.price : planPrice}
                onChange={(e) => editPlans ? setEditPlans({ ...editPlans, price: e.target.value }) : setPlanPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plan Thumbnail</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (editPlans) {
                    setEditPlans({ ...editPlans, thumbnail: file });
                  } else {
                    setPlansThumbnail(file);
                  }
                }}
              />
            </Form.Group>
            <Button variant="primary" onClick={editPlans ? handleEditSubmit : handleSubmit}>
              {editPlans ? 'Save Changes' : 'Add Plan'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Sr. No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Description</th>
            <th style={{ textAlign: 'center' }}>Price</th>
            <th style={{ textAlign: 'center' }}>Thumbnail</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={plan.planid}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ textAlign: 'center' }}>{plan.planname}</td>
              <td style={{ textAlign: 'center' }}>{plan.description}</td>
              <td style={{ textAlign: 'center' }}>{plan.planprice}</td>
              <td style={{ textAlign: 'center' }}>
                {plan.plansthumbnail ? (
                  <img src={plan.plansthumbnail} alt="Thumbnail" style={{ width: '80px', height: '80px' }} />
                ) : 'No Thumbnail'}
              </td>
              <td style={{ textAlign: 'center' }}>
                <Button variant="info" size="sm" onClick={() => handleEdit(plan)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(plan.planid)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <DeleteConfirmationModal />
    </div>
  );
}

export default ManagePlans;
