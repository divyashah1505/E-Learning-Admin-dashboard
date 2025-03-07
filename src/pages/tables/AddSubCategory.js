// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Button, Modal, Form, Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { BASE_URL } from "../../config/config";

// function AddSubCategory() {
//   const { categoryId } = useParams();
//   const [showModal, setShowModal] = useState(false);
//   const [subCategoryName, setSubCategoryName] = useState('');
//   const [subCategoryDescription, setSubCategoryDescription] = useState('');
//   const [subCategoryThumbnail, setSubCategoryThumbnail] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [subCategories, setSubCategories] = useState([]);
//   // const [isLoading, setIsLoading] = useState(false);
//   const [editSubCategory, setEditSubCategory] = useState({
//     id: '',
//     name: '',
//     description: '',
//     thumbnail: null
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);

//   useEffect(() => {
//     if (categoryId) {
//       fetchSubCategories();
//     }
//   }, [categoryId]);

//   const fetchSubCategories = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/subcategories/${categoryId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch subcategories. Please try again.');
//       }
//       const data = await response.json();
//       setSubCategories(data);
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetMessages();
//     resetForm();
//   };

//   const handleShow = () => setShowModal(true);

//   const resetForm = () => {
//     setSubCategoryName('');
//     setSubCategoryDescription('');
//     setSubCategoryThumbnail(null);
//     setEditSubCategory({
//       id: '',
//       name: '',
//       description: '',
//       thumbnail: null
//     });
//     setIsEditing(false);
//   };

//   const resetMessages = () => {
//     setMessage('');
//     setError('');
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('Sub_Category_Name', subCategoryName);
//     formData.append('Sub_Category_Description', subCategoryDescription);
//     formData.append('Sub_Category_Thumbnail', subCategoryThumbnail);
//     formData.append('Category_id', categoryId);
  
//     try {
//       const response = await fetch(`${BASE_URL}/addsubcategories`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Subcategory added successfully.'); // Set success message
//         fetchSubCategories();
//         setTimeout(() => {
//           handleClose(); // Close the modal
//           window.location.reload(); // Refresh the page to reflect changes
//         }, 2000); // Delay the close and refresh to allow the user to see the message
//       } else {
//         setError('Failed to add subcategory. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error adding subcategory:', error);
//     }
//   };  

//   const handleEdit = (subcategory) => {
//     setIsEditing(true);
//     setEditSubCategory({
//       id: subcategory.Sub_Category_id,
//       name: subcategory.Sub_Category_Name,
//       description: subcategory.Sub_Category_Description,
//       thumbnail: subcategory.Sub_Category_Thumbnail
//     });
//     handleShow();
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditSubCategory(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleEditThumbnailChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setEditSubCategory(prevState => ({
//         ...prevState,
//         thumbnail: e.target.files[0],
//       }));
//     }
//   };

//   const handleEditSubmit = async () => {
//     const formData = new FormData();
//     formData.append('Sub_Category_Name', editSubCategory.name);
//     formData.append('Sub_Category_Description', editSubCategory.description);
//     formData.append('Sub_Category_Thumbnail', editSubCategory.thumbnail);

//     try {
//       const response = await fetch(`${BASE_URL}/editsubcategories/${editSubCategory.id}`, {
//         method: 'PUT',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Subcategory updated successfully.'); // This line ensures the message is set on successful update
//         fetchSubCategories();
//         setTimeout(() => {
//           handleClose(); // Close the modal
//           window.location.reload(); // Refresh the page to reflect changes
//         }, 2000); // Delay the close and refresh to allow the user to see the message
//       } else {
//         setError('Failed to update subcategory. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error updating subcategory:', error);
//     }
//   };

//   const handleDelete = (subCategoryId) => {
//     setSubCategoryToDelete(subCategoryId);
//     setShowDeleteConfirmation(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/deletesubcategories/${subCategoryToDelete}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setMessage('Subcategory deleted successfully.');
//         setTimeout(() => {
//           window.location.reload(); // Refresh the page after 1 second
//         }, 2000);
//         fetchSubCategories();
//         setShowDeleteConfirmation(false);
//       } else {
//         setError('Failed to delete subcategory. Please try again.');
//         setShowDeleteConfirmation(false);
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       setShowDeleteConfirmation(false);
//       console.error('Error deleting subcategory:', error);
//     }
//   };

//   const DeleteConfirmationModal = () => (
//     <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Are you sure you want to delete this subcategory?</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
//         <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   return (
//     <div>
//       <div className='mt-4'>
//         {/* Button to trigger add subcategory modal */}
//         <Button variant="primary" size="sm" onClick={handleShow}>
//           <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Subcategory
//         </Button>
//       </div>

//       {/* Add/Edit Subcategory Modal */}
//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton  style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
//             {isEditing ? 'Edit Subcategory' : 'Add Subcategory'}</Modal.Title>
//           </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//         {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//           <Form>
//             <Form.Group className="mb-3" controlId="formSubCategoryName">
//               <Form.Label>Subcategory Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter subcategory name" name="name" value={isEditing ? editSubCategory.name : subCategoryName} onChange={isEditing ? handleEditInputChange : (e) => setSubCategoryName(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formSubCategoryDescription">
//               <Form.Label>Subcategory Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter subcategory description" name="description" value={isEditing ? editSubCategory.description : subCategoryDescription} onChange={isEditing ? handleEditInputChange : (e) => setSubCategoryDescription(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formSubCategoryThumbnail">
//               <Form.Label>Subcategory Thumbnail</Form.Label>
//               <Form.Control type="file" onChange={isEditing ? handleEditThumbnailChange : (e) => setSubCategoryThumbnail(e.target.files[0])} />
//             </Form.Group>
//             <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit}>
//               {isEditing ? 'Save Changes' : 'Add Subcategory'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Subcategories Listing Table */}
//       <Table striped bordered hover className="mt-4">
//         <thead>
//           <tr>
//             <th style={{ width: '10%' }} >SubCategory ID</th>
//             <th style={{ width: '10%' }} >SubCategory Name</th>
//             <th style={{ width: '50%' }} >SubCategory Description</th>
//             <th style={{ width: '15%' }} >SubCategory Thumbnail</th>
//             <th style={{ width: '15%' }} >Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subCategories.map(subcategory => (
//             <tr key={subcategory.Sub_Category_id}>
//               <td>{subcategory.Sub_Category_id}</td>
//               <td>{subcategory.Sub_Category_Name}</td>
//               <td>{subcategory.Sub_Category_Description}</td>
//               <td>
//                 <img src={subcategory.Sub_Category_Thumbnail} alt="Thumbnail" style={{ width: '80px', height: '80px' }} />
//               </td>
//               <td>
//                 <Button variant="info" size="sm" onClick={() => handleEdit(subcategory)}>
//                   <FontAwesomeIcon icon={faEdit} />
//                 </Button>{' '}
//                 <Button variant="danger" size="sm" onClick={() => handleDelete(subcategory.Sub_Category_id)}>
//                   <FontAwesomeIcon icon={faTrash} />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmationModal />
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../../config/config";


function AddSubCategory() {
  const { categoryId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [subCategoryThumbnail, setSubCategoryThumbnail] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [editSubCategory, setEditSubCategory] = useState({
    id: '',
    name: '',
    description: '',
    thumbnail: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [subCategoryToDelete, setSubCategoryToDelete] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [ImageSubCategoryName, setImageSubCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (categoryId) {
      fetchSubCategories();
    }
  }, [categoryId]);

  const fetchSubCategories = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`${BASE_URL}/subcategories/${categoryId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true" // Bypass Ngrok warning page
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch subcategories. Please try again.");
      }
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setSubCategories(data);
      } else {
        throw new Error("Response is not in JSON format.");
      }
  
      setIsLoading(false);
    } catch (error) {
      setError(error.message || "Network error. Please try again.");
      setIsLoading(false);
      console.error("Error fetching subcategories:", error);
    }
  };
  

  const handleClose = () => {
    setShowModal(false);
    resetMessages();
    resetForm();
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
    formData.append('Sub_Category_Name', subCategoryName);
    formData.append('Sub_Category_Description', subCategoryDescription);
    formData.append('Sub_Category_Thumbnail', subCategoryThumbnail);
    formData.append('Category_id', categoryId);
  
    try {
      const response = await fetch(`${BASE_URL}/addsubcategories`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Subcategory added successfully.');
        fetchSubCategories();
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 2000);
      } else {
        setError('Failed to add subcategory. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error adding subcategory:', error);
    }
  };  

  const handleEdit = (subcategory) => {
    setIsEditing(true);
    setEditSubCategory({
      id: subcategory.Sub_Category_id,
      name: subcategory.Sub_Category_Name,
      description: subcategory.Sub_Category_Description,
      thumbnail: subcategory.Sub_Category_Thumbnail
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
    if (e.target.files && e.target.files.length > 0) {
      setEditSubCategory(prevState => ({
        ...prevState,
        thumbnail: e.target.files[0],
      }));
    }
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append('Sub_Category_Name', editSubCategory.name);
    formData.append('Sub_Category_Description', editSubCategory.description);
    formData.append('Sub_Category_Thumbnail', editSubCategory.thumbnail);

    try {
      const response = await fetch(`${BASE_URL}/editsubcategories/${editSubCategory.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        setMessage('Subcategory updated successfully.');
        fetchSubCategories();
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 2000);
      } else {
        setError('Failed to update subcategory. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error updating subcategory:', error);
    }
  };

  const handleOpenImageViewer = (imageUrl, Sub_Category_Name) => {
    setSelectedImage(imageUrl);
    setImageSubCategoryName(Sub_Category_Name);
    setShowImageViewer(true);
  };

  const ImageViewerModal = () => (
    <Modal show={showImageViewer} onHide={() => setShowImageViewer(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ImageSubCategoryName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={selectedImage} alt="SubCategory Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Modal.Body>
    </Modal>
  );

  const handleDelete = (subCategoryId) => {
    setSubCategoryToDelete(subCategoryId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`${BASE_URL}/deletesubcategories/${subCategoryToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Subcategory deleted successfully.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        fetchSubCategories();
        setShowDeleteConfirmation(false);
      } else {
        setError('Failed to delete subcategory. Please try again.');
        setShowDeleteConfirmation(false);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      setShowDeleteConfirmation(false);
      console.error('Error deleting subcategory:', error);
    }
  };

  const DeleteConfirmationModal = () => (
    <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this subcategory?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );

  const handleNavigateToRecipes = (subCategoryId) => {
    window.location.href = `${BASE_URL}/recipes/subcategory/${subCategoryId}`;
  };

  return (
    <div>
      <div className='mt-4'>
        <Button variant="primary" size="sm" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Subcategory
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton  style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
          <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
            {isEditing ? 'Edit Subcategory' : 'Add Subcategory'}</Modal.Title>
          </Modal.Header>
        <Modal.Body style={{ borderRadius: '90px' }}>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Form.Group className="mb-3" controlId="subcategoryName">
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control type="text" placeholder="Enter subcategory name" name="name"
                value={isEditing ? editSubCategory.name : subCategoryName} onChange={isEditing ? handleEditInputChange : (e) => setSubCategoryName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subcategoryDescription">
              <Form.Label>Subcategory Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter subcategory description" name="description"
                value={isEditing ? editSubCategory.description : subCategoryDescription} onChange={isEditing ? handleEditInputChange : (e) => setSubCategoryDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="subcategoryThumbnail">
              <Form.Label>Subcategory Thumbnail</Form.Label>
              <Form.Control type="file" accept="image/*" name="thumbnail"
                onChange={isEditing ? handleEditThumbnailChange : (e) => setSubCategoryThumbnail(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>
            Close
          </Button>
          <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit}>
            {isEditing ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteConfirmationModal />


      <ImageViewerModal/>
      <div className="mt-4">
      <h2>SubCategories</h2>
      {isLoading && (
          <div className="mt-3">
            <Button variant="primary" type="submit" disabled>
              <Spinner animation="border" size="sm" />
              <span className="ms-2">Loading...</span>
            </Button>
          </div>
        )}
        <Table bordered hover>
          <thead>
            <tr>
              <th style={{ width: '10%' , textAlign: 'center'}}>Sr. No.</th>
              <th style={{ width: '10%' , textAlign: 'center'}}>Name</th>
              <th style={{ width: '50%' , textAlign: 'center'}}>Description</th>
              <th style={{ width: '20%' , textAlign: 'center'}}>Thumbnail</th>
              <th style={{ width: '10%' , textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subcategory, index) => (
              <tr key={subcategory.Sub_Category_id}>
                <td style={{ textAlign: 'center', padding: '10px' }}> {index + 1}</td>
                <td style={{ textAlign: 'center', padding: '10px' }} > {subcategory.Sub_Category_Name}</td>
                <td style={{ whiteSpace: 'normal', textAlign: 'center', wordWrap: 'break-word', padding: '10px'}}> {subcategory.Sub_Category_Description}</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={subcategory.Sub_Category_Thumbnail} alt="Thumbnail" style={{ width: '80px', height: '80px', cursor: 'pointer'}} onClick={() => handleOpenImageViewer(subcategory.Sub_Category_Thumbnail, subcategory.Sub_Category_Name)}/>
                </td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(subcategory)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(subcategory.Sub_Category_id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button as={Link} to={`/recipes/subcategory/${subcategory.Sub_Category_id}`} variant="secondary" size="sm">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AddSubCategory;
