<template>
  <BasicViewComponent>
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">Mes recettes</h1>
        </div>
      </div>
      <div class="row mb-4">
        <div class="d-none d-md-block col-md-3">
          <div class="row m-3" v-for="recipe in recipes">
            <div class="btn btn-primary" @click="selectRecipeFromButton(recipe)"
                 :class="recipe.id === selectedRecipe?.id ? 'active' : ''">
              {{ recipe.title }}
            </div>
          </div>

        </div>
        <div class="d-block d-md-none col-md-3">
          <div class="row m-3">
            <select class="form-select" @change="selectRecipeFromList($event.target.value)">
              <option value="" disabled selected>Choisir une recette</option>
              <option v-for="(recipe, index) in recipes" :key="recipe.id" :value="index">
                {{ recipe.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-10 col-md-7  offset-1 bg-light-blue rounded p-3" v-if="selectedRecipe!=null">
          <div class="row">
            <div class="col-12 text-center">
              <h2 class="mb-3">{{ selectedRecipe.title }}</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h4>Ingrédients :</h4>
              <ul>
                <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient">{{ ingredient }}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <h4>Recette : {{ selectedRecipe.time }}</h4>
            <div class="col-12 ">
              <p v-html="selectedRecipe.description"></p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BasicViewComponent>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";

export default {
  name: 'Cooking',
  components: {
    BasicViewComponent,
  },
  data() {
    return {
      recipes: [
        {
          id: 1,
          title: "Pâte brisée 2*25cm",
          time: "15 min",
          ingredients: [
            "250g de farine",
            "125g de beurre",
            "1 pincée de sel",
            "1 jaune d’œuf (facultatif, pour lier)",
            "4–5 c. à soupe d’eau froide"
          ],
          description: "1. Préparer les ingrédients" +
              "<br/>" +
              "Coupe ton beurre froid en petits dés.<br/>" +
              "<br/>" +
              "Mets la farine + sel dans un grand bol.<br/>" +
              "<br/>" +
              "2. Sabler la pâte<br/>" +
              "<br/>" +
              "Ajoute le beurre dans la farine.<br/>" +
              "<br/>" +
              "Avec tes doigts (ou un coupe-pâte / robot), frotte le beurre dans la farine → tu dois obtenir une texture sableuse, avec encore quelques petits morceaux de beurre visibles (c’est ce qui donne une pâte friable et fondante).<br/>" +
              "<br/>" +
              "3. Lier<br/>" +
              "<br/>" +
              "Ajoute les œufs. Mélange rapidement avec une cuillère en bois ou tes mains.<br/>" +
              "<br/>" +
              "Ajoute l’eau progressivement (pas tout d’un coup).<br/>" +
              "<br/>" +
              "Dès que la pâte se tient en boule, arrête de travailler (sinon elle sera dure).<br/>" +
              "<br/>" +
              "4. Repos<br/>" +
              "<br/>" +
              "Coupe la pâte en 2 boules égales.<br/>" +
              "<br/>" +
              "Aplatis-les un peu en disque.<br/>" +
              "<br/>" +
              "Filme-les et mets-les au frigo au moins 30 minutes (jusqu’à 24h possible).<br/>" +
              "👉 Ça détend le gluten et durcit le beurre → pâte plus facile à étaler.<br/>" +
              "<br/>" +
              "5. Foncer les moules<br/>" +
              "<br/>" +
              "Farine légèrement ton plan de travail.<br/>" +
              "<br/>" +
              "Étale un disque de pâte au rouleau jusqu’à ≈ 3 mm d’épaisseur (plus grand que ton moule pour recouvrir les bords).<br/>" +
              "<br/>" +
              "Dépose dans ton moule de 25 cm (idéalement beurré/fariné si ce n’est pas un moule anti-adhésif).<br/>" +
              "<br/>" +
              "Pique le fond à la fourchette (ça évite les bulles).<br/>" +
              "<br/>" +
              "6. Précuire (important pour une quiche aux tomates, car elles rendent du jus)<br/>" +
              "<br/>" +
              "Couvre le fond avec du papier parchemin et des poids (ou haricots secs / riz).<br/>" +
              "<br/>" +
              "Précuis à 180 °C (350 °F) environ 15 minutes.<br/>" +
              "<br/>" +
              "Retire le papier + poids et cuis encore 5 minutes pour sécher légèrement le fond.  "
        },
        {
          id: 2,
          title: "Tarte fine tomate, chèvre & moutarde",
          time: "35 min",
          ingredients: [
            "1 pâte feuilletée ou brisée",
            "5-6 tomates Roma ou en grappes",
            "150 g de chèvre frais",
            "1 c. à s. de chapelure",
            "Huile d’olive",
            "Moutarde",
            "Origan",
            "Sel, poivre",
            "Miel",
            "Basilic frais (optionnel)"
          ],
          description: "Préchauffe le four à 200 °C / 400 °F. Déroule la pâte sur une plaque, pique-la à la fourchette.<br/>" +
              "<br/>" +
              "Pré-sèche les tomates : coupe en tranches de 5–6 mm, sale légèrement et pose sur papier absorbant 10 min.<br/>" +
              "<br/>" +
              "Barrière anti-humidité : étale la moutarde sur la pâte, saupoudre semoule/chapelure.<br/>" +
              "<br/>" +
              "Garnis de tomates, dépose des petits morceaux de chèvre.<br/>" +
              "On prépare dans un petit bol une sauce : huile d’olive + miel + origan + poivre et au pinceau on badigeonne toute la tarte.<br/>" +
              "<br/>" +
              "Cuisson : 20–25 min jusqu’à bords bien feuilletés.<br/>" +
              "<br/>" +
              "Refroidis complètement sur grille. À table : un peu de basilic ou un trait de vinaigre balsamique, et c’est prêt."
        },
        {
          id: 3,
          title: "Purée de courge butternuts",
          time: "45 min",
          ingredients: [
            "1 grosse courge butternut (≈ 1,2–1,5 kg → tu auras environ 700 g de chair)",
            "40 g de beurre (≈ 3 c. à soupe)",
            "2 à 3 c. à soupe de crème 15% (ou un peu de lait si tu veux plus léger)",
            "Sel, poivre",
            "une pincée de muscade (Facultatif)",
            "Persil pour décorer (Facultatif)"
          ],
          description: "1. Préparer la courge<br/>" +
              "<br/>" +
              "Coupe la courge en deux dans la longueur (attention, c’est dur → prends un bon couteau et vas-y prudemment).<br/>" +
              "<br/>" +
              "Retire les graines avec une cuillère.<br/>" +
              "<br/>" +
              "Pèle la courge avec un éplucheur costaud (ou un couteau si elle est trop coriace).<br/>" +
              "<br/>" +
              "Coupe la chair en gros dés (3–4 cm).<br/>" +
              "<br/>" +
              "2. Cuisson<br/>" +
              "<br/>" +
              "👉 Tu as 2 options :<br/>" +
              "<br/>" +
              "Option vapeur/eau (rapide)<br/>" +
              "<br/>" +
              "Mets les dés de courge dans une casserole d’eau bouillante salée ou dans un panier vapeur.<br/>" +
              "<br/>" +
              "Cuis 20–25 minutes, jusqu’à ce qu’un couteau entre facilement.<br/>" +
              "<br/>" +
              "Égoutte bien (important sinon la purée sera trop liquide).<br/>" +
              "<br/>" +
              "Option four (plus goût caramélisé)<br/>" +
              "<br/>" +
              "Mets les dés de courge sur une plaque avec un peu d’huile.<br/>" +
              "<br/>" +
              "Rôtis à 200 °C (400 °F) 30–35 minutes → jusqu’à tendres et dorés.<br/>" +
              "<br/>" +
              "3. Réduire en purée<br/>" +
              "<br/>" +
              "Mets la chair cuite dans un bol.<br/>" +
              "<br/>" +
              "Écrase au presse-purée ou au mixeur plongeant (selon la texture que tu veux).<br/>" +
              "<br/>" +
              "Ajoute le beurre + la crème (ou lait).<br/>" +
              "<br/>" +
              "Sale, poivre, ajoute muscade si tu aimes.<br/>" +
              "<br/>" +
              "Mélange jusqu’à une purée bien lisse.<br/>" +
              "<br/>" +
              "4. Servir<br/>" +
              "<br/>" +
              "Tu peux décorer avec un brin de persil ou un filet de beurre fondu.<br/>" +
              "<br/>" +
              "💡 Astuces<br/>" +
              "<br/>" +
              "Si ta purée est trop liquide → remets-la dans une casserole quelques minutes pour évaporer l’excès d’eau.<br/>" +
              "<br/>" +
              "Tu peux aussi faire un mélange courge + carottes pour plus de couleur et varier les saveurs.<br/>" +
              "<br/>" +
              "Version plus “gastronomique” : ajoute un petit filet de sirop d’érable en fin de purée 🍁 (typique du Québec)."
        },
        {
          id: 4,
          title: "Tourtière familiale",
          time: "90min ?",
          ingredients: [
            "400 g de bœuf haché",
            "400 g de porc haché",
            "3 oignons hachés fin",
            "3 gousses ail hachées",
            "2 pommes de terre moyennes (≈ 200 g)",
            "250 ml (1 tasse) de bouillon de poulet ou de bœuf",
            "1 c. à café de cannelle",
            "½ c. à café de clou de girofle moulu",
            "½ c. à café de muscade",
            "Sel, poivre",
            "2 c. à soupe huile ou beurre",
          ],
          description: "Dans une grande poêle, fais revenir oignons + ail dans un peu d’huile.<br/>" +
              "<br/>" +
              "Ajoute les viandes hachées, fais-les cuire en émiettant bien (pas de gros morceaux).<br/>" +
              "<br/>" +
              "Assaisonne avec sel, poivre, cannelle, clou de girofle, muscade.<br/>" +
              "<br/>" +
              "Ajoute les pommes de terre râpées + bouillon.<br/>" +
              "<br/>" +
              "Laisse mijoter 30 minutes à feu doux jusqu’à ce que le liquide soit presque évaporé (il doit rester un peu de moelleux, pas sec).<br/>" +
              "<br/>" +
              "Goûte et ajuste assaisonnement (important !).<br/>" +
              "<br/>" +
              "Laisse tiédir avant de garnir la pâte.<br/>" +
              "<br/>" +
              "Foncer le moule<br/>" +
              "<br/>" +
              "Étale une pâte brisée et dépose-la dans ton plat à tourtière (25 cm).<br/>" +
              "<br/>" +
              "Pique le fond avec une fourchette.<br/>" +
              "<br/>" +
              "Mets la garniture refroidie.<br/>" +
              "<br/>" +
              "Fermer<br/>" +
              "<br/>" +
              "Étale la 2e pâte, couvre la tourtière.<br/>" +
              "<br/>" +
              "Scelle les bords (pince avec les doigts ou une fourchette).<br/>" +
              "<br/>" +
              "Fais une petite cheminée (trou au centre) pour laisser sortir la vapeur.<br/>" +
              "<br/>" +
              "Badigeonne le dessus avec un peu de jaune d’œuf + lait (dorure).<br/>" +
              "<br/>" +
              "Cuisson<br/>" +
              "<br/>" +
              "Four à 190 °C (375 °F), 40–45 minutes → la pâte doit être bien dorée.<br/>" +
              "<br/>" +
              "Laisse reposer 10 minutes avant de couper (ça fixe les jus).<br/>" +
              "<br/>" +
              "💡 Astuces<br/>" +
              "<br/>" +
              "Préparer à l’avance : tu peux faire la garniture la veille, garder au frigo, et juste assembler/cuire le jour J.<br/>" +
              "<br/>" +
              "Congélation : la tourtière se congèle très bien (crue ou cuite).<br/>" +
              "<br/>" +
              "Variante régionale : certains ajoutent un peu de céleri ou de carottes dans la farce."
        },
        {
          id: 5,
          title: "Pâtes sauce tomate maison + boulettes de viande",
          time: " 60 min",
          ingredients: [
            "500 g de bœuf haché (ou mélange bœuf/porc)",
            "1 œuf",
            "2 oignon (1 boulettes, 1 sauce",
            "4 gousses ail (2 boulettes, 2 sauce)",
            "2 c. à soupe de chapelure",
            "2 c. à soupe de persil",
            "origan",
            "Sel, poivre",
            "2 boîtes de tomates en dés (796 ml chacune)",
            "2 c. à soupe huile d’olive",
            "1 c. à café de sucre",
            "Thym",
            "basilic séché",
            "500 g de spaghetti ou penne",
            "Fromage râpé (cheddar, parmesan, ou un fromage québécois style Oka)"
          ],
          description: "1. Préparer les boulettes (si maison)<br/>" +
              "<br/>" +
              "Dans un grand bol : mélange viande hachée + œuf + chapelure + oignon + ail + persil + assaisonnement.<br/>" +
              "<br/>" +
              "Forme des boulettes de la taille d’une noix (≈ 3 cm).<br/>" +
              "<br/>" +
              "Dans une grande poêle, fais-les dorer dans un peu d’huile 5–6 minutes (pas besoin de les cuire à cœur, elles finiront dans la sauce).<br/>" +
              "<br/>" +
              "👉 Si tu as des boulettes congelées, saute directement à l’étape 2 et fais-les revenir 3–4 min pour les colorer.<br/>" +
              "<br/>" +
              "2. Faire la sauce tomate<br/>" +
              "<br/>" +
              "Dans une grande casserole : fais chauffer 2 c. à soupe d’huile d’olive.<br/>" +
              "<br/>" +
              "Ajoute l’oignon haché et fais revenir 3–4 minutes.<br/>" +
              "<br/>" +
              "Mets l’ail, fais cuire 1 minute.<br/>" +
              "<br/>" +
              "Ajoute les tomates en conserve + sucre + herbes.<br/>" +
              "<br/>" +
              "Sale, poivre. Laisse mijoter 10 minutes à feu doux.<br/>" +
              "<br/>" +
              "3. Mijoter ensemble<br/>" +
              "<br/>" +
              "Ajoute les boulettes dorées dans la sauce.<br/>" +
              "<br/>" +
              "Couvre et laisse mijoter 20–25 minutes (le temps que les boulettes cuisent à cœur et que la sauce devienne onctueuse).<br/>" +
              "<br/>" +
              "Si la sauce réduit trop, ajoute un peu d’eau ou de bouillon.<br/>" +
              "<br/>" +
              "4. Cuire les pâtes<br/>" +
              "<br/>" +
              "Fais bouillir un grand chaudron d’eau salée.<br/>" +
              "<br/>" +
              "Ajoute les pâtes, cuit selon le temps indiqué sur l’emballage.<br/>" +
              "<br/>" +
              "Égoutte-les mais garde une tasse d’eau de cuisson → si ta sauce est trop épaisse, tu peux l’allonger avec.<br/>" +
              "<br/>" +
              "5. Servir<br/>" +
              "<br/>" +
              "Mets les pâtes dans les assiettes.<br/>" +
              "<br/>" +
              "Ajoute les boulettes + sauce par-dessus.<br/>" +
              "<br/>" +
              "Parsème de fromage râpé.<br/>" +
              "<br/>" +
              "Facultatif : un peu de persil frais ou basilic.<br/>" +
              "<br/>" +
              "💡 Astuces<br/>" +
              "<br/>" +
              "Les boulettes maison → beaucoup plus savoureuses, tu sais ce qu’il y a dedans, et c’est économique.<br/>" +
              "<br/>" +
              "Tu peux en faire une grande quantité et les congeler crues (sur une plaque, puis dans un sac).<br/>" +
              "<br/>" +
              "Variante : ajoute des carottes râpées ou du céleri dans la sauce pour plus de légumes."

        },
        {
          id: 6,
          title: "Riz parfait",
          time: "35 min",
          ingredients: [
            "riz",
            "eau"
          ],
          description: "Etape 1 : laver le riz 5 fois, jusqu'à avoir l'eau translucide<br/>" +
              "<br/>" +
              "Etape 2 : Mettre à cuire 1 volume de riz pour 1,5 volume d'eau et fermer le couvercle<br/>" +
              "<br/>" +
              "ATTENTION : NE PLUS OUVRIR LE COUVERCLE JUSQU A LA FIN !!!<br/>" +
              "<br/>" +
              "Etape 3 : Porter à ébullition, puis baisser le feu au minimum, couvrir et laisser cuire 20 minutes<br/>" +
              "<br/>" +
              "Etape 4 : Eteindre le feu, laisser reposer 10 minutes<br/>" +
              "<br/>" +
              "Retirer enfin le couvercle et c'est good !"
        },
        {
          id : 7,
          title : "Boeuf tendre et brocoli 3 façons",
          time : "90 min?",
          ingredients: [
              "4 faux-filets ou filets de bœuf ou pièce tendre et maturée (100gr par personne)",
              "2 gros brocoli (≈ 1.2kg)",
              "2 échalotes",
              "250ml de vin rouge",
              "250ml de bouillon de boeuf ou fond de veau",
              "Beurre 100g",
              "2/3 de pâte brisée",
              "2 œufs",
              "50g de fromage râpé",
              "200ml de crème 15%",
              "40gr d'amandes effilées",
              "sel, poivre",
              "huile d'olive",
              "sirop d'érable",
              "muscade"
          ],
          description:
          "1. Préparer le brocoli : <br/>" +
              "<br/>" +
              "Coupe les fleurettes, pèle et coupe la tige en morceaux.<br/>" +
              "<br/>" +
             "Réserver 300gr de fleurettes pour les brocolis grillés.<br/>" +
              "<br/>" +
              "Mettre le reste dans une casserole d’eau bouillante salée, cuire 8-10 minutes.<br/>" +
              "<br/>" +
            "2. Préparer la sauce : <br/>" +
              "<br/>" +
              "Émince les 2 échalotes, fais-les revenir dans un peu d’huile.<br/>" +
              "<br/>" +
              "Déglace avec les 250ml de vin rouge, laisse réduire de moitié.<br/>" +
              "<br/>" +
              "Ajoute les 205ml de fond de veau ou bouillon, laisse réduire encore (tu dois obtenir une sauce sirupeuse).<br/>" +
              "<br/>" +
              "Si trop acide, ajoute un peu de sirop d’érable.<br/>" +
              "<br/>" +
              "Mixte au mixeur plongeant avec le beurre → ça lie et donne de la brillance.<br/>" +
              "<br/>" +
              "Filtre (facultatif) et réserve au frigo.<br/>" +
              "<br/>" +
              "3. La purée : <br/>" +
              "<br/>" +
              "Égoutte très bien (important pour pas avoir d’eau).<br/>" +
              "<br/>" +
              "Prends 500gr de brocoli cuit <br/>" +
              "<br/>" +
              "Mixe au blender ou au mixeur plongeant avec 40g de beurre + 100ml de crème.<br/>" +
              "<br/>" +
              "Assaisonne avec sel, poivre, une pincée de muscade.<br/>"
              + "<br/>" +
              "4. Brocoli grillés : <br/>" +
              "<br/>" +
              "Mets les 300g de fleurettes sur une plaque, arrose d’huile, sel, poivre.<br/>" +
              "<br/>" +
              "Four à 200 °C (400 °F), 15–20 min → elles doivent dorer légèrement."
              + "<br/>" +
              "5. Les tartelettes : <br/>" +
              "<br/>" +
              "Fonds : étale la pâte, fonce 8 moules à tartelettes.<br/>" +
              "<br/>" +
              "Pique la pâte, couvre papier/parchment + pois secs.<br/>" +
              "<br/>" +
              "Précuis 10 min à 180 °C, retire le papier/poids, recuis 5 min.<br/>" +
              "<br/>" +
              "Appareil : mixe les 250g de brocolis cuits avec les 2 œufs + 100ml crème + 50g fromage.<br/>" +
              "<br/>" +
              "Assaisonne sel/poivre.<br/>" +
              "<br/>" +
              "Verse l’appareil dans les fonds précuits.<br/>" +
              "<br/>" +
              "Enfourne à 180 °C (350 °F) 20–25 min, jusqu’à doré."+
              "<br/>" +
              "FINAL : 15 min avant de manger<br/>" +
              "<br/>" +
              "Enfourner les tartelettes (10 min à 180 °C).<br/>" +
              "<br/>" +
              "Si possible mettre les assiettes au four quelques minutes <br/>" +
              "<br/>" +
              "Finir les fleurettes de brocolis à la poêle au beurre/amandes).<br/>" +
              "<br/>" +
              "Saisir la viande à la poêle 2min de chaque côté dans du beurre, laisser reposer.<br/>" +
              "<br/>" +
              "Monter la sauce au beurre au dernier moment."
        }
      ],
      selectedRecipe: null,
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {},
  methods: {
    ...mapActions({
      setLoading: "setLoading",
    }),
    selectRecipeFromButton(recipe) {
      if (this.selectedRecipe && this.selectedRecipe.id === recipe.id) {
        this.selectedRecipe = null;
        return;
      }
      this.selectedRecipe = recipe;
    },
    selectRecipeFromList(value) {
      if (null === value) return;
      if (this.selectedRecipe && this.selectedRecipe.id === this.recipes[value].id) {
        this.selectedRecipe = null;
        return;
      }
      this.selectedRecipe = this.recipes[value];
    }
  },
  mounted() {
  }
}

</script>
<style scoped>
</style>