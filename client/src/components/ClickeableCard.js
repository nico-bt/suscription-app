import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';


function ClickeableCard( {item, children} ) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Card className='text-center hoverCard' onClick={() => setShow(true)}>
        {children}
      </Card>

      <Modal
      style={{"minWidth":"90%"}}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {item.title}
          </Modal.Title>
        </Modal.Header>
        <img src={item.imageUrl} alt={item.title} style={{"maxWidth":"75%", "margin":"0 auto"}} />
        <Modal.Body>
            <div style={{"padding":"1.5rem"}}>
                {item.content.split("</p>").map(line => <p>{line}</p>)}
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ClickeableCard