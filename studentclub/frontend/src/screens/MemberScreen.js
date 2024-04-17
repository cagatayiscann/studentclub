import React from 'react'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import members from '../members'

function MemberScreen() {
  return (
    <div>
        <h1>Members</h1>
        <Row>
            {members.map( member => (
                <ListGroup.Item key={members._id}>
                    <Row>
                        <Col md={1}>
                            <Image src={member.image} alt={member.name} fluid rounded />
                        </Col>
                        <Col md={2}>
                            {member.name}
                        </Col>
                    </Row>

                </ListGroup.Item>
            ))}
        </Row>
    </div>
  )
}

export default MemberScreen