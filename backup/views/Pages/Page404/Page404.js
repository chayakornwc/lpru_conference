import React, {Component} from 'react';
import {Container, Row, Col, Button, Input, InputGroupAddon, InputGroup, InputGroupText} from 'reactstrap';

class Page404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">เพจนี้ไม่พร้อมใช้งาน!</h4>
                <p className="text-muted float-left">ลิงก์ที่คุณเคยติดตามอาจเสียหายหรืออาจได้มีการลบเพจนี้ออกแล้ว</p>
              </div>
              <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input size="16" type="text" placeholder="ให้เราช่วยคุณไหม ?"/>
                <InputGroupAddon addonType="append">
                  <Button color="info">ค้นหาเลย</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
