import ImageComponent from './Components/ImageComponent'
import ListComponent from './Components/ListComponent'
const app = document.querySelector('#app');
app.appendChild(ImageComponent.render());
app.appendChild(ListComponent.render());