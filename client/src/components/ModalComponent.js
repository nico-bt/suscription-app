import React, { useContext, useState } from "react";
import axios from "axios";
import { Modal, Button, InputGroup, FormControl, Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ModalComp({ text, variant }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

  const handleClose = () => {
    setShow(false);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleShow = () => setShow(true);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      let response;

      if (text === "Signup") {
        response = await axios.post(
          "https://bored-pear-beret.cyclic.app/api/auth/signup",
          { email, password }
        );
      } else {
        response = await axios.post(
          "https://bored-pear-beret.cyclic.app/api/auth/login",
          { email, password }
        );
      }

      if (response.data) {
        const { id, email, customerStripeId, token } = response.data;

        localStorage.setItem("token", token);
        // Set the token in the header for all the axios requests
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

        setUser({
          data: { id, email, customerStripeId },
          error: null,
          loading: false,
        });

        setError("");
        setEmail("");
        setPassword("");
        setIsLoading(false);

        navigate("/articles");
      }
    } catch (err) {
      if (Array.isArray(err.response?.data)) {
        setError(err.response?.data[0]);
      } else {
        setError(err.response?.data || err.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleShow}
        className="m-3"
        style={{ padding: "0.4rem 2.5rem" }}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={(e) => handleClick(e)} noValidate>
          <Modal.Header closeButton>
            <Modal.Title> {text} </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {error && <Alert variant="danger"> {error} </Alert>}

            <InputGroup className="mb-3">
              <InputGroup.Text>Email</InputGroup.Text>
              <FormControl
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} type="button">
              Close
            </Button>
            <Button variant={variant} type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mx-3"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                text
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalComp;
