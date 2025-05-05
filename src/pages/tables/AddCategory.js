// // export default AddCategory;
// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap'; // Import Spinner component
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom'; 
// import { BASE_URL } from "../../config/config"

// function AddCategory() {
//   const [showModal, setShowModal] = useState(false);
//   const [categoryName, setCategoryName] = useState('');
//   const [categoryDescription, setCategoryDescription] = useState('');
//   const [categoryThumbnail, setCategoryThumbnail] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editCategory, setEditCategory] = useState({
//     id: '',
//     name: '',
//     description: '',
//     thumbnail: null
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);
//   const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
//   const [subCategoryName, setSubCategoryName] = useState('');
//   const [subCategoryDescription, setSubCategoryDescription] = useState('');
//   const [subCategoryThumbnail, setSubCategoryThumbnail] = useState(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   const [subCategoryMessage, setSubCategoryMessage] = useState('');
//   const [subCategoryError, setSubCategoryError] = useState('');

//   const [loading, setLoading] = useState(false); 
//   const [showImageViewer, setShowImageViewer] = useState(false);
//   const [selectedImage, setSelectedImage] = useState('');

//   useEffect(() => {
//     fetchCategories();
//     const storedCategory = JSON.parse(localStorage.getItem('editedCategory'));
//     if (storedCategory) {
//       setEditCategory(storedCategory);
//       setIsEditing(true);
//       handleShow();
//     }
//   }, []);


//   const fetchCategories = async () => {
//     setIsLoading(true);
  
//     try {
//       const response = await fetch(`${BASE_URL}/vcategories`);
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch categories. Please try again.');
//       }
  
//       const contentType = response.headers.get('content-type');
      
//       if (contentType && contentType.includes('application/json')) {
//         const data = await response.json();
//         setCategories(data);
//       } else {
//         throw new Error('Response is not in JSON format.');
//       }
  
//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       setIsLoading(false);
//       console.error('Error fetching categories:', error);
//     }
//   };


//   const handleClose = () => {
//     setShowModal(false);
//     resetMessages();
//     resetForm();
//     localStorage.removeItem('editedCategory'); // Clear stored category on modal close
//   };

//   const handleShow = () => setShowModal(true);

//   const resetForm = () => {
//     setCategoryName('');
//     setCategoryDescription('');
//     setCategoryThumbnail(null);
//     setEditCategory({
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
//     setLoading(true); // Set loading to true when submitting
//     const formData = new FormData();
//     formData.append('Category_Name', categoryName);
//     formData.append('Category_Description', categoryDescription);
//     formData.append('Category_Thumbnail', categoryThumbnail);

//     try {
//       const response = await fetch(`${BASE_URL}/acategories`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Category added successfully.');
//         setTimeout(() => {
//           handleClose();
//         }, 2000);
//         window.location.reload();
//       } else {
//         setError('Failed to add category. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error adding category:', error);
//     } finally {
//       setLoading(false); // Set loading to false when the operation completes
//     }
//   };

//   const handleEdit = async (category) => {
//     localStorage.setItem('editedCategory', JSON.stringify(category));
//     setIsEditing(true);
//     setEditCategory({
//       id: category.Category_id,
//       name: category.Category_Name,
//       description: category.Category_Description,
//       thumbnail: category.Category_Thumbnail
//     });
//     handleShow();
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditCategory(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleEditThumbnailChange = (e) => {
//     if (!e || !e.target || !e.target.files) {
//       console.error("Event, event target, or files not found.");
//       return;
//     }

//     const file = e.target.files[0];

//     if (!file) {
//       console.error("No file selected.");
//       return;
//     }

//     setEditCategory((prevState) => ({
//       ...prevState,
//       thumbnail: file,
//     }));
//   };

//   const handleEditSubmit = async () => {
//     setLoading(true); // Set loading to true when submitting
//     const formData = new FormData();
//     formData.append('Category_Name', editCategory.name);
//     formData.append('Category_Description', editCategory.description);
//     formData.append('Category_Thumbnail', editCategory.thumbnail);
  
//     try {
//       const response = await fetch(`${BASE_URL}/editcategories/${editCategory.id}`, {
//         method: 'PUT',
//         headers: {
//           // Remove the 'Content-Type' header to allow the browser to set it automatically
//         },
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Category updated successfully.');
//         // Update the category in the local state as well
//         setCategories(prevCategories => prevCategories.map(category =>
//           category.Category_id === editCategory.id ? { ...category, Category_Name: editCategory.name, Category_Description: editCategory.description, Category_Thumbnail: editCategory.thumbnail } : category
//         ));
        
//         setTimeout(() => {
//           handleClose();
//           window.location.reload();
//         }, 2000);
       
//       } else {
//         setError('Failed to update category. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error updating category:', error);
//     } finally {
//       setLoading(false); // Set loading to false when the operation completes
//     }
//   };
  
//   const handleDelete = (categoryId) => {
//     setCategoryToDelete(categoryId);
//     setShowDeleteConfirmation(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowDeleteConfirmation(false);
//     try {
//       const response = await fetch(`${BASE_URL}/dcategories/${categoryToDelete}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setMessage('Category deleted successfully.');
//         setTimeout(() => {
//         window.location.reload(); // Refresh the page after 1 second
//         }, 2000);
//         fetchCategories();
//       } else {
//         setError('Failed to delete category. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error deleting category:', error);
//     }
//   };

//   const DeleteConfirmationModal = () => {
//     const handleClose = () => setShowDeleteConfirmation(false);

//     return (
//       <Modal show={showDeleteConfirmation} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirmation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             No
//           </Button>
//           <Button variant="primary" onClick={handleDeleteConfirmed}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   };

//   const handleShowSubCategoryModal = (categoryId) => {
//     console.log("Selected Category ID:", categoryId); // Log the categoryId to the console
//     setSelectedCategoryId(categoryId);
//     setShowSubCategoryModal(true);
//   };

//   const handleCloseSubCategoryModal = () => {
//     setShowSubCategoryModal(false);
//     // Reset subcategory form fields
//     setSubCategoryName('');
//     setSubCategoryDescription('');
//     setSubCategoryThumbnail(null);
//   };

//   const handleOpenImageViewer = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setShowImageViewer(true);
//   };

//   const ImageViewerModal = () => (
//     <Modal show={showImageViewer} onHide={() => setShowImageViewer(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Thumbnail</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <img src={selectedImage} alt="Category Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} />
//       </Modal.Body>
//     </Modal>
//   );


//   const handleSubmitSubCategory = async () => {
//     setLoading(true); // Set loading to true when submitting
//     const formData = new FormData();
//     formData.append('Sub_Category_Name', subCategoryName);
//     formData.append('Sub_Category_Description', subCategoryDescription);
//     formData.append('Sub_Category_Thumbnail', subCategoryThumbnail);
//     formData.append('Category_id', selectedCategoryId); 
  
//     try {
//       const response = await fetch(`${BASE_URL}/addsubcategories`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setSubCategoryMessage('Subcategory added successfully.');
//         setCategories(prevCategories => [...prevCategories, data]); // Assuming data contains the newly added subcategory
//         setTimeout(() => {
//           handleCloseSubCategoryModal();
//           window.location.reload();
//         }, 2000);
//       } else {
//         setError('Failed to add subcategory. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error adding subcategory:', error);
//     } finally {
//       setLoading(false); // Set loading to false when the operation completes
//     }
//   };
  
  
//   return (
//     <div>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <Button variant="primary" size="sm" className="me-2" onClick={handleShow}>
//           <FontAwesomeIcon icon={faPlus} className="me-2" />Add Category
//         </Button>
//       </div>
  
//       <Modal show={showModal} onHide={handleClose} centered backdrop="static">
//         <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//           {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
//           {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//           <Form>
//             <Form.Group className="mb-3" controlId="formCategoryName">
//               <Form.Label>Category Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter category name" name="name" value={isEditing ? editCategory.name : categoryName} onChange={isEditing ? handleEditInputChange : (e) => setCategoryName(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formCategoryDescription">
//               <Form.Label>Category Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter category description" name="description" value={isEditing ? editCategory.description : categoryDescription} onChange={isEditing ? handleEditInputChange : (e) => setCategoryDescription(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formCategoryThumbnail">
//               <Form.Label>Category Thumbnail</Form.Label>
//               <Form.Control type="file" name="thumbnail" onChange={isEditing ? handleEditThumbnailChange : (e) => setCategoryThumbnail(e.target.files[0])} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="d-flex justify-content-center">
//   <Button
//     variant="primary"
//     onClick={isEditing ? handleEditSubmit : handleSubmit}
//     style={{ borderRadius: '40px', width: '100%' }}
//     disabled={loading} // Disable the button when loading
//   >
//     {loading ? (
//       <>
//         <Spinner animation="border" size="sm" />
//         <span className="ms-2">{isEditing ? 'Saving Changes...' : 'Adding...'}</span>
//       </>
//     ) : (
//       <span>{isEditing ? 'Save Changes' : 'Add Category'}</span>
//     )}
//   </Button>
// </Modal.Footer>

//       </Modal>

//       <Modal show={showSubCategoryModal} onHide={handleCloseSubCategoryModal} centered backdrop="static">
//         <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>Add Subcategory</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//           {subCategoryMessage && <p style={{ color: 'green', textAlign: 'center' }}>{subCategoryMessage}</p>}
//           {subCategoryError && <p style={{ color: 'red', textAlign: 'center' }}>{subCategoryError}</p>}
//           <Form>
//             <Form.Group className="mb-3" controlId="formSubCategoryName">
//               <Form.Label>Subcategory Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter subcategory name" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formSubCategoryDescription">
//               <Form.Label>Subcategory Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter subcategory description" value={subCategoryDescription} onChange={(e) => setSubCategoryDescription(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formSubCategoryThumbnail">
//               <Form.Label>Subcategory Thumbnail</Form.Label>
//               <Form.Control type="file" onChange={(e) => setSubCategoryThumbnail(e.target.files[0])} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//   <Button
//     variant="secondary"
//     onClick={handleCloseSubCategoryModal}
//     disabled={loading} // Disable the button when loading
//   >
//     Close
//   </Button>
//   <Button
//     variant="primary"
//     onClick={handleSubmitSubCategory}
//     disabled={loading} // Disable the button when loading
//   >
//     {loading ? (
//       <>
//         <Spinner animation="border" size="sm" />
//         <span className="ms-2">Adding...</span>
//       </>
//     ) : (
//       <span>Add Subcategory</span>
//     )}
//   </Button>
// </Modal.Footer>

//       </Modal>

//       <DeleteConfirmationModal />
  

//       <ImageViewerModal/>
//       <div className="mt-4">
//         <h2>Categories</h2>
//         {isLoading && (
//           <div className="mt-3">
//             <Button variant="primary" type="submit" disabled>
//               <Spinner animation="border" size="sm" />
//               <span className="ms-2">Loading...</span>
//             </Button>
//           </div>
//         )}
//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th style={{ width: '10%' ,textAlign: 'center', }} >Category ID</th>
//               <th style={{ width: '10%' ,textAlign: 'center', }} >Category Name</th>
//               <th style={{ width: '50%' ,textAlign: 'center', }}  >Category Description</th>
//               <th style={{ width: '10%' ,textAlign: 'center', }} >Category Thumbnail</th>
//               <th style={{ width: '20%' ,textAlign: 'center', }} >Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map(category => (
//               <tr key={category.Category_id}>
//                 <td style={{ textAlign: 'center', padding: '10px' }} >{category.Category_id}</td>

//                 <td style={{ textAlign: 'center' , padding: '10px' }} >{category.Category_Name}</td>

//                 <td style={{ whiteSpace: 'normal', textAlign: 'center', wordWrap: 'break-word', padding: '10px' }} >{category.Category_Description}</td>

//                 <td style={{ textAlign: 'center' }} ><img src={category.Category_Thumbnail} alt={category.Category_Name} style={{ width: '80px', height: '80px', cursor: 'pointer'}} onClick={() => handleOpenImageViewer(category.Category_Thumbnail)} /></td>
//                 <td>
//                 <Button variant="primary" size="sm" onClick={() => handleShowSubCategoryModal(category.Category_id)}>
//                   <FontAwesomeIcon icon={faPlus} /> 
//                 </Button>{'  '}

//                   <Button variant="info" size="sm" onClick={() => handleEdit(category)}><FontAwesomeIcon icon={faEdit} /></Button>{'  '}

//                   <Button variant="danger" size="sm" onClick={() => handleDelete(category.Category_id)}><FontAwesomeIcon icon={faTrash} /></Button>{'  '}

//                   <Button as={Link} to={`/add-subcategory/${category.Category_id}`} variant="secondary" size="sm">
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                   </Button>{''}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default AddCategory;
















// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import { BASE_URL } from "../../config/config";

// function AddCategory() {
//   const [showModal, setShowModal] = useState(false);
//   const [categoryName, setCategoryName] = useState('');
//   const [categoryDescription, setCategoryDescription] = useState('');
//   const [categoryThumbnail, setCategoryThumbnail] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [editCategory, setEditCategory] = useState({
//     id: '',
//     name: '',
//     description: '',
//     thumbnail: null
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);
//   const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
//   const [subCategoryName, setSubCategoryName] = useState('');
//   const [subCategoryDescription, setSubCategoryDescription] = useState('');
//   const [subCategoryThumbnail, setSubCategoryThumbnail] = useState(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

//   const [subCategoryMessage, setSubCategoryMessage] = useState('');
//   const [subCategoryError, setSubCategoryError] = useState('');

//   const [loading, setLoading] = useState(false);
//   const [showImageViewer, setShowImageViewer] = useState(false);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [ImageCategoryName, setImageCategoryName] = useState('');

//   useEffect(() => {
//     fetchCategories();
//     const storedCategory = JSON.parse(localStorage.getItem('editedCategory'));
//     if (storedCategory) {
//       setEditCategory(storedCategory);
//       setIsEditing(true);
//       handleShow();
//     }
//   }, []);

//   const fetchCategories = async () => {
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${BASE_URL}/vcategories`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch categories. Please try again.');
//       }

//       const contentType = response.headers.get('content-type');

//       if (contentType && contentType.includes('application/json')) {
//         const data = await response.json();
//         setCategories(data);
//       } else {
//         throw new Error('Response is not in JSON format.');
//       }

//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       setIsLoading(false);
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetMessages();
//     resetForm();
//     localStorage.removeItem('editedCategory'); // Clear stored category on modal close
//   };

//   const handleShow = () => setShowModal(true);

//   const resetForm = () => {
//     setCategoryName('');
//     setCategoryDescription('');
//     setCategoryThumbnail(null);
//     setEditCategory({
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
//     setSubCategoryMessage('');
//     setSubCategoryError('');
//   };

//   const handleSubmit = async () => {
//     setLoading(true); // Set loading to true when submitting
//     const formData = new FormData();
//     formData.append('Category_Name', categoryName);
//     formData.append('Category_Description', categoryDescription);
//     formData.append('Category_Thumbnail', categoryThumbnail);

//     try {
//       const response = await fetch(`${BASE_URL}/acategories`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Category added successfully.');
//         setTimeout(() => {
//           handleClose();
//         }, 2000);
//         window.location.reload();
//       } else {
//         setError('Failed to add category. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error adding category:', error);
//     } finally {
//       setLoading(false); // Set loading to false when the operation completes
//     }
//   };

//   const handleEdit = async (category) => {
//     localStorage.setItem('editedCategory', JSON.stringify(category));
//     setIsEditing(true);
//     setEditCategory({
//       id: category.Category_id,
//       name: category.Category_Name,
//       description: category.Category_Description,
//       thumbnail: category.Category_Thumbnail
//     });
//     handleShow();
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditCategory(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleEditThumbnailChange = (e) => {
//     if (!e || !e.target || !e.target.files) {
//       console.error("Event, event target, or files not found.");
//       return;
//     }

//     const file = e.target.files[0];

//     if (!file) {
//       console.error("No file selected.");
//       return;
//     }

//     setEditCategory((prevState) => ({
//       ...prevState,
//       thumbnail: file,
//     }));
//   };

//   const handleEditSubmit = async () => {
//     setLoading(true); // Set loading to true when submitting
//     const formData = new FormData();
//     formData.append('Category_Name', editCategory.name);
//     formData.append('Category_Description', editCategory.description);
//     formData.append('Category_Thumbnail', editCategory.thumbnail);

//     try {
//       const response = await fetch(`${BASE_URL}/editcategories/${editCategory.id}`, {
//         method: 'PUT',
//         headers: {
//           // Remove the 'Content-Type' header to allow the browser to set it automatically
//         },
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Category updated successfully.');
//         // Update the category in the local state as well
//         setCategories(prevCategories => prevCategories.map(category =>
//           category.Category_id === editCategory.id ? { ...category, Category_Name: editCategory.name, Category_Description: editCategory.description, Category_Thumbnail: editCategory.thumbnail } : category
//         ));

//         setTimeout(() => {
//           handleClose();
//           window.location.reload();
//         }, 2000);

//       } else {
//         setError('Failed to update category. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error updating category:', error);
//     } finally {
//       setLoading(false); // Set loading to false when the operation completes
//     }
//   };

//   const handleDelete = (categoryId) => {
//     setCategoryToDelete(categoryId);
//     setShowDeleteConfirmation(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowDeleteConfirmation(false);
//     try {
//       const response = await fetch(`${BASE_URL}/dcategories/${categoryToDelete}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setMessage('Category deleted successfully.');
//         setTimeout(() => {
//           window.location.reload(); // Refresh the page after 1 second
//         }, 2000);
//         fetchCategories();
//       } else {
//         setError('Failed to delete category. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error deleting category:', error);
//     }
//   };

//   const DeleteConfirmationModal = () => {
//     const handleClose = () => setShowDeleteConfirmation(false);

//     return (
//       <Modal show={showDeleteConfirmation} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirmation</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             No
//           </Button>
//           <Button variant="primary" onClick={handleDeleteConfirmed}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   };

//   const handleShowSubCategoryModal = (categoryId) => {
//     setSelectedCategoryId(categoryId);
//     setShowSubCategoryModal(true);
//   };

//   const handleCloseSubCategoryModal = () => {
//     setShowSubCategoryModal(false);
//     // Reset subcategory form fields
//     setSubCategoryName('');
//     setSubCategoryDescription('');
//     setSubCategoryThumbnail(null);
//     // Reset error messages
//     setSubCategoryError('');
//     setSubCategoryMessage('');
//   };

//   const handleOpenImageViewer = (imageUrl, Category_Name) => {
//     setSelectedImage(imageUrl);
//     setImageCategoryName(Category_Name);
//     setShowImageViewer(true);
//   };

//   const ImageViewerModal = () => (
//     <Modal show={showImageViewer} onHide={() => setShowImageViewer(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{ImageCategoryName}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <img src={selectedImage} alt="Category Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} />
//       </Modal.Body>
//     </Modal>
//   );

//   const handleSubmitSubCategory = async () => {
//     setLoading(true); // Set loading to true when submitting
//     const formData = new FormData();
//     formData.append('Sub_Category_Name', subCategoryName);
//     formData.append('Sub_Category_Description', subCategoryDescription);
//     formData.append('Sub_Category_Thumbnail', subCategoryThumbnail);
//     formData.append('Category_id', selectedCategoryId);

//     try {
//       const response = await fetch(`${BASE_URL}/addsubcategories`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setSubCategoryMessage('Subcategory added successfully.');
//         setCategories(prevCategories => [...prevCategories, data]); // Assuming data contains the newly added subcategory
//         setTimeout(() => {
//           handleCloseSubCategoryModal();
//           window.location.reload();
//         }, 2000);
//       } else {
//         const errorMessage = await response.text(); // Extract the error message from the response
//         setSubCategoryError(errorMessage); // Set the subCategoryError state with the error message
//       }
//     } catch (error) {
//       setSubCategoryError('Network error. Please try again.'); // Set a generic error message for network errors
//       console.error('Error adding subcategory:', error);
//     } finally {
//       setLoading(false); // Set loading to false when the operation completes
//     }
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <Button variant="primary" size="sm" className="me-2" onClick={handleShow}>
//           <FontAwesomeIcon icon={faPlus} className="me-2" />Add Category
//         </Button>
//       </div>

//       <Modal show={showModal} onHide={handleClose} centered backdrop="static">
//         <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//           {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
//           {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//           <Form>
//             <Form.Group className="mb-3" controlId="formCategoryName">
//               <Form.Label>Category Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter category name" name="name" value={isEditing ? editCategory.name : categoryName} onChange={isEditing ? handleEditInputChange : (e) => setCategoryName(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formCategoryDescription">
//               <Form.Label>Category Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter category description" name="description" value={isEditing ? editCategory.description : categoryDescription} onChange={isEditing ? handleEditInputChange : (e) => setCategoryDescription(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formCategoryThumbnail">
//               <Form.Label>Category Thumbnail</Form.Label>
//               <Form.Control type="file" name="thumbnail" onChange={isEditing ? handleEditThumbnailChange : (e) => setCategoryThumbnail(e.target.files[0])} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className="d-flex justify-content-center">
//           <Button
//             variant="primary"
//             onClick={isEditing ? handleEditSubmit : handleSubmit}
//             style={{ borderRadius: '40px', width: '100%' }}
//             disabled={loading} // Disable the button when loading
//           >
//             {loading ? (
//               <>
//                 <Spinner animation="border" size="sm" />
//                 <span className="ms-2">{isEditing ? 'Saving Changes...' : 'Adding...'}</span>
//               </>
//             ) : (
//               <span>{isEditing ? 'Save Changes' : 'Add Category'}</span>
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showSubCategoryModal} onHide={handleCloseSubCategoryModal} centered backdrop="static">
//         <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>Add Subcategory</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//           {subCategoryMessage && <p style={{ color: 'green', textAlign: 'center' }}>{subCategoryMessage}</p>}
//           {subCategoryError && <p style={{ color: 'red', textAlign: 'center' }}>{subCategoryError}</p>}
//           <Form>
//             <Form.Group className="mb-3" controlId="formSubCategoryName">
//               <Form.Label>Subcategory Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter subcategory name" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formSubCategoryDescription">
//               <Form.Label>Subcategory Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter subcategory description" value={subCategoryDescription} onChange={(e) => setSubCategoryDescription(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formSubCategoryThumbnail">
//               <Form.Label>Subcategory Thumbnail</Form.Label>
//               <Form.Control type="file" onChange={(e) => setSubCategoryThumbnail(e.target.files[0])} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={handleCloseSubCategoryModal}
//             disabled={loading} // Disable the button when loading
//           >
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleSubmitSubCategory}
//             disabled={loading} // Disable the button when loading
//           >
//             {loading ? (
//               <>
//                 <Spinner animation="border" size="sm" />
//                 <span className="ms-2">Adding...</span>
//               </>
//             ) : (
//               <span>Add Subcategory</span>
//             )}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <DeleteConfirmationModal />

//       <ImageViewerModal/>
//       <div className="mt-4">
//         <h2>Categories</h2>
//         {isLoading && (
//           <div className="mt-3">
//             <Button variant="primary" type="submit" disabled>
//               <Spinner animation="border" size="sm" />
//               <span className="ms-2">Loading...</span>
//             </Button>
//           </div>
//         )}
//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th style={{ width: '10%', textAlign: 'center' }}>Sr. No.</th>
//               <th style={{ width: '10%', textAlign: 'center' }}>Category Name</th>
//               <th style={{ width: '50%', textAlign: 'center' }}>Category Description</th>
//               <th style={{ width: '10%', textAlign: 'center' }}>Category Thumbnail</th>
//               <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((category, index) => (
//               <tr key={category.Category_id}>
//                 <td style={{ textAlign: 'center', padding: '10px' }}>{index + 1}</td>
//                 <td style={{ textAlign: 'center', padding: '10px' }}>{category.Category_Name}</td>
//                 <td style={{ whiteSpace: 'normal', textAlign: 'center', wordWrap: 'break-word', padding: '10px' }}>{category.Category_Description}</td>
//                 <td style={{ textAlign: 'center' }}><img src={category.Category_Thumbnail} alt={category.Category_Name} style={{ width: '80px', height: '80px', cursor: 'pointer'}} onClick={() => handleOpenImageViewer(category.Category_Thumbnail, category.Category_Name)} /></td>
//                 <td>
//                   <Button variant="primary" size="sm" onClick={() => handleShowSubCategoryModal(category.Category_id)}>
//                     <FontAwesomeIcon icon={faPlus} />
//                   </Button>{'  '}
//                   <Button variant="info" size="sm" onClick={() => handleEdit(category)}><FontAwesomeIcon icon={faEdit} /></Button>{'  '}
//                   <Button variant="danger" size="sm" onClick={() => handleDelete(category.Category_id)}><FontAwesomeIcon icon={faTrash} /></Button>{'  '}
//                   <Button as={Link} to={`/add-subcategory/${category.Category_id}`} variant="secondary" size="sm">
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                   </Button>{''}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default AddCategory;






import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../../config/config";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
function AddCategory() {
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryThumbnail, setCategoryThumbnail] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editCategory, setEditCategory] = useState({
    id: '',
    name: '',
    description: '',
    thumbnail: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [subCategoryThumbnail, setSubCategoryThumbnail] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [subCategoryMessage, setSubCategoryMessage] = useState('');
  const [subCategoryError, setSubCategoryError] = useState('');

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5); // Number of categories per page

  const [selectedImage, setSelectedImage] = useState(null);
const [ImageCategoryName, setImageCategoryName] = useState('');
const [showImageViewer, setShowImageViewer] = useState(false);


  useEffect(() => {
    fetchCategories();
    const storedCategory = JSON.parse(localStorage.getItem('editedCategory'));
    if (storedCategory) {
      setEditCategory(storedCategory);
      setIsEditing(true);
      handleShow();
    }
  }, []);
  const fetchCategories = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`${BASE_URL}/vcategories`, {
        headers: {
          "ngrok-skip-browser-warning": "true" // Bypass Ngrok warning page
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch categories. Please try again.');
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error('Response is not in JSON format.');
      }
  
      setIsLoading(false);
    } catch (error) {
      setError(error.message || 'Network error. Please try again.');
      setIsLoading(false);
      console.error('Error fetching categories:', error);
    }
  };
  

  const handleClose = () => {
    setShowModal(false);
    resetMessages();
    resetForm();
    localStorage.removeItem('editedCategory'); // Clear stored category on modal close
  };

  const handleShow = () => setShowModal(true);

  const resetForm = () => {
    setCategoryName('');
    setCategoryDescription('');
    setCategoryThumbnail(null);
    setEditCategory({
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
    setSubCategoryMessage('');
    setSubCategoryError('');
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submitting
    const formData = new FormData();
    formData.append('Category_Name', categoryName);
    formData.append('Category_Description', categoryDescription);
    formData.append('Category_Thumbnail', categoryThumbnail);

    try {
      const response = await fetch(`${BASE_URL}/acategories`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Category added successfully.');
        setTimeout(() => {
          handleClose();
        }, 2000);
        window.location.reload();
      } else {
        setError('Failed to add category. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error adding category:', error);
    } finally {
      setLoading(false); // Set loading to false when the operation completes
    }
  };

  const handleEdit = async (category) => {
    localStorage.setItem('editedCategory', JSON.stringify(category));
    setIsEditing(true);
    setEditCategory({
      id: category.Category_id,
      name: category.Category_Name,
      description: category.Category_Description,
      thumbnail: category.Category_Thumbnail
    });
    handleShow();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCategory(prevState => ({
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

    setEditCategory((prevState) => ({
      ...prevState,
      thumbnail: file,
    }));
  };

  const handleEditSubmit = async () => {
    setLoading(true); // Set loading to true when submitting
    const formData = new FormData();
    formData.append('Category_Name', editCategory.name);
    formData.append('Category_Description', editCategory.description);
    formData.append('Category_Thumbnail', editCategory.thumbnail);

    try {
      const response = await fetch(`${BASE_URL}/editcategories/${editCategory.id}`, {
        method: 'PUT',
        headers: {
          // Remove the 'Content-Type' header to allow the browser to set it automatically
        },
        body: formData,
      });
      if (response.ok) {
        setMessage('Category updated successfully.');
        // Update the category in the local state as well
        setCategories(prevCategories => prevCategories.map(category =>
          category.Category_id === editCategory.id ? { ...category, Category_Name: editCategory.name, Category_Description: editCategory.description, Category_Thumbnail: editCategory.thumbnail } : category
        ));

        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 2000);

      } else {
        setError('Failed to update category. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error updating category:', error);
    } finally {
      setLoading(false); // Set loading to false when the operation completes
    }
  };

  const handleDelete = (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = async () => {
    setShowDeleteConfirmation(false);
    try {
      const response = await fetch(`${BASE_URL}/dcategories/${categoryToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Category deleted successfully.');
        setTimeout(() => {
          window.location.reload(); // Refresh the page after 1 second
        }, 2000);
        fetchCategories();
      } else {
        setError('Failed to delete category. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error deleting category:', error);
    }
  };

  const DeleteConfirmationModal = () => {
    const handleClose = () => setShowDeleteConfirmation(false);

    return (
      <Modal show={showDeleteConfirmation} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirmed}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleShowSubCategoryModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowSubCategoryModal(true);
  };

  const handleCloseSubCategoryModal = () => {
    setShowSubCategoryModal(false);
    // Reset subcategory form fields
    setSubCategoryName('');
    setSubCategoryDescription('');
    setSubCategoryThumbnail(null);
    // Reset error messages
    setSubCategoryError('');
    setSubCategoryMessage('');
  };

  const handleOpenImageViewer = (imageUrl, Category_Name) => {
    setSelectedImage(imageUrl);
    setImageCategoryName(Category_Name);
    setShowImageViewer(true);
  };

  const ImageViewerModal = () => (
    <Modal show={showImageViewer} onHide={() => setShowImageViewer(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{ImageCategoryName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={selectedImage} alt="Category Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Modal.Body>
    </Modal>
  );

  const handleSubmitSubCategory = async () => {
    setLoading(true); // Set loading to true when submitting
    const formData = new FormData();
    formData.append('Sub_Category_Name', subCategoryName);
    formData.append('Sub_Category_Description', subCategoryDescription);
    formData.append('Sub_Category_Thumbnail', subCategoryThumbnail);
    formData.append('Category_id', selectedCategoryId);

    try {
      const response = await fetch(`${BASE_URL}/addsubcategories`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setSubCategoryMessage('Subcategory added successfully.');
        setCategories(prevCategories => [...prevCategories, data]); // Assuming data contains the newly added subcategory
        setTimeout(() => {
          handleCloseSubCategoryModal();
          window.location.reload();
        }, 2000);
      } else {
        const errorMessage = await response.text(); // Extract the error message from the response
        setSubCategoryError(errorMessage); // Set the subCategoryError state with the error message
      }
    } catch (error) {
      setSubCategoryError('Network error. Please try again.'); // Set a generic error message for network errors
      console.error('Error adding subcategory:', error);
    } finally {
      setLoading(false); // Set loading to false when the operation completes
    }
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button variant="primary" size="sm" className="me-2" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />Add Category
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
          <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderRadius: '90px' }}>
          {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <Form>
            <Form.Group className="mb-3" controlId="formCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name" name="name" value={isEditing ? editCategory.name : categoryName} onChange={isEditing ? handleEditInputChange : (e) => setCategoryName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryDescription">
              <Form.Label>Category Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter category description" name="description" value={isEditing ? editCategory.description : categoryDescription} onChange={isEditing ? handleEditInputChange : (e) => setCategoryDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCategoryThumbnail">
              <Form.Label>Category Thumbnail</Form.Label>
              <Form.Control type="file" name="thumbnail" onChange={isEditing ? handleEditThumbnailChange : (e) => setCategoryThumbnail(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={isEditing ? handleEditSubmit : handleSubmit}
            style={{ borderRadius: '40px', width: '100%' }}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                <span className="ms-2">{isEditing ? 'Saving Changes...' : 'Adding...'}</span>
              </>
            ) : (
              <span>{isEditing ? 'Save Changes' : 'Add Category'}</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSubCategoryModal} onHide={handleCloseSubCategoryModal} centered backdrop="static">
        <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
          <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>Add Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderRadius: '90px' }}>
          {subCategoryMessage && <p style={{ color: 'green', textAlign: 'center' }}>{subCategoryMessage}</p>}
          {subCategoryError && <p style={{ color: 'red', textAlign: 'center' }}>{subCategoryError}</p>}
          <Form>
            <Form.Group className="mb-3" controlId="formSubCategoryName">
              <Form.Label>Subcategory Name</Form.Label>
              <Form.Control type="text" placeholder="Enter subcategory name" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubCategoryDescription">
              <Form.Label>Subcategory Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter subcategory description" value={subCategoryDescription} onChange={(e) => setSubCategoryDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSubCategoryThumbnail">
              <Form.Label>Subcategory Thumbnail</Form.Label>
              <Form.Control type="file" onChange={(e) => setSubCategoryThumbnail(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseSubCategoryModal}
            disabled={loading} // Disable the button when loading
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitSubCategory}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" />
                <span className="ms-2">Adding...</span>
              </>
            ) : (
              <span>Add Subcategory</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteConfirmationModal />

      <ImageViewerModal/>
      <div className="mt-4">
        <h2>Categories</h2>
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
              <th style={{ width: '10%', textAlign: 'center' }}>Sr. No.</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Category Name</th>
              <th style={{ width: '50%', textAlign: 'center' }}>Category Description</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Category Thumbnail</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentCategories.map((category, index) => (
              <tr key={category.Category_id}>
                <td style={{ textAlign: 'center', padding: '10px' }}>{index + 1 + (currentPage - 1) * categoriesPerPage}</td>
                <td style={{ textAlign: 'center', padding: '10px' }}>{category.Category_Name}</td>
                <td style={{ whiteSpace: 'normal', textAlign: 'center', wordWrap: 'break-word', padding: '10px' }}>{category.Category_Description}</td>
                <td style={{ textAlign: 'center' }}>
                  <img src={category.Category_Thumbnail} alt={category.Category_Name} style={{ width: '80px', height: '80px', cursor: 'pointer'}} onClick={() => handleOpenImageViewer(category.Category_Thumbnail, category.Category_Name)} />
                </td>
                <td>
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleShowSubCategoryModal(category.Category_id)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(category)}><FontAwesomeIcon icon={faEdit} /></Button>
                  <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(category.Category_id)}><FontAwesomeIcon icon={faTrash} /></Button>
                  <Button as={Link} to={`/add-subcategory/${category.Category_id}`} variant="secondary" size="sm">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(categories.length / categoriesPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)} style={index + 1 === currentPage ? { backgroundColor: '#388377', color: '#fff' } : {}}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default AddCategory;
