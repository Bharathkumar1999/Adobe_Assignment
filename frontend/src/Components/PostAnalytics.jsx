import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const PostAnalytics = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  useEffect(() => {
    // To Fetch total number of posts
    axios.get('https://wild-teal-ox-slip.cyclic.app/analytics/posts')
      .then(res => {
        console.log(res)
        setTotalPosts(res.data.count);
      })
      .catch(err => console.log(err));

    // To Fetch top 5 most liked posts
    axios.get('https://wild-teal-ox-slip.cyclic.app/analytics/posts/top-liked')
      .then(res => {
        setTopLikedPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Box>
      <Text fontSize='3xl'>Post Analytics</Text>

      <Text fontSize='xl'>Total Number of Posts: {totalPosts}</Text>

      <Text fontSize='xl'>Top 5 Most Liked Posts:</Text>

      <div style={{display:'grid',gridTemplateColumns:'repeat(1,1fr)',width:'80%',margin:"auto",gap:"20px",marginTop:"20px",}}>
      
            
            {topLikedPosts?.map((post)=>(
                <Box  key={post.id} margin={2} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px",border:"0.5px solid #cecece",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <Text fontSize='lg'>{post.content}</Text>
                    <Text fontSize='lg'>Likes: {post.likes}</Text>

                </Box>
            ))}

        </div>
    
      
    </Box>
  );
};

export default PostAnalytics;
