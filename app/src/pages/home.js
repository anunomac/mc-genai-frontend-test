import React, { useState, useEffect } from 'react';  
import { getSentimentAnalyzers, initiateSentimentAnalysis, getClassificationStatus, addNewModel } from '../misc_helpers/api';  
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import './home.css';  
import MyLoader from '../misc_helpers/content_loader';  
import AddModelModal from '../misc_helpers/newModelModal';
  

/**  
 * SentimentAnalyzers component fetches and displays sentiment analyzers,  
 * handles sentiment analysis initiation, and displays classification status.  
 */ 

const SentimentAnalyzers = () => {  
    // State variables to manage analyzers, query, selected model, classifications, and modal visibility  
  const [analyzers, setAnalyzers] = useState([]);  
  const [query, setQuery] = useState('');  
  const [selectedModel, setSelectedModel] = useState('');  
  const [classifications, setClassifications] = useState([]);  
  const [showModal, setShowModal] = useState(false);
  

  // Fetch sentiment analyzers on component mount
  useEffect(() => {  
    const fetchAnalyzers = async () => {  
      try {  
        const data = await getSentimentAnalyzers();  
        setAnalyzers(data);  
      } catch (err) {  
        console.error(err);  
      }  
    };  
    fetchAnalyzers();  
  }, []);  
  
  useEffect(() => {  
    // Cleanup intervals on component unmount  
    return () => {  
      classifications.forEach(classification => {  
        if (classification.intervalId) {  
          // clearInterval(classification.intervalId);  //this was clearing some intervals it shouldnt!
        }  
      });  
    };  
  }, [classifications]);  

    /**  
   * Handle form submission to initiate sentiment analysis  
   * @param {Event} e - form submission event  
   */  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await initiateSentimentAnalysis(query, selectedModel);  
      if (response.status) {  
        // Clear the query field  
        setQuery('');  
  
        // Add new classification to the list  
        const newClassification = {  
          classificationId: response.class_id,  
          accessKey: response.access_key,  
          status: response.msg,  
          query: query,  
          classificationStatus: null,  
          intervalId: null,  
        };  
        setClassifications((prevClassifications) => [  
          newClassification,  
          ...prevClassifications,  
        ]);  
  
        // Start polling for status every 5 seconds  
        const intervalId = setInterval(async () => {  
          try {  
            const statusResponse = await getClassificationStatus(newClassification.classificationId, newClassification.accessKey);  
            setClassifications((prevClassifications) =>  
              prevClassifications.map((classification) =>  
                classification.classificationId === newClassification.classificationId  
                  ? { ...classification, classificationStatus: statusResponse }  
                  : classification  
              )  
            );  
            if (statusResponse.status === 3 || statusResponse.status === 0) { // 3 = completed; 0 = failed  
              clearInterval(intervalId);  
            }  
          } catch (err) {  
            console.error(err);  
          }  
        }, 5000);  
  
        // Store interval ID in classification for cleanup  
        setClassifications((prevClassifications) =>  
          prevClassifications.map((classification) =>  
            classification.classificationId === newClassification.classificationId  
              ? { ...classification, intervalId }  
              : classification  
          )  
        );  
      }  
    } catch (err) {  
      console.error(err);  
    }  
  };  

    /**  
   * Handle saving a new model  
   * @param {Object} model - the new model to be saved  
   */  
  const handleSave = async (model) => {  
    try {  
      await addNewModel(model); 
      const data = await getSentimentAnalyzers(); // Refresh the list of analyzers  
      setAnalyzers(data);  
    } catch (err) {  
      console.error(err);  
    }  
  };  
  
    /**  
   * Render the classification status card  
   * @param {Object} classification - the classification object  
   * @returns {JSX.Element} - the JSX element representing the classification status  
   */ 
  const renderClassificationStatus = (classification) => {  
    if (!classification.classificationStatus) {  
      return (  
        <Col md={4} className="mb-4" key={classification.classificationId}>  
          <Card>  
            <Card.Body>  
              <Card.Title>Classification Status</Card.Title>  
              <Card.Text className='card-text d-flex align-items-center gap-2'><strong>Message:</strong> {classification.query}</Card.Text>  
              <Card.Text className='card-text d-flex align-items-center gap-2'><strong>Model:</strong> <MyLoader /></Card.Text>  
              <Card.Text className='card-text d-flex align-items-center gap-2'><strong>Status:</strong>  <MyLoader /></Card.Text>  
              <Card.Text className='card-text d-flex align-items-center gap-2'><strong>Classification:</strong>  <MyLoader /></Card.Text>  
              <Card.Text className='card-text d-flex align-items-center gap-2'><strong>Score:</strong>  <MyLoader /></Card.Text>  
            </Card.Body>  
          </Card>  
        </Col>  
      );  
    }  
  
    const { target_model, user_message, status, model_classification, model_classification_score } = classification.classificationStatus;  
  
    return (  
      <Col md={4} className="mb-4" key={classification.classificationId}>  
        <Card>  
          <Card.Body>  
            <Card.Title>Classification Status</Card.Title>  
            <Card.Text><strong>Message:</strong> {user_message}</Card.Text>  
            <Card.Text><strong>Model:</strong> {target_model.public_name}</Card.Text>  
            <Card.Text style={{ wordWrap: 'break-word', textWrap: 'balance' }}><strong>Status:</strong> {status === 3 ? "Completed" : "In Progress"}</Card.Text>  
            {status === 3 && (  
              <>  
                <Card.Text><strong>Classification:</strong> {model_classification}</Card.Text>  
                <Card.Text><strong>Score:</strong> {model_classification_score}</Card.Text>  
              </>  
            )}  
          </Card.Body>  
        </Card>  
      </Col>  
    );  
  };  
  
  return (  
    <Container>  
      <h1>Sentiment Analysis</h1>  
      <Form onSubmit={handleSubmit}>  
        <Form.Group className="mb-3" controlId="query">  
          <Form.Label>Query</Form.Label>  
          <Form.Control  
            type="text"  
            value={query}  
            onChange={(e) => setQuery(e.target.value)}  
            required  
          />  
        </Form.Group>  
        <Form.Group className="mb-3" controlId="model">  
          <Form.Label>Select Model</Form.Label>  
          <div className="d-flex">  
            <Form.Control  
              as="select"  
              value={selectedModel}  
              onChange={(e) => setSelectedModel(e.target.value)}  
              required  
            >  
              <option value="">Choose a model</option>  
              {analyzers.map((analyzer) => (  
                <option key={analyzer.id} value={analyzer.id}>  
                  {analyzer.public_name}  
                </option>  
              ))}  
            </Form.Control>  
            <Button variant="secondary" onClick={() => setShowModal(true)} className="ms-2">  
              +  
            </Button>  
          </div>  
        </Form.Group>  
        <Button type="submit" variant="primary">Start Analysis</Button>  
      </Form>  
      <Row className="mt-3">  
        {classifications.map((classification) => renderClassificationStatus(classification))}  
      </Row>  
      <AddModelModal  
        show={showModal}  
        handleClose={() => setShowModal(false)}  
        handleSave={handleSave}  
      />  
    </Container>  
  );  
};  
  
export default SentimentAnalyzers;  
