import { useAppSelector } from './hooks';
import { VIEW_GARAGE } from './constants';
import Nav from './components/Nav';
import GarageView from './components/GarageView';
import WinnersView from './components/WinnersView';

function App() {
  const view = useAppSelector((state) => state.ui.view);

  return (
    <div className="app">
      <Nav />
      {view === VIEW_GARAGE ? <GarageView /> : <WinnersView />}
    </div>
  );
}

export default App;
