import React, { useState } from 'react';  
import { Modal, Button, Form } from 'react-bootstrap';   
  
/**  
 * AddModelModal component allows users to add a new sentiment analysis model.  
 * @param {Object} props - component props  
 * @param {boolean} props.show - whether the modal is visible  
 * @param {Function} props.handleClose - function to close the modal  
 * @param {Function} props.handleSave - function to save the new model  
 */ 

const AddModelModal = ({ show, handleClose, handleSave }) => {  
  const [publicName, setPublicName] = useState('');  
  const [realName, setRealName] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  
  
    /**  
   * Handle form submission to add a new model  
   * @param {Event} e - form submission event  
   */  
  const handleModelSubmit = async (e) => {  
    e.preventDefault();  
    try { 
      handleSave({ public_name: publicName, real_name: realName, password: password });  
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
        <Form onSubmit={handleModelSubmit}>  
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
        <p>You can use models found in: <a target='_blank' rel="noreferrer" href="https://huggingface.co/models?pipeline_tag=text-classification&sort=trending&search=sentiment">huggingface</a>.</p>  
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
