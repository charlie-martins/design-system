import { Button } from './components/Button';

function App() {
  return (
    <div style={{ padding: 40, display: 'flex', gap: 12 }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

export default App;
