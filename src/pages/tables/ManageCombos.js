
// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { Breadcrumb } from '@themesberg/react-bootstrap';

// import { PageTrafficTable, RankingTable } from "../../components/Tables";


// export default () => {
//   return (
//     <>
//       <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <div className="d-block mb-4 mb-xl-0">
//           <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
//             <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
//             <Breadcrumb.Item>Tables</Breadcrumb.Item>
//             <Breadcrumb.Item active>Bootstrap tables</Breadcrumb.Item>
//           </Breadcrumb>
//           <h4>Bootstrap tables</h4>
//           <p className="mb-0">
//             Dozens of reusable components built to provide buttons, alerts, popovers, and more.
//           </p>
//         </div>
//       </div>

//       <PageTrafficTable />
//       <RankingTable />
//     </>
//   );
// };


import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../../config/config";

function ManageCombo() {
  const [showModal, setShowModal] = useState(false);
  const [comboName, setComboName] = useState('');
  const [comboDescription, setComboDescription] = useState('');
  const [comboThumbnail, setComboThumbnail] = useState(null);
  const [comboPrice, setComboPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [combos, setCombos] = useState([]);
  const [editCombo, setEditCombo] = useState({
    id: '',
    name: '',
    description: '',
    thumbnail: null,
    price: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [comboToDelete, setComboToDelete] = useState(null);

  useEffect(() => {
    fetchCombos();
  }, []);

  const fetchCombos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/combos`, {
        headers: {
          "ngrok-skip-browser-warning": "true" // Bypass Ngrok warning page
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch combos. Please try again.");
      }
  
      const data = await response.json();
  
      // Adjusting for thumbnail URL display
      const adjustedData = data.map(combo => ({
        ...combo,
        combotthumbnail: combo.combotthumbnail ? `${combo.combotthumbnail}` : null // Adjust path as necessary
      }));
  
      setCombos(adjustedData);
    } catch (error) {
      setError(error.message || "Network error. Please try again.");
      console.error("Error fetching combos:", error);
    }
  };
  

  const handleClose = () => {
    setShowModal(false);
    resetMessages();
    resetForm();
  };

  const handleShow = () => setShowModal(true);

  const resetForm = () => {
    setComboName('');
    setComboDescription('');
    setComboThumbnail(null);
    setComboPrice('');
    setEditCombo({
      id: '',
      name: '',
      description: '',
      thumbnail: null,
      price: ''
    });
    setIsEditing(false);
  };

  const resetMessages = () => {
    setMessage('');
    setError('');
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('comboname', comboName);
    formData.append('combodescription', comboDescription);
    formData.append('comboprice', comboPrice);
    if (comboThumbnail) {
      formData.append('combothumbnail', comboThumbnail);
    }

    try {
      const response = await fetch(`${BASE_URL}/acombos`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Combo added successfully.');
        fetchCombos();
        handleClose();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error adding combo:', error);
    }
  };

  const handleEdit = (combo) => {
    setIsEditing(true);
    setEditCombo({
      id: combo.comboid,
      name: combo.comboname,
      description: combo.combodescription,
      thumbnail: combo.combothumbnail,
      price: combo.comboprice
    });
    handleShow();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCombo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditThumbnailChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditCombo(prevState => ({
        ...prevState,
        thumbnail: e.target.files[0],
      }));
    }
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append('comboname', editCombo.name);
    formData.append('combodescription', editCombo.description);
    formData.append('comboprice', editCombo.price);
    if (editCombo.thumbnail instanceof File) {
      formData.append('combothumbnail', editCombo.thumbnail);
    }

    try {
      const response = await fetch(`${BASE_URL}/combos/${editCombo.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        setMessage('Combo updated successfully.');
        fetchCombos();
        handleClose();
      } else {
        setError('Failed to update combo. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error updating combo:', error);
    }
  };

  const handleDelete = (comboId) => {
    setComboToDelete(comboId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`${BASE_URL}/combos/${comboToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Combo deleted successfully.');
        fetchCombos();
      } else {
        setError('Failed to delete combo. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error deleting combo:', error);
    }
    setShowDeleteConfirmation(false);
  };

  const DeleteConfirmationModal = () => (
    <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this combo?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );

  const renderSerialNumbers = () => {
    return sortedCombos.map((_, index) => (
      <td key={index + 1}>{index + 1}</td>
    ));
  };

  // Sort combos array by ID in ascending order
  const sortedCombos = [...combos].sort((a, b) => a.comboid - b.comboid);

  return (
    <div>
      <div className='mt-4'>
        <Button variant="primary" size="sm" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Combo
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
          <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
            {isEditing ? 'Edit Combo' : 'Add Combo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderRadius: '90px' }}>
        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <Form>
            <Form.Group className="mb-3" controlId="formComboName">
              <Form.Label>Combo Name</Form.Label>
              <Form.Control type="text" placeholder="Enter combo name" name="name" value={isEditing ? editCombo.name : comboName} onChange={isEditing ? handleEditInputChange : (e) => setComboName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComboDescription">
              <Form.Label>Combo Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter combo description" name="description" value={isEditing ? editCombo.description : comboDescription} onChange={isEditing ? handleEditInputChange : (e) => setComboDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComboPrice">
              <Form.Label>Combo Price</Form.Label>
              <Form.Control type="text" placeholder="Enter combo price" name="price" value={isEditing ? editCombo.price : comboPrice} onChange={isEditing ? handleEditInputChange : (e) => setComboPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formComboThumbnail">
              <Form.Label>Combo Thumbnail</Form.Label>
              <Form.Control type="file" onChange={isEditing ? handleEditThumbnailChange : (e) => setComboThumbnail(e.target.files[0])} />
            </Form.Group>
            <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit}>
              {isEditing ? 'Save Changes' : 'Add Combo'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th style={{ textAlign: 'center', padding: '10px' }}> Sr. No.</th>
            <th style={{ textAlign: 'center', padding: '10px' }}> Name</th>
            <th style={{ textAlign: 'center', padding: '10px' }}> Description</th>
            <th style={{ textAlign: 'center', padding: '10px' }}> Price</th>
            <th style={{ textAlign: 'center', padding: '10px' }}> Thumbnail</th>
            <th style={{ textAlign: 'center', padding: '10px' }}> Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCombos.map((combo, index) => (
            <tr key={combo.comboid}>
              <td style={{ textAlign: 'center' }} >{index + 1}</td>
              <td style={{ textAlign: 'center' }} >{combo.comboname}</td>
              <td style={{ textAlign: 'center' }} >{combo.combodescription}</td>
              <td style={{ textAlign: 'center' }} >{combo.comboprice}</td>
              <td style={{ textAlign: 'center' }}>
                {combo.combotthumbnail ? (
                  <img src={combo.combotthumbnail} alt="Combo Thumbnail" style={{ width: '80px', height: '80px' }} />
                ) : (
                  'No Thumbnail'
                )}
              </td>
              <td style={{ textAlign: 'center' }} >
                <Button variant="info" size="sm" onClick={() => handleEdit(combo)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(combo.comboid)}>
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

export default ManageCombo;

