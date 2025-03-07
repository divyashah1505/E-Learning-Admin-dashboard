// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Button, Modal, Form, Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { BASE_URL } from "../../config/config";

// function AddRecipe() {
//   const { subcategoryId } = useParams();
//   const [showModal, setShowModal] = useState(false);
//   const [recipeTitle, setRecipeTitle] = useState('');
//   const [recipeDescription, setRecipeDescription] = useState('');
//   const [recipeThumbnail, setRecipeThumbnail] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [recipes, setRecipes] = useState([]);
//   const [editRecipe, setEditRecipe] = useState({
//     id: '',
//     title: '',
//     description: '',
//     thumbnail: null
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [recipeToDelete, setRecipeToDelete] = useState(null);

//   useEffect(() => {
//     if (subcategoryId) {
//         fetchRecipes(subcategoryId); // Pass the subcategory ID to fetchRecipes
//       }
//     }, [subcategoryId]);

//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch recipes. Please try again.');
//       }
//       const data = await response.json();
//       setRecipes(data);
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetMessages();
//     resetForm();
//   };

//   const handleShow = () => setShowModal(true);

//   const resetForm = () => {
//     setRecipeTitle('');
//     setRecipeDescription('');
//     setRecipeThumbnail(null);
//     setEditRecipe({
//       id: '',
//       title: '',
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
//     formData.append('Recipe_Title', recipeTitle);
//     formData.append('Recipe_Description', recipeDescription);
//     formData.append('Recipe_Thumbnail', recipeThumbnail);
//     formData.append('Sub_Category_id', subcategoryId);
  
//     try {
//       const response = await fetch(`${BASE_URL}/admin/uploadrecipe`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Recipe added successfully.');
//         fetchRecipes();
//         handleClose();
//       } else {
//         setError('Failed to add recipe. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error adding recipe:', error);
//     }
//   };  

//   const handleEdit = (recipe) => {
//     setIsEditing(true);
//     setEditRecipe({
//       id: recipe.Recipe_id,
//       title: recipe.Recipe_Title,
//       description: recipe.Recipe_Description,
//       thumbnail: recipe.Recipe_Thumbnail
//     });
//     handleShow();
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditRecipe(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleEditThumbnailChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setEditRecipe(prevState => ({
//         ...prevState,
//         thumbnail: e.target.files[0],
//       }));
//     }
//   };

//   const handleEditSubmit = async () => {
//     const formData = new FormData();
//     formData.append('Recipe_Title', editRecipe.title);
//     formData.append('Recipe_Description', editRecipe.description);
//     formData.append('Recipe_Thumbnail', editRecipe.thumbnail);

//     try {
//       const response = await fetch(`${BASE_URL}/admin/recipes/${editRecipe.id}`, {
//         method: 'PUT',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Recipe updated successfully.');
//         fetchRecipes();
//         handleClose();
//       } else {
//         setError('Failed to update recipe. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error updating recipe:', error);
//     }
//   };

//   const handleDelete = (recipeId) => {
//     setRecipeToDelete(recipeId);
//     setShowDeleteConfirmation(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/recipes/${recipeToDelete}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setMessage('Recipe deleted successfully.');
//         setTimeout(() => {
//             window.location.reload();
//         }, 2000);
//         fetchRecipes();
//         setShowDeleteConfirmation(false);
//       } else {
//         setError('Failed to delete recipe. Please try again.');
//         setShowDeleteConfirmation(false);
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       setShowDeleteConfirmation(false);
//       console.error('Error deleting recipe:', error);
//     }
//   };

//   const DeleteConfirmationModal = () => (
//     <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
//         <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   return (
//     <div>
//       <div className='mt-4'>
//         <Button as={Link} to={`/upload-recipe`} variant="primary" size="sm">
//           <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Recipe
//         </Button>
//       </div>

//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton  style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
//             {isEditing ? 'Edit Recipe' : 'Add Recipe'}</Modal.Title>
//           </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//         {message && <div className="alert alert-success">{message}</div>}
//         {error && <div className="alert alert-danger">{error}</div>}
//           <Form>
//             <Form.Group className="mb-3" controlId="recipeTitle">
//               <Form.Label>Recipe Title</Form.Label>
//               <Form.Control type="text" placeholder="Enter recipe title" name="title"
//                 value={isEditing ? editRecipe.title : recipeTitle} onChange={isEditing ? handleEditInputChange : (e) => setRecipeTitle(e.target.value)} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="recipeDescription">
//               <Form.Label>Recipe Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter recipe description" name="description"
//                 value={isEditing ? editRecipe.description : recipeDescription} onChange={isEditing ? handleEditInputChange : (e) => setRecipeDescription(e.target.value)} />
//             </Form.Group>

//             <Form.Group controlId="recipeThumbnail">
//               <Form.Label>Recipe Thumbnail</Form.Label>
//               <Form.Control type="file" accept="image/*" name="thumbnail"
//                 onChange={isEditing ? handleEditThumbnailChange : (e) => setRecipeThumbnail(e.target.files[0])} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit}>
//             {isEditing ? 'Save Changes' : 'Add'}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <DeleteConfirmationModal />

//       <div className="mt-4">
//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th style={{ width: '10%' , textAlign: 'center' }}>Recipe ID</th>
//               <th style={{ width: '10%' , textAlign: 'center' }}>Recipe Title</th>
//               <th style={{ width: '50%' , textAlign: 'center' }}>Recipe Description</th>
//               <th style={{ width: '20%' , textAlign: 'center' }}>Recipe Thumbnail</th>
//               <th style={{ width: '10%' , textAlign: 'center' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recipes.map((recipe) => (
//               <tr key={recipe.Recipe_id}>
//                 <td style={{ textAlign: 'center', padding: '10px' }}> {recipe.Recipe_id}</td>
//                 <td style={{ textAlign: 'center', padding: '10px' }}> {recipe.Recipe_Title}</td>
//                 <td style={{ textAlign: 'center' , whiteSpace: 'normal', wordWrap: 'break-word', padding: '10px' }}> {recipe.Recipe_Description} </td>
//                 <td style={{ textAlign: 'center' }}>
//                   <img src={recipe.Recipe_Thumbnail} alt="Thumbnail" style={{ width: '80px', height: '80px' }} />
//                 </td>
//                 <td>
//                   <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(recipe)}>
//                     <FontAwesomeIcon icon={faEdit} />
//                   </Button>
//                   <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(recipe.Recipe_id)}>
//                     <FontAwesomeIcon icon={faTrash} />
//                   </Button>
//                   <Button as={Link} to={`/recipes/${recipe.Recipe_id}`} variant="secondary" size="sm">
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default AddRecipe;










// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Button, Modal, Form, Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { BASE_URL } from "../../config/config";

// function AddRecipe() {
//   const { subcategoryId } = useParams();
//   const [showModal, setShowModal] = useState(false);
//   const [recipeTitle, setRecipeTitle] = useState('');
//   const [recipeCookingTime, setRecipeCookingTime] = useState('');
//   const [recipeDescription, setRecipeDescription] = useState('');
//   const [recipeThumbnail, setRecipeThumbnail] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [recipes, setRecipes] = useState([]);
//   const [editRecipe, setEditRecipe] = useState({
//     id: '',
//     title: '',
//     description: '',
//     thumbnail: null,
//     cookingTime: '',
//     featured: null,
//     ingredients: '',
//     video: '',
//     nutritionalInfo: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [recipeToDelete, setRecipeToDelete] = useState(null);

//   useEffect(() => {
//     if (subcategoryId) {
//       fetchRecipes(subcategoryId);
//     }
//   }, [subcategoryId]);

//   useEffect(() => {
//     if (isEditing && editRecipe.featured === null && recipes.length > 0) {
//       const currentRecipe = recipes.find(recipe => recipe.Recipe_id === editRecipe.id);
//       if (currentRecipe) {
//         setEditRecipe(prevState => ({
//           ...prevState,
//           featured: currentRecipe.Featured,
//           cookingTime: currentRecipe.Recipe_Cooking_Time,
//           nutritionalInfo: currentRecipe.Recipe_Nutritional_Info
//         }));
//       }
//     }
//   }, [isEditing, editRecipe.featured, editRecipe.id, recipes, fetchRecipes]);

//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch recipes. Please try again.');
//       }
//       const data = await response.json();
//       setRecipes(data);
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     resetMessages();
//     resetForm();
//   };

//   const handleShow = () => setShowModal(true);

//   const resetForm = () => {
//     setRecipeTitle('');
//     setRecipeDescription('');
//     setRecipeThumbnail(null);
//     setEditRecipe({
//       id: '',
//       title: '',
//       description: '',
//       thumbnail: null,
//       cookingTime: '',
//       featured: null,
//       ingredients: '',
//       video: '',
//       nutritionalInfo: ''
//     });
//     setIsEditing(false);
//   };

//   const resetMessages = () => {
//     setMessage('');
//     setError('');
//   };

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('Recipe_Title', recipeTitle);
//     formData.append('Recipe_Description', recipeDescription);
//     formData.append('Recipe_Thumbnail', recipeThumbnail);
//     formData.append('Sub_Category_id', subcategoryId);
  
//     try {
//       const response = await fetch(`${BASE_URL}/uploadrecipe`, {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Recipe added successfully.');
//         fetchRecipes();
//         handleClose();
//       } else {
//         setError('Failed to add recipe. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error adding recipe:', error);
//     }
//   };  

//   const handleEdit = (recipe) => {
//     setIsEditing(true);
//     setEditRecipe({
//       id: recipe.Recipe_id,
//       title: recipe.Recipe_Title,
//       description: recipe.Recipe_Description,
//       thumbnail: recipe.Recipe_Thumbnail,
//       cookingTime: recipe.Recipe_Cooking_Time || '',
//       featured: recipe.Featured,
//       ingredients: recipe.Ingredients || '',
//       video: recipe.Video || '',
//       nutritionalInfo: recipe.Recipe_Nutritional_Info
//     });
//     handleShow();
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       setEditRecipe(prevState => ({
//         ...prevState,
//         [name]: e.target.checked
//       }));
//     } else {
//       setEditRecipe(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     }
//   };

//   const handleEditThumbnailChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setEditRecipe(prevState => ({
//         ...prevState,
//         thumbnail: e.target.files[0],
//       }));
//     }
//   };

//   const handleEditVideoChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setEditRecipe(prevState => ({
//         ...prevState,
//         video: e.target.files[0],
//       }));
//     }
//   };

//   const handleEditSubmit = async () => {
//     const formData = new FormData();
//     formData.append('Recipe_Title', editRecipe.title);
//     formData.append('Recipe_CookingTime', editRecipe.cookingTime);
//     formData.append('Featured', editRecipe.featured); 
//     formData.append('Recipe_Description', editRecipe.description);
//     formData.append('Ingredients', editRecipe.ingredients);
//     formData.append('Recipe_Thumbnail', editRecipe.thumbnail);
//     formData.append('Video', editRecipe.video);
//     formData.append('Recipe_Nutritional_Info', editRecipe.nutritionalInfo);

//     try {
//       const response = await fetch(`${BASE_URL}/recipes/${editRecipe.id}`, {
//         method: 'PUT',
//         body: formData,
//       });
//       if (response.ok) {
//         setMessage('Recipe updated successfully.');
//         fetchRecipes();
//         handleClose();
//       } else {
//         setError('Failed to update recipe. Please try again.');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       console.error('Error updating recipe:', error);
//     }
//   };

//   const handleDelete = (recipeId) => {
//     setRecipeToDelete(recipeId);
//     setShowDeleteConfirmation(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/recipes/${recipeToDelete}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setMessage('Recipe deleted successfully.');
//         setTimeout(() => {
//             window.location.reload();
//         }, 2000);
//         fetchRecipes();
//         setShowDeleteConfirmation(false);
//       } else {
//         setError('Failed to delete recipe. Please try again.');
//         setShowDeleteConfirmation(false);
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       setShowDeleteConfirmation(false);
//       console.error('Error deleting recipe:', error);
//     }
//   };

//   const DeleteConfirmationModal = () => (
//     <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
//         <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
//       </Modal.Footer>
//     </Modal>
//   );

//   return (
//     <div>
//       <div className='mt-4'>
//         <Button as={Link} to={`/upload-recipe`} variant="primary" size="sm">
//           <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Recipe
//         </Button>
//       </div>

//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
//           <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
//             {isEditing ? 'Edit Recipe' : 'Add Recipe'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ borderRadius: '90px' }}>
//           {message && <div className="alert alert-success">{message}</div>}
//           {error && <div className="alert alert-danger">{error}</div>}
//           <Form>
//             <Form.Group className="mb-3" controlId="recipeTitle">
//               <Form.Label>Recipe Title</Form.Label>
//               <Form.Control type="text" placeholder="Enter recipe title" name="title"
//                 value={isEditing ? editRecipe.title : recipeTitle} onChange={isEditing ? handleEditInputChange : (e) => setRecipeTitle(e.target.value)} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="recipeCookingTime">
//               <Form.Label>Recipe Cooking Time</Form.Label>
//               <Form.Control type="text" placeholder="Enter cooking time" name="cookingTime"
//                 value={isEditing ? editRecipe.cookingTime: recipeCookingTime} onChange={isEditing ? handleEditInputChange : (e) => setRecipeCookingTime(e.target.value)} />
//             </Form.Group>

//             <div className="mb-3 mt-3">
//               <Form.Label>Featured Recipe</Form.Label>
//               <div className='d-flex flex-row justify-content-around'>
//                 <Form.Check
//                   type="radio"
//                   label="Yes"
//                   name="featured"
//                   value="true"
//                   checked={editRecipe.featured === true}
//                   onChange={handleEditInputChange}
//                 />
//                 <Form.Check
//                   type="radio"
//                   label="No"
//                   name="featured"
//                   value="false"
//                   checked={editRecipe.featured === false}
//                   onChange={handleEditInputChange}
//                 />
//               </div>
//             </div>

//             <Form.Group className="mb-3" controlId="recipeDescription">
//               <Form.Label>Recipe Description</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter recipe description" name="description"
//                 value={isEditing ? editRecipe.description : recipeDescription} onChange={isEditing ? handleEditInputChange : (e) => setRecipeDescription(e.target.value)} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="recipeIngredients">
//               <Form.Label>Recipe Ingredients</Form.Label>
//               <Form.Control as="textarea" rows={3} placeholder="Enter recipe ingredients" name="ingredients"
//                 value={editRecipe.ingredients} onChange={handleEditInputChange} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="recipeNutritionalInfo">
//               <Form.Label>Recipe Nutritional Info</Form.Label>
//               <Form.Control type="text" placeholder="Enter nutritional info" name="nutritionalInfo"
//                 value={editRecipe.nutritionalInfo} onChange={handleEditInputChange} />
//             </Form.Group>

//             <Form.Group controlId="recipeThumbnail">
//               <Form.Label>Recipe Thumbnail</Form.Label>
//               <Form.Control type="file" accept="image/*" name="thumbnail"
//                 onChange={isEditing ? handleEditThumbnailChange : (e) => setRecipeThumbnail(e.target.files[0])} />
//             </Form.Group> 

//             <Form.Group className="mb-3" controlId="recipeVideo">
//               <Form.Label>Recipe Video</Form.Label>
//               <Form.Control type="file" name="video" onChange={handleEditVideoChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit}>
//             {isEditing ? 'Save Changes' : 'Add'}
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <DeleteConfirmationModal />

//       <div className="mt-4">
//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th style={{ width: '10%' , textAlign: 'center' }}>Sr. No.</th>
//               <th style={{ width: '10%' , textAlign: 'center' }}>Recipe Title</th>
//               <th style={{ width: '50%' , textAlign: 'center' }}>Recipe Description</th>
//               <th style={{ width: '20%' , textAlign: 'center' }}>Recipe Thumbnail</th>
//               <th style={{ width: '10%' , textAlign: 'center' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recipes.map((recipe, index) => (
//               <tr key={recipe.Recipe_id}>
//                 <td style={{ textAlign: 'center', padding: '10px' }}>{index + 1}</td>
//                 <td style={{ textAlign: 'center', padding: '10px' }}>{recipe.Recipe_Title}</td>
//                 <td style={{ textAlign: 'center', whiteSpace: 'normal', wordWrap: 'break-word', padding: '10px' }}>{recipe.Recipe_Description}</td>
//                 <td style={{ textAlign: 'center' }}>
//                   <img src={recipe.Recipe_Thumbnail} alt="Thumbnail" style={{ width: '80px', height: '80px' }} />
//                 </td>
//                 <td>
//                   <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(recipe)}>
//                     <FontAwesomeIcon icon={faEdit} />
//                   </Button>
//                   <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(recipe.Recipe_id)}>
//                     <FontAwesomeIcon icon={faTrash} />
//                   </Button>
//                   <Button as={Link} to={`/recipes/${recipe.Recipe_id}`} variant="secondary" size="sm">
//                     <FontAwesomeIcon icon={faInfoCircle} />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// }

// export default AddRecipe;















import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../../config/config";

function AddRecipe() {
  const { subcategoryId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeCookingTime, setRecipeCookingTime] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeThumbnail, setRecipeThumbnail] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState({
    id: '',
    title: '',
    description: '',
    thumbnail: null,
    cookingTime: '',
    featured: null,
    ingredients: '',
    video: '',
    nutritionalInfo: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [loading, setLoading] = useState(false); 


  const [selectedImage, setSelectedImage] = useState(null);
  const [ImageCategoryName, setImageCategoryName] = useState('');
  const [showImageViewer, setShowImageViewer] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes. Please try again.');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      setError(error.message || 'Network error. Please try again.');
      console.error('Error fetching recipes:', error);
    }
  }, [subcategoryId]);

  useEffect(() => {
    if (subcategoryId) {
      fetchRecipes();
    }
  }, [subcategoryId, fetchRecipes]);

  useEffect(() => {
    if (isEditing && editRecipe.featured === null && recipes.length > 0) {
      const currentRecipe = recipes.find(recipe => recipe.Recipe_id === editRecipe.id);
      if (currentRecipe) {
        setEditRecipe(prevState => ({
          ...prevState,
          featured: currentRecipe.Featured,
          cookingTime: currentRecipe.Recipe_Cooking_Time,
          nutritionalInfo: currentRecipe.Recipe_Nutritional_Info
        }));
      }
    }
  }, [isEditing, editRecipe.featured, editRecipe.id, recipes]);

  const handleClose = () => {
    setShowModal(false);
    resetMessages();
    resetForm();
  };

  const handleShow = () => setShowModal(true);

  const resetForm = () => {
    setRecipeTitle('');
    setRecipeCookingTime('');
    setRecipeDescription('');
    setRecipeThumbnail(null);
    setEditRecipe({
      id: '',
      title: '',
      description: '',
      thumbnail: null,
      cookingTime: '',
      featured: null,
      ingredients: '',
      video: '',
      nutritionalInfo: ''
    });
    setIsEditing(false);
  };

  const resetMessages = () => {
    setMessage('');
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when starting the submission
    const formData = new FormData();
    formData.append('Recipe_Title', recipeTitle);
    formData.append('Recipe_Description', recipeDescription);
    formData.append('Recipe_Thumbnail', recipeThumbnail);
    formData.append('Sub_Category_id', subcategoryId);
  
    try {
      const response = await fetch(`${BASE_URL}/uploadrecipe`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Recipe added successfully.');
        fetchRecipes();
        handleClose();
      } else {
        setError('Failed to add recipe. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error adding recipe:', error);
    } finally {
      setLoading(false); // Set loading to false when submission is completed
    }
  };

  const handleEdit = (recipe) => {
    localStorage.setItem('editedRecipe', JSON.stringify(recipe));
    setIsEditing(true);
    setEditRecipe({
      id: recipe.Recipe_id,
      title: recipe.Recipe_Title,
      description: recipe.Recipe_Description,
      thumbnail: recipe.Recipe_Thumbnail,
      cookingTime: recipe.Recipe_Cooking_Time ,
      featured: recipe.Featured,
      ingredients: recipe.Recipe_Ingredients ,
      video: recipe.Video,
      nutritionalInfo: recipe.Recipe_Nutritional_Info
    });
    handleShow();
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditRecipe(prevState => ({
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
  
    setEditRecipe((prevState) => ({
      ...prevState,
      thumbnail: file,
    }));
  };

  const handleEditVideoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setEditRecipe(prevState => ({
        ...prevState,
        video: e.target.files[0],
      }));
    }
  };

  const handleOpenImageViewer = (imageUrl, Recipe_Name) => {
    setSelectedImage(imageUrl);
    setImageCategoryName(Recipe_Name);
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

  const handleEditSubmit = async () => {
    setLoading(true); 
    const formData = new FormData();
    formData.append('Recipe_Title', editRecipe.title);
    formData.append('Recipe_Cooking_Time', editRecipe.cookingTime);
    formData.append('Featured', editRecipe.featured); 
    formData.append('Recipe_Description', editRecipe.description);
    formData.append('Recipe_Ingredients', editRecipe.ingredients);
    formData.append('Recipe_Thumbnail', editRecipe.thumbnail);
    formData.append('Video', editRecipe.video);
    formData.append('Recipe_Nutritional_Info', editRecipe.nutritionalInfo);

    try {
      const response = await fetch(`${BASE_URL}/recipes/${editRecipe.id}`, {
        method: 'PUT',
        headers: {
          // Remove the 'Content-Type' header to allow the browser to set it automatically
        },
        body: formData,
      });
      if (response.ok) {
        setMessage('Recipe updated successfully.');
        setRecipes(prevRecipes => prevRecipes.map(recipe =>
          recipe.Recipe_id === editRecipe.id ? { ...recipe, Recipe_Title: editRecipe.title, Recipe_Description: editRecipe.description, Recipe_Thumbnail: editRecipe.thumbnail } : recipe
        ));
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 2000);
      } else {
        setError('Failed to update recipe. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Error updating recipe:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleDelete = (recipeId) => {
    setRecipeToDelete(recipeId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/${recipeToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Recipe deleted successfully.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        fetchRecipes();
        setShowDeleteConfirmation(false);
      } else {
        setError('Failed to delete recipe. Please try again.');
        setShowDeleteConfirmation(false);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      setShowDeleteConfirmation(false);
      console.error('Error deleting recipe:', error);
    }
  };

  const DeleteConfirmationModal = () => (
    <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteConfirmed}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
      <div className='mt-4'>
        <Button as={Link} to={`/upload-recipe`} variant="primary" size="sm">
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Recipe
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#2CA58D', textAlign: 'center' }}>
          <Modal.Title style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'white' }}>
            {isEditing ? 'Edit Recipe' : 'Add Recipe'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ borderRadius: '90px' }}>
          <Form>
            <Form.Group className="mb-3" controlId="recipeTitle">
              <Form.Label>Recipe Title</Form.Label>
              <Form.Control type="text" placeholder="Enter recipe title" name="title"
                value={isEditing ? editRecipe.title : recipeTitle} onChange={isEditing ? handleEditInputChange : (e) => setRecipeTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeCookingTime">
              <Form.Label>Recipe Cooking Time</Form.Label>
              <Form.Control type="text" placeholder="Enter cooking time" name="cookingTime"
                value={isEditing ? editRecipe.cookingTime: recipeCookingTime} onChange={isEditing ? handleEditInputChange : (e) => setRecipeCookingTime(e.target.value)} />
            </Form.Group>

            <div className="mb-3 mt-3">
              <Form.Label>Featured Recipe</Form.Label>
              <div className='d-flex flex-row justify-content-around'>
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="featured"
                  value="true"
                  checked={editRecipe.featured === true}
                  onChange={handleEditInputChange}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="featured"
                  value="false"
                  checked={editRecipe.featured === false}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>

            <Form.Group className="mb-3" controlId="recipeDescription">
              <Form.Label>Recipe Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter recipe description" name="description"
                value={isEditing ? editRecipe.description : recipeDescription} onChange={isEditing ? handleEditInputChange : (e) => setRecipeDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeIngredients">
              <Form.Label>Recipe Ingredients</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter recipe ingredients" name="ingredients"
                value={editRecipe.ingredients} onChange={handleEditInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeNutritionalInfo">
              <Form.Label>Recipe Nutritional Info</Form.Label>
              <Form.Control type="text" placeholder="Enter nutritional info" name="nutritionalInfo"
                value={editRecipe.nutritionalInfo} onChange={handleEditInputChange} />
            </Form.Group>

            <Form.Group controlId="recipeThumbnail">
              <Form.Label>Recipe Thumbnail</Form.Label>
              <Form.Control type="file" accept="image/*" name="thumbnail"
                onChange={isEditing ? handleEditThumbnailChange : (e) => setRecipeThumbnail(e.target.files[0])} />
            </Form.Group> 

            <Form.Group className="mb-3" controlId="recipeVideo">
              <Form.Label>Recipe Video</Form.Label>
              <Form.Control type="file" name="video" onChange={handleEditVideoChange} />
            </Form.Group>
          </Form>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>
            Close
          </Button>
          <Button variant="primary" onClick={isEditing ? handleEditSubmit : handleSubmit}>
            {loading ? ( 
              <Spinner animation="border" size="sm" />
            ) : (
              isEditing ? 'Save Changes' : 'Add'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteConfirmationModal />

      <ImageViewerModal/>
      <div className="mt-4">
        <Table bordered hover>
          <thead>
            <tr>
              <th style={{ width: '10%' , textAlign: 'center' }}>Sr. No.</th>
              <th style={{ width: '10%' , textAlign: 'center' }}>Recipe Title</th>
              <th style={{ width: '50%' , textAlign: 'center' }}>Recipe Description</th>
              <th style={{ width: '20%' , textAlign: 'center' }}>Recipe Thumbnail</th>
              <th style={{ width: '10%' , textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={recipe.Recipe_id}>
                <td style={{ textAlign: 'center', padding: '10px' }}>{index + 1}</td>
                <td style={{ textAlign: 'center', padding: '10px' }}>{recipe.Recipe_Title}</td>
                <td style={{ textAlign: 'center', whiteSpace: 'normal', wordWrap: 'break-word', padding: '10px' }}>{recipe.Recipe_Description}</td>
                <td style={{ textAlign: 'center', padding: '10px' }}> 
                  <img src={recipe.Recipe_Thumbnail} alt={recipe.Recipe_Title} style={{ width: '80px', height: '80px', cursor: 'pointer'}} onClick={() => handleOpenImageViewer(recipe.Recipe_Thumbnail, recipe.Recipe_Title)} />
                </td>
                <td style={{ textAlign: 'center', padding: '10px' }}>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(recipe)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(recipe.Recipe_id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button as={Link} to={`/recipes/subcategory/${recipe.Sub_Category_id}/${recipe.Recipe_id}`} variant="secondary" size="sm">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Button>
                  {/* <Link variant="secondary" size="sm" to={`/recipes/${recipe.Recipe_id}`}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AddRecipe;
