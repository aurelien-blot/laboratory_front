export default class LoadingService {

    static process(loadingList, truck) {
        let results = [];
        let preparedLoadingList = this.prepareLoadingList(loadingList, truck);
        results=this.useFFDMechanic(preparedLoadingList,truck);
        return results;
    }

    static prepareLoadingList(loadingList, truck) {
        let loadingListCopy = [...loadingList];
        loadingListCopy.forEach((item) => {
            //Si la largeur de la palette est supérieure à la largeur du camion la largeur devient la profondeur et la profondeur la largeur
            if(item.width > truck.width) {
                let tempW = item.width;
                let tempD = item.depth;
                item.width = tempD;
                item.depth = tempW;
            }
        });
        return loadingListCopy;
    }

    //FFD = First Fit Decreasing
    static useFFDMechanic(loadingList,truck) {
        // Dimensions du camion
        const truckWidth = truck.width; // Largeur du camion (axe horizontal)
        const truckDepth = truck.depth; // Profondeur du camion (axe longitudinal)

        // Trier les palettes par profondeur décroissante pour une meilleure optimisation
        const sortedList = [...loadingList].sort((a, b) => b.depth - a.depth);

        let layers = [];
        let currentRow = { depthUsed: 0, widthUsed: 0, columns: [] };
        let totalDepth = 0;

        for (let i=0; i<sortedList.length; i++) {
            let palette= sortedList[i];

            if (currentRow.widthUsed + palette.width <= truckWidth) {
                palette.x = currentRow.widthUsed; // Position horizontale
                palette.y = totalDepth; // Position verticale (profondeur)
                currentRow.columns.push([palette]);
                currentRow.widthUsed += palette.width;
                currentRow.depthUsed = Math.max(currentRow.depthUsed, palette.depth);

                //On regarde la largeur et la longueur restante pour voir si on peut ajouter une palette
                if(currentRow.columns.length>1){
                    let rowPalettes = [];
                    for(let p=0; p<currentRow.columns.length; p++){
                        let column = currentRow.columns[p];
                        let totalColumnDepth = 0;
                        let maxWidth = 0;
                        column.forEach((item) => {
                            totalColumnDepth+=item.depth;
                            maxWidth = Math.max(maxWidth,item.width);
                        });
                        rowPalettes.push({depth:totalColumnDepth,width:maxWidth, columnIndex : p});
                    }

                    rowPalettes.sort((a, b) => b.depth - a.depth);
                    let firstDeepest = rowPalettes[0].depth;
                    let firstWidth = rowPalettes[0].width;
                    let secondDeepest = rowPalettes[1].depth;
                    if(firstDeepest>secondDeepest){
                        let remainingDepth = firstDeepest - secondDeepest;
                        let remainingWidth = truckWidth - firstWidth;
                        //On va chercher la palette la plus profonde qui puisse rentrer

                        //On récup la liste dans l'odre de largeur décroissante
                        let bestPaletteToChooseIndex = null;
                        let maxWidth = 0;
                        for (let j=i+1; j<sortedList.length; j++) {
                            let remainingPalette= sortedList[j];

                            if (remainingPalette.depth <= remainingDepth && remainingPalette.width <= remainingWidth && remainingPalette.width >= maxWidth) {
                                maxWidth = remainingPalette.width;
                                bestPaletteToChooseIndex = j;
                            }
                        }
                        if(bestPaletteToChooseIndex!=null){
                            let paletteToLoad= sortedList[bestPaletteToChooseIndex];

                            //On charge la palette maintenant
                            paletteToLoad.x = firstWidth; // Position horizontale
                            paletteToLoad.y = totalDepth + secondDeepest; // Position verticale (profondeur)
                            currentRow.columns[rowPalettes[1].columnIndex].push(paletteToLoad);
                            //On la retire du sortedList
                            sortedList.splice(bestPaletteToChooseIndex,1);
                        }


                    }
                }

            } else {
                layers.push(currentRow);
                totalDepth += currentRow.depthUsed;

                currentRow = { depthUsed: 0, widthUsed: 0, columns: [] };
                palette.x = 0;
                palette.y = totalDepth;
                currentRow.columns.push([palette]);
                currentRow.widthUsed += palette.width;
                currentRow.depthUsed = palette.depth;
            }
        }

        // Ajouter la dernière rangée si elle contient des palettes
        if (currentRow.columns.length > 0) {
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