import { Box, Heading, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function UserAnalytics() {
  const [users, setUsers] = useState([]);
  const [topActiveUsers, setTopActiveUsers] = useState([]);

  useEffect(() => {
    // To Fetch users and set state
    fetch('https://wild-teal-ox-slip.cyclic.app/users')
      .then(res => res.json())
      .then(data => setUsers(data));

    // To Fetch top 5 most active users and set state
    fetch('https://wild-teal-ox-slip.cyclic.app/analytics/users/top-active')
      .then(res => res.json())
      .then(data => setTopActiveUsers(data));
  }, []);

  return (
    <Box>
      <Text fontSize='3xl'>User Analytics</Text>

      <Text fontSize='xl'>Total number of users: {users.length}</Text>

      <Text fontSize='xl'>Top 5 most active users:</Text>

      <div style={{display:'grid',gridTemplateColumns:'repeat(1,1fr)',width:'80%',margin:"auto",gap:"20px",marginTop:"20px",}}>
      
            
            {topActiveUsers?.map((user)=>(
                <Box  key={user.user_id} margin={2} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px",border:"0.5px solid #cecece",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <Text fontSize='lg'>{user.name} ({user.post_count} posts)</Text> 
                   
                </Box>
            ))}

        </div>
    
    </Box>
  );
}

export default UserAnalytics;
