import { Affix, Breadcrumb, Col, Row } from 'antd'
import axios from 'axios'
import Head from 'next/head'
import { CalendarOutlined, FireOutlined, FolderOutlined } from '@ant-design/icons'
import Advert from '../components/Advert'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Header from '../components/Header'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import Tocify from '../components/tocify.tsx'
import 'highlight.js/styles/monokai-sublime.css'

export default function Detailed(props) {
  const renderer = new marked.Renderer()
  const tocify = new Tocify();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id='${anchor}' href='#${anchor}' class='anchor-fix'><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href='/'>视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className='detailed-title'>
                React实战视频教程
              </div>
              <div className='list-icon center'>
                <span><CalendarOutlined />2021-06-07</span>
                <span><FolderOutlined />视频教程</span>
                <span><FireOutlined />8888人</span>
              </div>
              <div className='detailed-content' dangerouslySetInnerHTML={{ __html: html }}>
              </div>
            </div>
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5} >
            <div className='detailed-nav comm-box'>
              <div className='nav-title'>文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detailed.getInitialProps = async (context) => {
  console.log(context.query.id);
  let id = context.query.id;

  const promise = new Promise((resolve) => {
    axios.get(servicePath.getArticleById + id).then(
      (res) => {
        console.log(res);
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}
