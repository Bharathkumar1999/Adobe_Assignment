import { useEffect, useState } from "react";
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'

  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  

function UserList() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://wild-teal-ox-slip.cyclic.app/users')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleDeleteClick = (id) => {
    axios.delete(`https://wild-teal-ox-slip.cyclic.app/users/${id}`)
      .then(response => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        setError(error.message);
      });
      window.location.reload();
  };

  const handleEditClick = (id) => {
    axios.put(`https://wild-teal-ox-slip.cyclic.app/users/${id}`, { name, email, bio })
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




  return (
    <>
    <TableContainer>
        <Table variant='simple'>
            <TableCaption>User List</TableCaption>
            <Thead>
            <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Bio</Th>
                <Th>Actions</Th>
            </Tr>
            </Thead>
            <Tbody>
            {posts.map((user) => (
                <Tr key={user._id}>
                <Td>{user._id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.bio}</Td>
                <Td display={'flex'} gap={4}>
                    <Button onClick={onOpen}>Edit</Button>
                    <Button onClick={() => handleDeleteClick(user._id)}>Delete</Button>
                </Td>

                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                    <ModalHeader>Update</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={name} 
                                            onChange={(e)=>setName(e.target.value)}
                                            placeholder={name}
                                        />
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="text"
                                            name="email"
                                            value={email} 
                                            onChange={(e)=>setEmail(e.target.value)}
                                            placeholder={email}
                                        />
                                        <FormLabel>Bio</FormLabel>
                                        <Input
                                            type="text"
                                            name="bio"
                                            value={bio} 
                                            onChange={(e)=>setBio(e.target.value)}
                                            placeholder={bio}
                                        />
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme={"green"} onClick={()=> handleEditClick(user._id)}>
                                        Update
                                        </Button>
                                    </ModalFooter>
                                    </ModalContent>
                                </Modal>
                    
            </Tr>
          ))}
            
            </Tbody>
        </Table>
    </TableContainer>

    </>
  );
}

export default UserList;
