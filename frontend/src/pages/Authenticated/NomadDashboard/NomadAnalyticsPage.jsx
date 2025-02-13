import NomadDashboardAnalyticsLayout
    from "../../Layouts/NomadDashboardAnalyticsLayout/NomadDashboardAnalyticsLayout.jsx";
import WorldMap from "../../../components/WorldMap/WorldMap.jsx";
import styled from 'styled-components';
import ToDoWidget from "../../../components/ToDoWidget/ToDoWidget.jsx";
import Draggable from "react-draggable";

const AnalyticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  padding: 20px;
`;

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
    padding-top: 10px;
`;

const LegendBox = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.color || "#000"};
  border-radius: 3px;
`;

const LegendText = styled.span`
  font-size: 14px;
  color: #333;
`;

const NomadAnalyticsPage = () => {
    return (
        <NomadDashboardAnalyticsLayout>
            <LegendContainer>
                <LegendItem>
                    <LegendBox color="#2bdf6a" />
                    <LegendText>Visited Destinations</LegendText>
                </LegendItem>
                <LegendItem>
                    <LegendBox color="#115191" />
                    <LegendText>Dream Destinations</LegendText>
                </LegendItem>
            </LegendContainer>
            <AnalyticsContainer>
                <Draggable>
                    <div>
                        <ToDoWidget/>

                    </div>
                </Draggable>

                <WorldMap/>
            </AnalyticsContainer>
        </NomadDashboardAnalyticsLayout>
    );
};

export default NomadAnalyticsPage;
