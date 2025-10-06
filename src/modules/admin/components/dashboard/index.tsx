import React from 'react';
import { styled } from 'styled-components';

const Dashboard = () => {
  return (
    <Container>
      <WelcomeBox>
        <Title>Welcome to Admin Panel</Title>
        <Subtitle>Manage your application data efficiently</Subtitle>
        <StatsGrid>
          <StatCard>
            <StatTitle>Users</StatTitle>
            <StatValue>-</StatValue>
          </StatCard>
        </StatsGrid>
      </WelcomeBox>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeBox = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 32px 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;
