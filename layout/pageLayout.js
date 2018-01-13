import PageHeader from '../components/pageHeader';

export default (props)=>(
  <div>
    <link rel='stylesheet' href='http://cdn.bootcss.com/antd/2.9.3/antd.css' />
    <PageHeader/>
    {props.children}
  </div>
)
