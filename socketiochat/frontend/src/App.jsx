import { Link, Outlet } from 'react-router-dom';
import './app.scss';

function App() {
  return (
    <>
      <h1><Link to="/"><span>./chat</span></Link></h1>
      <Outlet/>
    </>
  );
}

export default App;
