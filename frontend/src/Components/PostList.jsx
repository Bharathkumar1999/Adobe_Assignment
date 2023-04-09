import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Divider, FormControl, FormLabel, HStack, Heading, Image, Input, Text, useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get('https://wild-teal-ox-slip.cyclic.app/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleEditClick = (id) => {
     axios.put(`https://wild-teal-ox-slip.cyclic.app/${id}`, { content })
    .then(response => {
      const updatedPost = response.data;
      console.log(updatedPost)
      setPosts(posts.map(post => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      }));
    })
      .catch(error => {
        setError(error.message);
      });
      window.location.reload();
  };

  const handleDelete = (id) => {
    axios.delete(`hhttps://wild-teal-ox-slip.cyclic.app/${id}`)
      .then(response => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        setError(error.message);
      });
      window.location.reload();
  };

  const handleLike = (id) => {
    axios.post(`https://wild-teal-ox-slip.cyclic.app/${id}/like`)
      .then(response => {
        const updatedPost = response.data;
        console.log(updatedPost)
        setPosts(posts.map(post => {
          if (post.id === updatedPost.id) {
            return updatedPost;
          }
          return post;
        }));
      })
      .catch(error => {
        setError(error.message);
      });
      window.location.reload();
  };

  const handleUnlike = (id) => {
    axios.post(`https://wild-teal-ox-slip.cyclic.app/${id}/unlike`)
      .then(response => {
        const updatedPost = response.data;
        setPosts(posts.map(post => {
          if (post.id === updatedPost.id) {
            return updatedPost;
          }
          return post;
        }));
      })
      .catch(error => {
        setError(error.message);
      });
      window.location.reload();
  };

  return (
    <Box>
      {error && <Text>{error}</Text>}
      <Box style={{display:'grid',gridTemplateColumns:'repeat(1,1fr)',width:'80%',margin:"auto",gap:"20px",marginTop:"20px"}}>
            
            
            {posts?.map((post,index)=>(
                <Box key={index} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px",gap:'6px',margin:'5px',border:"1px solid #cecece",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                    <Text>UserID: {post.user_id}</Text>
                    <Text>{post.name}</Text>
                    <Text>{post.content}</Text>
                    <Text>Likes: {post.likes}</Text>
                    <HStack m={2}>
                    <Button onClick={() => handleLike(post._id)}>Like</Button>
                    <Button onClick={() => handleUnlike(post._id)}>Unlike</Button>
                    <Button onClick={onOpen}>Edit</Button>
                    <Button onClick={() => handleDelete(post._id)}>Delete</Button>

                    </HStack>

                    <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                    <ModalHeader>Update</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl>
                                        <FormLabel>Content</FormLabel>
                                        <Input
                                            type="text"
                                            name="content"
                                            value={content} 
                                            onChange={(e)=>setContent(e.target.value)}
                                            placeholder={content}
                                        />
        
                                    
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme={"green"} onClick={()=> handleEditClick(post._id)}>
                                        Update
                                        </Button>
                                    </ModalFooter>
                                    </ModalContent>
                                </Modal>
                    

                </Box>
            ))}

        </Box>
      {/* {posts.map((post, index) => (
        <Box key={index}>
          <Text>{post.user_id}</Text>
          <Text>{post.name}</Text>
          <Text>{post.content}</Text>
          <Text>Likes: {post.likes}</Text>
          <Button onClick={() => handleLike(post._id)}>Like</Button>
          <Button onClick={() => handleUnlike(post._id)}>Unlike</Button>
          <Button onClick={() => handleEditClick(post._id)}>Edit</Button>
          <Button onClick={() => handleDelete(post._id)}>Delete</Button>
          <Divider />
        </Box>
        
      ))} */}
    </Box>
  );
};

export default PostList;
