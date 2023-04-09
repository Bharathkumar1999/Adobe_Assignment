import React, { useState } from 'react';
import axios from 'axios';
import { Alert, AlertDescription, AlertIcon,  Button, Center, Container, FormControl, FormHelperText, FormLabel, Input, Textarea, useToast, VStack } from "@chakra-ui/react";


const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
//   const [loading, setLoading]= useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
        await axios.post('http://localhost:8080/users', { name, email, bio });
    
      setName('');
      setEmail('');
      setBio('');
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
          <FormLabel>Name</FormLabel>
          <Input type='text' value={name} onChange={event => setName(event.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' value={email} name='email' onChange={event => setEmail(event.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Textarea placeholder='Bio' id='bio' value={bio} onChange={event => setBio(event.target.value)}  />
        </FormControl>

        <FormControl>
          <Center>
            <Button
              variant='outline'
              colorScheme='gray'
              mt={4}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Center>
        </FormControl>

      </VStack>

    </Container>
    
  );
};

export default UserForm;
