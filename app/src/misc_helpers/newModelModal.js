import React, { useState } from 'react';  
import { Modal, Button, Form } from 'react-bootstrap';  
import { validateAndDownloadModel } from '../misc_helpers/api'; // Assuming you have this API helper  
  
const AddModelModal = ({ show, handleClose, handleSave }) => {  
  const [publicName, setPublicName] = useState('');  
  const [realName, setRealName] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  
  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      await validateAndDownloadModel(realName);  
      handleSave({ public_name: publicName, real_name: realName });  
      handleClose();  
    } catch (err) {  
      setError('Failed to validate or download the model.');  
    }  
  };  
  
  return (  
    <Modal show={show} onHide={handleClose}>  
      <Modal.Header closeButton>  
        <Modal.Title>Add New Model</Modal.Title>  
      </Modal.Header>  
      <Modal.Body>  
        <Form onSubmit={handleSubmit}>  
          <Form.Group className="mb-3" controlId="publicName">  
            <Form.Label>Public Name</Form.Label>  
            <Form.Control  
              type="text"  
              value={publicName}  
              onChange={(e) => setPublicName(e.target.value)}  
              required  
            />  
          </Form.Group>  
          <Form.Group className="mb-3" controlId="realName">  
            <Form.Label>Real Name</Form.Label>  
            <Form.Control  
              type="text"  
              value={realName}  
              onChange={(e) => setRealName(e.target.value)}  
              required  
            />  
          </Form.Group> 
          <Form.Group className="mb-3" controlId="password">  
            <Form.Label>New models Password</Form.Label>  
            <Form.Control  
              type="password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
              required  
            />  
          </Form.Group>  
        <p>You can use models found in: <a target='_blank' href="https://huggingface.co/models?pipeline_tag=text-classification&sort=trending&search=sentiment">huggingface</a>.</p>  
          {error && <p className="text-danger">{error}</p>}  
          <Button variant="primary" type="submit">  
            Add Model  
          </Button>  
        </Form>
      </Modal.Body>  
    </Modal>  
  );  
};  
  
export default AddModelModal;  
