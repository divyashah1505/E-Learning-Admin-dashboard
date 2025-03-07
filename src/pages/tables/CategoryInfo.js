import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function CategoryInfo() {
  const [showModal, setShowModal] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [subCategoryThumbnail, setSubCategoryThumbnail] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState({
    id: '',
    name: '',
    description: '',
    thumbnail: null
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchSubCategories();
    const storedSubCategory = JSON.parse(localStorage.getItem('editedSubCategory'));
    if (storedSubCategory) {
      setEditSubCategory(storedSubCategory);
      setIsEditing(true);
      handleShow();
    }
  }, []);

  const fetchSubCategories = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch('https://ff7e-2405-201-2009-d9ed-913b-844b-9334-2774.ngrok-free.app/subcategories');
  
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories. Please try again.');
      }
  
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setSubCategories(data);
      } else {
        throw new Error('Response is not in JSON format.');
      }
  
      setIsLoading(false);
    } catch (error) {
      setError(error.message || 'Network error. Please try again.');
      setIsLoading(false);
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    resetMessages();
    resetForm();
    localStorage.removeItem('editedSubCategory'); // Clear stored subcategory on modal close
  };

  const handleShow = () => setShowModal(true);

  const resetForm = () => {
    setSubCategoryName('');
    setSubCategoryDescription('');
    setSubCategoryThumbnail(null);
    setEditSubCategory({
      id: '',
      name: '',
      description: '',
      thumbnail: null
    });
    setIsEditing(false);
  };

  const resetMessages = () => {
    setMessage('');
    setError('');
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('SubCategory_Name', subCategoryName);
    formData.append('SubCategory_Description', subCategoryDescription);
    formData.append('SubCategory_Thumbnail', subCategoryThumbnail);

    try {
      const response = await fetch('https://ff7e-2405-201-2009-d9ed-913b-844b-9334-2774.ngrok-free.app/addsubcategory', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Subcategory added successfully.');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError('Failed to add subcategory. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error adding subcategory:', error);
    }
  };

  const handleEdit = async (subcategory) => {
    localStorage.setItem('editedSubCategory', JSON.stringify(subcategory));
    setIsEditing(true);
    setEditSubCategory({
      id: subcategory.SubCategory_id,
      name: subcategory.SubCategory_Name,
      description: subcategory.SubCategory_Description,
      thumbnail: subcategory.SubCategory_Thumbnail
    });
    handleShow();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditSubCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditThumbnailChange = (e) => {
    if (!e || !e.target || !e.target.files) {
      console.error("Event, event target, or files not found.");
      return;
    }

    const file = e.target.files[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    setEditSubCategory((prevState) => ({
      ...prevState,
      thumbnail: file,
    }));
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append('SubCategory_Name', editSubCategory.name);
    formData.append('SubCategory_Description', editSubCategory.description);
    formData.append('SubCategory_Thumbnail', editSubCategory.thumbnail);
  
    try {
      const response = await fetch(`https://ff7e-2405-201-2009-d9ed-913b-844b-9334-2774.ngrok-free.app/editsubcategory/${editSubCategory.id}`, {
        method: 'PUT',
        headers: {
          // Remove the 'Content-Type' header to allow the browser to set it automatically
        },
        body: formData,
      });
      if (response.ok) {
        setMessage('Subcategory updated successfully.');
        // Update the subcategory in the local state as well
        setSubCategories(prevSubCategories => prevSubCategories.map(subcategory =>
          subcategory.SubCategory_id === editSubCategory.id ? { ...subcategory, SubCategory_Name: editSubCategory.name, SubCategory_Description: editSubCategory.description, SubCategory_Thumbnail: editSubCategory.thumbnail } : subcategory
        ));
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError('Failed to update subcategory. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error updating subcategory:', error);
    }
  };
  

  // const handleDelete = async (subCategoryId) => {
  //   try {
  //     const response = await fetch(`https://ff7e-2405-201-2009-d9ed-913b-844b-9334-2774.ngrok-free.app/deletesubcategory/${subCategoryId}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       setMessage('Subcategory deleted successfully.');
  //       fetchSubCategories();
  //     } else {
  //       setError('Failed to delete subcategory. Please try again.');
  //     }
  //   } catch (error) {
  //     setError('Network error. Please try again.');
  //     console.error('Error deleting subcategory:', error);
  //   }
  // };

  const handleDelete = (subCategoryId) => {
    // Filter out the subcategory with the specified subCategoryId
    const updatedSubCategories = subCategories.filter(subcategory => subcategory.SubCategory_id !== subCategoryId);
    // Update the state with the filtered subcategories
    setSubCategories(updatedSubCategories);
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button variant="primary" size="sm" className="me-2" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />Add Subcategory
        </Button>
      </div>
  
      <Modal show={showModal} onHide={handleClose} centered backdrop="opacity">
        <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
          <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic', color: 'black' }}>{isEditing ? 'Edit Subcategory' : 'Add Subcategory'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderRadius: '90px' }}>
          {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <Form>
            <Form.Group className="mb-3" controlId="formSubCategoryName">
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control type="text" placeholder="Enter subcategory name" name="name" value={isEditing ? editSubCategory.name : subCategoryName} onChange={isEditing ? handleEditInputChange : (e) => setSubCategoryName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubCategoryDescription">
              <Form.Label>Subcategory Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter subcategory description" name="description" value={isEditing ? editSubCategory.description : subCategoryDescription} onChange={isEditing ? handleEditInputChange : (e) => setSubCategoryDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubCategoryThumbnail">
              <Form.Label>Subcategory Thumbnail</Form.Label>
              <Form.Control type="file" name="thumbnail" onChange={isEditing ? handleEditThumbnailChange : (e) => setSubCategoryThumbnail(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit} style={{ borderRadius: '40px', width: '100%' }}>
            {isEditing ? 'Save Changes' : 'Add Subcategory'}
          </Button>
        </Modal.Footer>
      </Modal>
  
      <div className="mt-4">
        <h2>Subcategories</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Subcategory ID</th>
              <th>Subcategory Name</th>
              <th>Subcategory Description</th>
              <th>Subcategory Thumbnail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map(subcategory => (
              <tr key={subcategory.SubCategory_id}>
                <td>{subcategory.SubCategory_id}</td>
                <td>{subcategory.SubCategory_Name}</td>
                <td>{subcategory.SubCategory_Description}</td>
                <td><img src={subcategory.SubCategory_Thumbnail} alt={subcategory.SubCategory_Name} style={{ width: '100px' }} /></td>
                <td>
                  <Button variant="info" size="sm" onClick={() => handleEdit(subcategory)}><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(subcategory.SubCategory_id)}><FontAwesomeIcon icon={faTrash} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default CategoryInfo;
