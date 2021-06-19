import React, { useEffect, useState } from "react";
import { Col, Menu, Row } from "antd"
import * as Icon from '@ant-design/icons'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from "../config/apiUrl";

const Item = Menu.Item;

/**
 * 顶部
 */
const Header = () => {
  const [navArray, setNavArray] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          return res.data.data
        }
      )
      setNavArray(result)
    }
    fetchData()
  }, [])

  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/')
    } else {
      Router.push('./list?id=' + e.key)
    }
  }

  return (
    <div className='header'>
      <Row type='flex' justify='center'>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <span className='header-logo'>黄罐头</span>
          <span className='header-txt'>你永远不会独行</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={14} xl={10}>
          <Menu mode='horizontal' onClick={handleClick}>
            <Item key='0'>
              <Icon.HomeOutlined />
              首页
            </Item>
            {
              navArray.map((item) => {
                return (
                  <Item key={item.Id}>
                    {
                      React.createElement(
                        Icon[item.icon]
                      )
                    }
                    {item.typeName}
                  </Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header