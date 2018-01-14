import styles from 'antd/dist/antd.css';
import PageHeader from '../components/pageHeader';

export default (props)=>(
  <div>
    <style dangerouslySetInnerHTML={{__html: styles}} />
    <PageHeader/>
    {props.children}
  </div>
)
