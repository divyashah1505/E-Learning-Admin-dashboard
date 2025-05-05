import { BASE_URL } from "../../config/config";
import React, { useEffect, useState } from "react";
import { faCashRegister, faChartLine, faUtensils, faUsers, faBowlFood, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { 
  CounterWidget, 
  TeamMembersWidget, 
  ProgressTrackWidget, 
  SalesValueWidgetPhone 
} from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";

const Dashboard = () => {
  const [recipeCount, setRecipeCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchRecipeCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/vrecipes`, {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        const data = await response.json();
        setRecipeCount(Array.isArray(data.recipes) ? data.recipes.length : 0);
      } catch (error) {
        console.error("Error fetching recipe count:", error);
      }
    };

    const fetchCustomerCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/vcustomers`, {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        const data = await response.json();
        setCustomerCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error("Error fetching customer count:", error);
      }
    };

    const fetchCategoryCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/vcategories`, {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        });
        const data = await response.json();
        setCategoryCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error("Error fetching category count:", error);
      }
    };

    fetchRecipeCount();
    fetchCustomerCount();
    fetchCategoryCount();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        {/* Toolbar or action buttons can go here if needed */}
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone title="Site Traffic" value="10,567" percentage={10.57} />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget 
            category="Total Customers" 
            title={customerCount.toString()}  
            percentage={0} 
            icon={faUsers} 
            iconColor="shape-primary" 
          />
        </Col>
       
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget 
            category="Total Categories" 
            title={categoryCount.toString()}  
            percentage={0} 
            icon={faUtensils} 
            iconColor="shape-primary" 
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget 
            category="Total Recipes" 
            title={recipeCount.toString()}  
            percentage={0} 
            icon={faBowlFood} 
            iconColor="shape-primary" 
          />
        </Col>
      </Row>
     

    

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>
                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>
                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
