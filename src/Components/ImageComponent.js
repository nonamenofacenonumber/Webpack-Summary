import './styles/image-style.scss'
import FirstImage from './images/Desert.jpg'
import data from './colors.json'

import _ from 'lodash'
_.map([1, 2], item => console.log(item))

class ImageComponent {
    createImageTag() {
        const image = document.createElement('img');
        image.alt = 'MY Image';
        image.classList.add('image');
        image.src = FirstImage;
        image.height = 200;
        image.width = 200;
        return image;
    }
    createTexTag() {
        const text = document.createElement('h2');
        text.innerText = 'سلام سعید';
        return text;
    }
    render() {
        const element = document.createElement('div');
        element.classList.add('image-box')
        element.appendChild(this.createImageTag());
        element.appendChild(this.createTexTag());
        console.log(data);
        return element;
    }
}
export default new ImageComponent();