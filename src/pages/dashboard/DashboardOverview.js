import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faTasks, faUserShield, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { 
  CounterWidget, 
  CircleChartWidget, 
  BarChartWidget, 
  TeamMembersWidget, 
  ProgressTrackWidget, 
  RankingWidget, 
  SalesValueWidget, 
  SalesValueWidgetPhone, 
  AcquisitionWidget 
} from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

const Dashboard = () => {
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    const fetchRecipeCount = async () => {
      try {
        const response = await fetch("/api/vrecipes"); // Fetch from existing endpoint
        const data = await response.json();
        setRecipeCount(data.recipes.length || 0); // Ensure fallback if count is missing
      } catch (error) {
        console.error("Error fetching recipe count:", error);
      }
    };

    fetchRecipeCount();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        {/* <Dropdown className="btn-toolbar"> */}
        
        

        
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget title="Sales Value" value="10,567" percentage={10.57} />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone title="Site Traffic" value="10,567" percentage={10.57} />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget category="Customers"  icon={faChartLine} iconColor="shape-secondary" />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget category="Category" percentage={28.4} icon={faCashRegister} iconColor="shape-tertiary" />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget category="Total Recipes" title={recipeCount.toString()}  percentage={0} icon={faUtensils} iconColor="shape-primary" />
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
            {/* <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget title="Total orders" value={452} percentage={18.2} data={totalOrders} />
                </Col>
                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>
                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
