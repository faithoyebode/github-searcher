import React, { FC, ReactElement } from 'react';
import Pages from 'pages';
import { BrowserRouter as Router } from 'react-router-dom';


const App: FC<any> = (): ReactElement => {
  return (
    <div className="App">
      <Router>
        <div>
          <Pages />
        </div>
      </Router>
    </div>
  );
}

export default App;
