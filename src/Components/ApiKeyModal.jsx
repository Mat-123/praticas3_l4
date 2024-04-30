import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ApiKeyModal = ({ show, handleClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [user, setUser] = useState('');


  const handleSaveApiKey = () => {
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('user', user);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Inserisci la tua chiave API</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="apiKeyInput">
            <Form.Label>Chiave API:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci la tua chiave API"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="userInput">
            <Form.Label>Utente:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il tuo nome utente"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleSaveApiKey}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApiKeyModal;
