import "./styles/list-style.scss"
class ListComponent {
    createItem(title) {
        const item = document.createElement('li');
        item.innerHTML = title;
        return item;
    }
    render() {
        const element = document.createElement('ul');
        element.appendChild(this.createItem('item 1'));
        element.appendChild(this.createItem('item 2'));
        element.appendChild(this.createItem('item 3'));
        return element;
    }
}
export default new ListComponent();