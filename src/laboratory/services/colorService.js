export default class ColorService {

    static generateRandomColor() {
        // Générer une couleur aléatoire
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor;
    }

}