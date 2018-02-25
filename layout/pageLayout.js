import styles from 'antd/dist/antd.css';
import PageHeader from '../components/pageHeader';

export default (props)=>(
  <div>
    <style dangerouslySetInnerHTML={{__html: styles}} />
    <PageHeader/>
    <div style={{ padding: 10 }}>
      {props.children}
    </div>
  </div>
)
