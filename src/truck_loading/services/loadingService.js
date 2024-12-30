export default class LoadingService {

    static process(loadingList, truck) {
        console.log('LoadingService.process()');
        let results = [];
        results=this.useFFDMechanic(loadingList,truck);
        console.log("Optimized placement:", results);
        return results;
    }

    //FFD = First Fit Decreasing
    static useFFDMechanic(loadingList,truck) {
        // Dimensions du camion
        const truckWidth = truck.width; // Largeur du camion (axe horizontal)
        const truckDepth = truck.depth; // Profondeur du camion (axe longitudinal)

        // Trier les palettes par profondeur décroissante pour une meilleure optimisation
        const sortedList = [...loadingList].sort((a, b) => b.depth - a.depth);

        let layers = [];
        let currentRow = { depthUsed: 0, widthUsed: 0, items: [] };
        let totalDepth = 0;

        for (let palette of sortedList) {
            if (currentRow.widthUsed + palette.width <= truckWidth) {
                palette.x = currentRow.widthUsed; // Position horizontale
                palette.y = totalDepth; // Position verticale (profondeur)
                currentRow.items.push(palette);
                currentRow.widthUsed += palette.width;
                currentRow.depthUsed = Math.max(currentRow.depthUsed, palette.depth);
            } else {
                layers.push(currentRow);
                totalDepth += currentRow.depthUsed;

                currentRow = { depthUsed: 0, widthUsed: 0, items: [] };
                palette.x = 0;
                palette.y = totalDepth;
                currentRow.items.push(palette);
                currentRow.widthUsed += palette.width;
                currentRow.depthUsed = palette.depth;
            }
        }

        // Ajouter la dernière rangée si elle contient des palettes
        if (currentRow.items.length > 0) {
            layers.push(currentRow);
        }

        // Vérifier que les palettes respectent la profondeur totale du camion
        let totalDepthUsed = layers.reduce((sum, row) => sum + row.depthUsed, 0);
        if (totalDepthUsed > truckDepth) {
            console.error("Les palettes dépassent la profondeur totale du camion !");
        }
        return layers;
    }

}