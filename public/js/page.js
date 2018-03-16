// import store from '../redux/appStore.js';


function changeState() {
  //store.dispatch({ type: 'UNSET_PRO', proState: 'no' });
}

function updatePro(proState)
{
  window.postMessage(proState,'http://localhost:3000');
}

//export default changeState;
