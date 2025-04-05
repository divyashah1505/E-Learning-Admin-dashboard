// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Form, Button } from '@themesberg/react-bootstrap';
// import axios from 'axios';
// import { BASE_URL } from "../config/config";

// export const UploadRecipe = () => {
//   const [formData, setFormData] = useState({
//     Recipe_Title: '',
//     Recipe_Description: '',
//     Recipe_Ingredients: '',
//     Recipe_Cooking_Time: '',
//     Recipe_Nutritional_Info: '',
//     Featured_Recipe: false,
//     Category_id: '',
//     Sub_Category_id: '',
//   });

//   const [files, setFiles] = useState({ thumbnail: null, video: null });
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await axios.get(`${BASE_URL}/vcategories`);
//         const categoryData = response.data.map(category => ({
//           id: category.Category_id,
//           name: category.Category_Name
//         }));
//         setCategories(categoryData);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     }
//     fetchCategories();
//   }, []);

//   const fetchSubCategories = async (categoryId) => {
//     if (categoryId) {
//       try {
//         const response = await axios.get(`${BASE_URL}/subcategories/${categoryId}`);
//         const subCategoryData = response.data.map(subCategory => ({
//           id: subCategory.Sub_Category_id, 
//           name: subCategory.Sub_Category_Name
//         }));
//         setSubCategories(subCategoryData);
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     } else {
//       setSubCategories([]);
//     }
//   };

//   useEffect(() => {
//     fetchSubCategories(formData.Category_id);
//   }, [formData.Category_id]);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const updatedValue = type === 'checkbox' ? checked : value;

//     if (name === "Category_id") {
//       setFormData(prevState => ({ ...prevState, [name]: updatedValue, Sub_Category_id: '' }));
//       fetchSubCategories(updatedValue);
//     } else {
//       setFormData(prevState => ({ ...prevState, [name]: updatedValue }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       setFiles(prevState => ({
//         ...prevState,
//         [name]: files[0]
//       }));
//     } else {
//       console.error('No file selected or file input not found.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submitFormData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "Sub_Category_id" || key === "Category_id") {
//         submitFormData.append(key, parseInt(value) || value); // Convert to integer if possible, otherwise keep original value
//       } else if (key === "Featured_Recipe") {
//         submitFormData.append(key, value ? 'true' : 'false');
//       } else {
//         submitFormData.append(key, value);
//       }
//     });

//     if (files.thumbnail) {
//       submitFormData.append('thumbnail', files.thumbnail);
//     }
//     if (files.video) {
//       submitFormData.append('video', files.video);
//     }

//     try {
//       const response = await axios.post(`${BASE_URL}/uploadrecipe`, submitFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log("Upload response:", response.data);
//     } catch (error) {
//       console.error("Error uploading recipe:", error);
//     }
//   };

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col xl={12} className="mb-5">
//           <Card border="light" className="bg-white shadow-sm mb-4">
//             <Card.Body>
//               <h5 className="mb-4">Upload Recipe</h5>
//               <Form onSubmit={handleSubmit}>
//               <Row>
//                   <Col md={6} className="mb-3">
//                     <Form.Group id="RecipeName">
//                       <Form.Label>Recipe Name</Form.Label>
//                       <Form.Control required type="text" placeholder="Enter Recipe Name" name="Recipe_Title" onChange={handleInputChange} value={formData.Recipe_Title} />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6} className="mb-3">
//                     <Form.Group id="RecipeCookingTime">
//                       <Form.Label>Recipe Cooking Time (minutes)</Form.Label>
//                       <Form.Control required type="number" placeholder="Enter Cooking Time" name="Recipe_Cooking_Time" onChange={handleInputChange} value={formData.Recipe_Cooking_Time} />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col sm={4} className="mb-3">
//                     <Form.Group className="mb-2">
//                       <Form.Label>Select Category</Form.Label>
//                       <Form.Select id="Category_id" name="Category_id" onChange={handleInputChange} value={formData.Category_id}>
//                         <option value="">Select a Category</option>
//                         {categories.map((category) => (
//                           <option key={category.id} value={category.id}>{category.name}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   <Col sm={4} className="mb-3">
//                     <Form.Group className="mb-2">
//                       <Form.Label>Select Sub-Category</Form.Label>
//                       <Form.Select id="Sub_Category_id" name="Sub_Category_id" onChange={handleInputChange} value={formData.Sub_Category_id}>
//                         <option value="">Select a Sub-Category</option>
//                         {subCategories.map((subCategory) => (
//                           <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   <Col sm={4} className="mb-3">
//                     <Form.Group className="mb-2">
//                       <Form.Label>Featured Recipe</Form.Label>
//                       <Form.Check 
//                         type="switch" 
//                         id="Featured-Recipe" 
//                         name="Featured_Recipe" 
//                         label={formData.Featured_Recipe ? "Yes" : "No"} 
//                         onChange={handleInputChange} 
//                         checked={formData.Featured_Recipe} 
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col sm={12} className="mb-4">
//                     <Form.Group id="RecipeDescription">
//                       <Form.Label>Recipe Description</Form.Label>
//                       <Form.Control required as="textarea" rows={4} placeholder="Enter Recipe Description" name="Recipe_Description" onChange={handleInputChange} value={formData.Recipe_Description} />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col sm={12} className="mb-4">
//                     <Form.Group id="RecipeIngredients">
//                       <Form.Label>Recipe Ingredients</Form.Label>
//                       <Form.Control required as="textarea" rows={3} placeholder="Enter Recipe Ingredients" name="Recipe_Ingredients" onChange={handleInputChange} value={formData.Recipe_Ingredients} />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col sm={12} className="mb-4">
//                     <Form.Group id="RecipeNutritionalInfo">
//                       <Form.Label>Recipe Nutritional Info</Form.Label>
//                       <Form.Control required type="text" placeholder="Enter Nutritional Info" name="Recipe_Nutritional_Info" onChange={handleInputChange} value={formData.Recipe_Nutritional_Info} />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col sm={6} className="mb-4">
//                     <Form.Group id="videoThumbnail">
//                       <Form.Label>Video Thumbnail</Form.Label>
//                       <Form.Control type="file" name="thumbnail" onChange={handleFileChange} />
//                     </Form.Group>
//                   </Col>
//                   <Col sm={6} className="mb-4">
//                     <Form.Group id="video">
//                       <Form.Label>Video</Form.Label>
//                       <Form.Control type="file" name="video" onChange={handleFileChange} />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <div className="mt-3">
//                   <Button variant="primary" type="submit">Upload</Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UploadRecipe;








import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { BASE_URL } from "../config/config";

export const UploadRecipe = () => {
  const [formData, setFormData] = useState({
    Recipe_Title: '',
    Recipe_Description: '',
    Recipe_Ingredients: '',
    Recipe_Cooking_Time: '',
    Recipe_Nutritional_Info: '',
    Featured_Recipe: false,
    Category_id: '',
    Sub_Category_id: '',
  });

  const [files, setFiles] = useState({ thumbnail: null, video: null });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${BASE_URL}/vcategories`, {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const categoryData = response.data.map(category => ({
          id: category.Category_id,
          name: category.Category_Name
        }));
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);
  

  const fetchSubCategories = async (categoryId) => {
    if (categoryId) {
      try {
        const response = await axios.get(`${BASE_URL}/subcategories/${categoryId}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        const subCategoryData = response.data.map(subCategory => ({
          id: subCategory.Sub_Category_id,
          name: subCategory.Sub_Category_Name
        }));
        setSubCategories(subCategoryData);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    } else {
      setSubCategories([]);
    }
  };

  useEffect(() => {
    fetchSubCategories(formData.Category_id);
  }, [formData.Category_id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    if (name === "Category_id") {
      setFormData(prevState => ({ ...prevState, [name]: updatedValue, Sub_Category_id: '' }));
      fetchSubCategories(updatedValue);
    } else {
      setFormData(prevState => ({ ...prevState, [name]: updatedValue }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFiles(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      console.error('No file selected or file input not found.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader
  
    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "Sub_Category_id" || key === "Category_id") {
        submitFormData.append(key, parseInt(value) || value); // Convert to integer if possible, otherwise keep original value
      } else if (key === "Featured_Recipe") {
        submitFormData.append(key, value ? 'true' : 'false');
      } else {
        submitFormData.append(key, value);
      }
    });
  
    if (files.thumbnail) {
      submitFormData.append('thumbnail', files.thumbnail);
    }
    if (files.video) {
      submitFormData.append('video', files.video);
    }
  
    try {
      await axios.post(`${BASE_URL}/uploadrecipe`, submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage("Recipe Uploaded Successfully.");
      setTimeout(() => {
        window.location.reload(); // Refresh the page after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error uploading recipe:", error);
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setFormData({
          Recipe_Title: '',
          Recipe_Description: '',
          Recipe_Ingredients: '',
          Recipe_Cooking_Time: '',
          Recipe_Nutritional_Info: '',
          Featured_Recipe: false,
          Category_id: '',
          Sub_Category_id: '',
        });
        setSuccessMessage('');
      }, 2000); // Clear form and message after 3 seconds
    }
  }, [successMessage]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xl={12} className="mb-5">
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">Upload Recipe</h5>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="RecipeName">
                      <Form.Label>Recipe Name</Form.Label>
                      <Form.Control required type="text" placeholder="Enter Recipe Name" name="Recipe_Title" onChange={handleInputChange} value={formData.Recipe_Title} />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="RecipeCookingTime">
                      <Form.Label>Recipe Cooking Time (minutes)</Form.Label>
                      <Form.Control required type="number" placeholder="Enter Cooking Time" name="Recipe_Cooking_Time" onChange={handleInputChange} value={formData.Recipe_Cooking_Time} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={4} className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>Select Category</Form.Label>
                      <Form.Select id="Category_id" name="Category_id" onChange={handleInputChange} value={formData.Category_id}>
                        <option value="">Select a Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={4} className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>Select Sub-Category</Form.Label>
                      <Form.Select id="Sub_Category_id" name="Sub_Category_id" onChange={handleInputChange} value={formData.Sub_Category_id}>
                        <option value="">Select a Sub-Category</option>
                        {subCategories.map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col sm={4} className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>Featured Recipe</Form.Label>
                      <Form.Check
                        type="switch"
                        id="Featured-Recipe"
                        name="Featured_Recipe"
                        label={formData.Featured_Recipe ? "Yes" : "No"}
                        onChange={handleInputChange}
                        checked={formData.Featured_Recipe}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={12} className="mb-4">
                    <Form.Group id="RecipeDescription">
                      <Form.Label>Recipe Description</Form.Label>
                      <Form.Control required as="textarea" rows={4} placeholder="Enter Recipe Description" name="Recipe_Description" onChange={handleInputChange} value={formData.Recipe_Description} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={12} className="mb-4">
                    <Form.Group id="RecipeIngredients">
                      <Form.Label>Recipe Ingredients</Form.Label>
                      <Form.Control required as="textarea" rows={3} placeholder="Enter Recipe Ingredients" name="Recipe_Ingredients" onChange={handleInputChange} value={formData.Recipe_Ingredients} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={12} className="mb-4">
                    <Form.Group id="RecipeNutritionalInfo">
                      <Form.Label>Recipe Nutritional Info</Form.Label>
                      <Form.Control required type="text" placeholder="Enter Nutritional Info" name="Recipe_Nutritional_Info" onChange={handleInputChange} value={formData.Recipe_Nutritional_Info} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6} className="mb-4">
                    <Form.Group id="videoThumbnail">
                      <Form.Label>Video Thumbnail</Form.Label>
                      <Form.Control type="file" name="thumbnail" onChange={handleFileChange} />
                    </Form.Group>
                  </Col>
                  <Col sm={6} className="mb-4">
                    <Form.Group id="video">
                      <Form.Label>Video</Form.Label>
                      <Form.Control type="file" name="video" onChange={handleFileChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-3">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" />
                        <span className="ms-2">Uploading...</span>
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
                {successMessage && (
                  <div className="mt-3 text-success">{successMessage}</div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadRecipe;
