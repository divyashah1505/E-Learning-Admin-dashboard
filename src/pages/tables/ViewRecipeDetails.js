import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from '../../config/config';

export default function Recipes() {
    const { subcategoryId, recipeId } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [similarRecipes, setSimilarRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}/${recipeId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }
                const data = await response.json();
                setRecipeDetails(data);
            } catch (error) {
                console.error("Error fetching recipe details:", error);
            }
        };
    
        const fetchSimilarRecipes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/recipes/subcategory/${subcategoryId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch similar recipes');
                }
                const data = await response.json();
                const filteredRecipes = data.filter(recipe => recipe.Recipe_id !== recipeId);
                const shuffledData = filteredRecipes.sort(() => Math.random() - 0.5);
                const randomRecipes = shuffledData.slice(0, 3);
                setSimilarRecipes(randomRecipes);
            } catch (error) {
                console.error("Error fetching similar recipes:", error);
            }
        };
    
        if (subcategoryId && recipeId) {
            fetchRecipeDetails();
            fetchSimilarRecipes();
        }
    }, [subcategoryId, recipeId]);
    

    return (
        <>
            <div className="mt-150 mb-120" style={{marginTop : '1rem'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="DC-blog-details-inner">
                                {recipeDetails && (
                                    <div className="DC-single-blog-inner">
                                        <div className="DC-post-content">    
                                            <h2 className="mt-3 mb-5" style={{textTransform: 'capitalize'}}>Recipe : {recipeDetails.Recipe_Title}</h2>
                                        </div>
                                        <div className="DC-post-image" style={{width:'600px', height:'450px'}}>
                                           <img src={recipeDetails.Recipe_Thumbnail} alt={recipeDetails.Recipe_Title} style={{width:'600px', height:'400px', objectFit: 'cover'}} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-4 mt-5">
                            <aside>
                                {/* <div className="single-sidebar-widget mb-30" style={{border: '2px solid' }}>
                                    <div className="sidebar-title">
                                        <h5 className='underline'>Similar in this SubCategory</h5>
                                    </div>
                                    <div className="sidebar-body latest-post">
                                        <ul>
                                            {similarRecipes.map((recipe, index) => (
                                                <li key={index} style={{listStyle: 'none'}}>
                                                    <div className="DC-latest-post-wrap media">
                                                        <div className="latest-post-body media-body d-flex align-items-center gap-3 m-3">
                                                            <img style={{width: '80px', height: '80px'}} className='similar_in_Image' src={recipe.Recipe_Thumbnail} alt=""/>
                                                            <p>{recipe.Recipe_Title}</p>
                                                            <hr/>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div> */}

                                        {recipeDetails && (
                                            <div className="single-sidebar-widget mb-5" style={{border: '2px solid #388377'}}>
                                                <div className="sidebar-title">
                                                    <h5 className='p-3'style={{fontWeight:'700'}}> Recipe Description: </h5>
                                                </div>
                                                
                                                <div className="sidebar-body latest-post p-3">
                                                    <span>{recipeDetails.Recipe_Description}</span>
                                                </div>
                                            </div>   
                                        )}

                                {recipeDetails && (
                                    <div className="single-sidebar-widget mb-5" style={{border: '2px solid #388377'}}>
                                        <div className="sidebar-title">
                                            <h5 className='p-3' style={{fontWeight:'700'}}> Ingredients: </h5>
                                        </div>
                                        <div className="sidebar-body latest-post p-3">
                                            <span>{recipeDetails.Recipe_Ingredients}</span>
                                        </div>
                                    </div>
                                )}

                                {recipeDetails && (
                                    <div className="single-sidebar-widget mb-5" style={{border: '2px solid #388377'}}>
                                        <div className="sidebar-title">
                                            <h5 className='p-3'style={{fontWeight:'700'}}> Nutritional Info: </h5>
                                        </div>
                                        
                                        <div className="sidebar-body latest-post p-3">
                                            <span>{recipeDetails.Recipe_Nutritional_Info}</span>
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
