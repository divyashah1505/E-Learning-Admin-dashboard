// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Table } from 'react-bootstrap';
// import { BASE_URL } from "../../config/config";
// import '../../scss/ViewRecipes.scss'  // Make sure to create this CSS file

// function ViewRecipes() {
//   const [recipes, setRecipes] = useState([]);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [recipeToDelete, setRecipeToDelete] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/vrecipes`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch recipes. Please try again.');
//       }
//       const data = await response.json();
//       const sortedRecipes = data.recipes.sort((a, b) => b.Recipe_id - a.Recipe_id);
//       setRecipes(sortedRecipes); // Assuming the response contains a property named 'recipes'
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       console.error('Error fetching recipes:', error);
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
//     <div className='mt-5 view-recipes-container'>
//       <h2>View Recipes</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className="table-responsive">
//         <Table bordered hover className="mt-4 fixed-column-table">
//           <thead>
//             <tr>
//               <th className='fixed-column bg-white text-black text-center'>Recipe Title</th>
//               <th className='text-center'>Recipe ID</th>
//               <th className='text-center'>SubCategory ID</th>
//               <th className='text-center'>Cooking Time</th>
//               <th className='text-center'>Description</th>
//               <th className='text-center'>Ingredients</th>
//               <th className='text-center'>Thumbnail</th>
//               <th className='text-center'>Featured Recipe?</th>
//               <th className='text-center'>Nutritional Info</th>

//             </tr>
//           </thead>
//           <tbody>
//             {recipes.map(recipe => (
//               <tr key={recipe.Recipe_id}>
//                 <td className='fixed-column text-center'> {recipe.Recipe_Title} </td>
//                 <td className='text-center'> {recipe.Recipe_id} </td>
//                 <td className='text-center'> {recipe.Sub_Category_id} </td>
//                 <td className='text-center'> {recipe.Recipe_Cooking_Time} </td>
//                 <td className='text-center text-long'> {recipe.Recipe_Description} </td>
//                 <td className='text-center text-long'> {recipe.Recipe_Ingredients} </td>
//                 <td className='text-center'> <img src={recipe.Recipe_Thumbnail} alt="Thumbnail" style={{width: '80px', height: '80px'}}/> </td>
//                 <td className='text-center'> {recipe.Featured_Recipe ? 'Yes' : 'No'} </td>
//                 <td className='text-center text-long'> {recipe.Recipe_Nutritional_Info} </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       <DeleteConfirmationModal />
//     </div>
//   );
// }

// export default ViewRecipes;









// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Table } from 'react-bootstrap';
// import { BASE_URL } from "../../config/config";
// import '../../scss/ViewRecipes.scss'; // Make sure to create this CSS file

// function ViewRecipes() {
//   const [recipes, setRecipes] = useState([]);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [recipeToDelete, setRecipeToDelete] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/vrecipes`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch recipes. Please try again.');
//       }
//       const data = await response.json();

//       const subcategoryData = await fetch(`${BASE_URL}/vsubcategories`);
//       if (!subcategoryData.ok) {
//         throw new Error('Failed to fetch subcategories. Please try again.');
//       }
//       const subcategoryJson = await subcategoryData.json();
//       const subcategoryMap = {};
//       subcategoryJson.forEach(sub => {
//         subcategoryMap[sub.Sub_Category_id] = sub.Sub_Category_Name;
//       });

//       const sortedRecipes = data.recipes.map(recipe => ({
//         ...recipe,
//         Sub_Category_Name: subcategoryMap[recipe.Sub_Category_id] || "Unknown Subcategory" // Get subcategory name
//       })).sort((a, b) => b.Recipe_id - a.Recipe_id);
//       setRecipes(sortedRecipes); // Assuming the response contains a property named 'recipes'
//     } catch (error) {
//       setError(error.message || 'Network error. Please try again.');
//       console.error('Error fetching recipes:', error);
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
//     <div className='mt-5 view-recipes-container'>
//       <h2>View Recipes</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <div className="table-responsive">
//         <Table bordered hover className="mt-4 fixed-column-table">
//           <thead>
//             <tr>
//               <th className='fixed-column bg-white text-black text-center'>Recipe Title</th>
//               <th className='text-center'>Recipe ID</th>
//               <th className='text-center'>Subcategory Name</th> 
//               <th className='text-center'>Cooking Time</th>
//               <th className='text-center'>Description</th>
//               <th className='text-center'>Ingredients</th>
//               <th className='text-center'>Thumbnail</th>
//               <th className='text-center'>Featured Recipe?</th>
//               <th className='text-center'>Nutritional Info</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recipes.map(recipe => (
//               <tr key={recipe.Recipe_id}>
//                 <td className='fixed-column text-center'> {recipe.Recipe_Title} </td>
//                 <td className='text-center'> {recipe.Recipe_id} </td>
//                 <td className='text-center'> {recipe.Sub_Category_Name} </td> 
//                 <td className='text-center'> {recipe.Recipe_Cooking_Time} </td>
//                 <td className='text-center text-long'> {recipe.Recipe_Description} </td>
//                 <td className='text-center text-long'> {recipe.Recipe_Ingredients} </td>
//                 <td className='text-center'> <img src={recipe.Recipe_Thumbnail} alt="Thumbnail" style={{width: '80px', height: '80px'}}/> </td>
//                 <td className='text-center'> {recipe.Featured_Recipe ? 'Yes' : 'No'} </td>
//                 <td className='text-center text-long'> {recipe.Recipe_Nutritional_Info} </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//       <DeleteConfirmationModal />
//     </div>
//   );
// }

// export default ViewRecipes;







import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { BASE_URL } from "../../config/config";
import '../../scss/ViewRecipes.scss'; 

function ViewRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState(null); // State to store video URL
  const [selectedRecipeTitle, setSelectedRecipeTitle] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      // Fetch Recipes
      const response = await fetch(`${BASE_URL}/vrecipes`, {
        headers: {
          "ngrok-skip-browser-warning": "true" // Bypass Ngrok warning page
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch recipes. Please try again.");
      }
      const data = await response.json();
  
      // Fetch Subcategories
      const subcategoryData = await fetch(`${BASE_URL}/vsubcategories`, {
        headers: {
          "ngrok-skip-browser-warning": "true" // Bypass Ngrok warning page
        }
      });
  
      if (!subcategoryData.ok) {
        throw new Error("Failed to fetch subcategories. Please try again.");
      }
      const subcategoryJson = await subcategoryData.json();
  
      // Create a mapping of Sub_Category_id to Sub_Category_Name
      const subcategoryMap = {};
      subcategoryJson.forEach(sub => {
        subcategoryMap[sub.Sub_Category_id] = sub.Sub_Category_Name;
      });
  
      // Map recipes with corresponding subcategory name and sort by Recipe_id
      const sortedRecipes = data.recipes.map(recipe => ({
        ...recipe,
        Sub_Category_Name: subcategoryMap[recipe.Sub_Category_id] || "Unknown Subcategory"
      })).sort((a, b) => b.Recipe_id - a.Recipe_id);
  
      setRecipes(sortedRecipes);
    } catch (error) {
      setError(error.message || "Network error. Please try again.");
      console.error("Error fetching recipes:", error);
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

  const playVideo = (url, title) => {
    setVideoUrl(url);
    setSelectedRecipeTitle(title); // Set the selected recipe title for the MiniPlayer
  };

  const MiniPlayer = ({ recipeTitle }) => (
    <Modal show={!!videoUrl} onHide={() => setVideoUrl(null)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipeTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <video controls autoPlay style={{ width: '100%' }}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal.Body>
    </Modal>
  );

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
    <div className='mt-5 view-recipes-container'>
      <h2>View Recipes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="table-responsive">
        <Table bordered hover className="mt-4 fixed-column-table">
          <thead>
            <tr>
              <th className='fixed-column bg-white text-black text-center'>Recipe Title</th>
              <th className='text-center'>Recipe ID</th>
              <th className='text-center'>Subcategory Name</th> 
              <th className='text-center'>Cooking Time</th>
              <th className='text-center'>Description</th>
              <th className='text-center'>Ingredients</th>
              <th className='text-center'>Thumbnail</th>
              <th className='text-center'>Featured Recipe?</th>
              <th className='text-center'>Nutritional Info</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => (
              <tr key={recipe.Recipe_id}>
                <td className='fixed-column text-center'> {recipe.Recipe_Title} </td>
                <td className='text-center'> {recipe.Recipe_id} </td>
                <td className='text-center'> {recipe.Sub_Category_Name} </td> 
                <td className='text-center'> {recipe.Recipe_Cooking_Time} </td>
                <td className='text-center text-long'> {recipe.Recipe_Description} </td>
                <td className='text-center text-long'> {recipe.Recipe_Ingredients} </td>
                <td className='text-center'> 
                  <img 
                    src={recipe.Recipe_Thumbnail} 
                    alt="Thumbnail" 
                    style={{width: '80px', height: '80px', cursor: 'pointer'}} 
                    onClick={() => playVideo(recipe.Recipe_Url, recipe.Recipe_Title)} // Pass title to playVideo
                  /> 
                </td>
                <td className='text-center'> {recipe.Featured_Recipe ? 'Yes' : 'No'} </td>
                <td className='text-center text-long'> {recipe.Recipe_Nutritional_Info} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <DeleteConfirmationModal />
      <MiniPlayer recipeTitle={selectedRecipeTitle} />
    </div>
  );
}

export default ViewRecipes;

