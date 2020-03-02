import React from 'react';

interface Iprops {
  name:string
}
interface IState {
  state:string
}
class App extends React.Component<Iprops,IState>{
  state={
    state:"123"
  };
  render(){
    return(
        <div>
          <span>{this.props.name}</span>
          <span>{this.state.state}</span>
        </div>
    )
  }
}
export default App;
