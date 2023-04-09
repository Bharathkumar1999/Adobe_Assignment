import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, AlertDescription, AlertIcon,  Button, Center, Container, FormControl, FormHelperText, FormLabel, Input, Select, Textarea, useToast, VStack } from "@chakra-ui/react";




const PostForm = () => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  console.log(userId)


  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then(response => {
       
        setUsers(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

 
    const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
        await axios.post('http://localhost:8080/posts', { user_id: userId, content });
       
      setContent('');
      setError(null);
  
    } catch (error) {
      setError(error.response.data.message);
    }
  };


  return (
    <Container
      width={{
        base: 'full',
        sm: 'full',
        md: 'container.xl',
        lg: 'container.lg'
      }}
      centerContent={true}
    >
      <VStack
        width='full'
        boxShadow='lg'
        py={{base:4, sm:4, md:4, lg:3}}
        my={{base:24, sm:24, md:28, lg:20}}
        px={{base:2, sm:2, md:4, lg:3}}
      >
        <FormControl>
          <FormLabel>Content</FormLabel>
          <Input type='text' value={content} onChange={event => setContent(event.target.value)} />
         
        </FormControl>

        <FormControl>
          <FormLabel>User</FormLabel>
          <Select value={userId} onChange={(event) => setUserId(event.target.value)}>
          <option value="">-- Select a user --</option>
            {users.map((user) => (
                <option key={user._id} value={user._id}>
                {user.name}
               </option>
            ))} 
          </Select>
         
        </FormControl>

        <FormControl>
          <Center>
            <Button
              variant='outline'
              colorScheme='gray'
              mt={4}
              onClick={handleSubmit}     
            >
              Create
            </Button>
          </Center>
        </FormControl>

      </VStack>

    </Container>
   
  );
};

export default PostForm;

