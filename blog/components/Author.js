import { Avatar, Divider } from "antd"
import { GithubOutlined, QqOutlined, WechatOutlined } from "@ant-design/icons"

const Author = () => {
  return (
    <div className='author-div comm-box'>
      <div>
        <Avatar size={100} src='' />
      </div>
      <div className='author-introduction'>
        大黄大黄
        <Divider>社交账号</Divider>
        <GithubOutlined className='account' />
        <QqOutlined className='account' />
        <WechatOutlined className='account' />
      </div>
    </div>
  )
}

export default Author